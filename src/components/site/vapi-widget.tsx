import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import type Vapi from "@vapi-ai/web";
import { ClientOnly } from "./client-only";
import { createActionDispatcher } from "@/lib/vapi-integration/actions";
import { attachToolHandlers } from "@/lib/vapi-integration/tool-handlers";

/**
 * Why this SDK isn't imported from npm directly, and isn't loaded from
 * Vapi's official jsDelivr CDN embed either — both were tried and both
 * failed in production, for two different, unrelated reasons:
 *
 * 1. npm import (`import Vapi from "@vapi-ai/web"`): this project's bundler
 *    (Rolldown, via Vite 8 — new, still rough) mis-resolves the browser
 *    polyfill for Node's `events` builtin that the SDK's CJS build requires,
 *    so `class VapiEventEmitter extends events_1.default` throws "Class
 *    extends value #<Object> is not a constructor" before any app code runs.
 *
 * 2. Vapi's official CDN embed (cdn.jsdelivr.net/gh/VapiAI/html-script-tag):
 *    sidesteps bug #1 (loaded as a plain <script>, outside the bundler
 *    entirely) but that repo hardcodes an old `@vapi-ai/web@2.2.5`, which
 *    pulls a `@daily-co/daily-js` version Daily's own servers now reject
 *    mid-call ("daily-js version 0.85.0 is no longer supported") — calls
 *    connect, then get ejected. Confirmed via production console logs.
 *
 * Fix: bundle the *current* `@vapi-ai/web` (which now depends on a
 * supported daily-js) ourselves with esbuild — a different, well-tested
 * bundler whose CJS interop doesn't hit bug #1 — and ship the output as a
 * static asset at /vendor/vapi-web-sdk.js, loaded via a plain <script> tag
 * so this project's own bundler never touches it either. Verified end-to-end
 * in a real DOM environment before shipping; see the deliverable notes for
 * the rebuild command if @vapi-ai/web needs bumping again later.
 */
const SCRIPT_SRC = "/vendor/vapi-web-sdk.js";

declare global {
  interface Window {
    OmnielVapiCtor?: typeof Vapi;
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadVapiScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve, reject) => {
    if (window.OmnielVapiCtor) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the voice assistant script."));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

type CallState = "idle" | "loading" | "connecting" | "active" | "error";

function VapiWidgetInner() {
  const router = useRouter();
  const vapiRef = useRef<Vapi | null>(null);
  const detachRef = useRef<() => void>(() => {});
  const [state, setState] = useState<CallState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const publicKey = import.meta.env["VITE_VAPI_PUBLIC_KEY"] as string | undefined;
  const assistantId = import.meta.env["VITE_VAPI_ASSISTANT_ID"] as string | undefined;

  useEffect(() => {
    return () => detachRef.current();
  }, []);

  if (!publicKey || !assistantId) {
    console.warn(
      "[VAPI ERROR] VITE_VAPI_PUBLIC_KEY / VITE_VAPI_ASSISTANT_ID not set — voice assistant disabled.",
    );
    return null;
  }

  async function ensureClient(): Promise<Vapi> {
    if (vapiRef.current) return vapiRef.current;
    await loadVapiScript();
    const Ctor = window.OmnielVapiCtor;
    if (!Ctor)
      throw new Error("Voice assistant script loaded but did not register its constructor.");
    const vapi = new Ctor(publicKey as string);
    detachRef.current = attachToolHandlers(vapi, createActionDispatcher(router));
    vapi.on("call-start", () => {
      console.log("[VAPI CONNECTED]");
      setState("active");
    });
    vapi.on("call-end", () => setState("idle"));
    vapi.on("call-start-failed", (event: unknown) => {
      console.error("[VAPI ERROR] call-start-failed", event);
      setState("error");
      setErrorMessage("Couldn't connect the call. Check your network and try again.");
    });
    vapi.on("error", (err: unknown) => {
      console.error("[VAPI ERROR]", err);
      setState("error");
      setErrorMessage("Couldn't connect the call. Check your network and try again.");
    });
    vapiRef.current = vapi;
    return vapi;
  }

  async function handleClick() {
    if (state === "active") {
      vapiRef.current?.stop();
      setState("idle");
      return;
    }
    setErrorMessage(null);
    setState("loading");
    try {
      const vapi = await ensureClient();
      setState("connecting");
      await vapi.start(assistantId as string);
    } catch (err) {
      console.error("[VAPI ERROR] failed to load or start the voice assistant", err);
      setState("error");
      setErrorMessage("Voice assistant couldn't load. Try refreshing the page.");
    }
  }

  const isBusy = state === "loading" || state === "connecting";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {errorMessage && (
        <p className="max-w-[220px] rounded-xl bg-background/95 px-3 py-2 text-right text-xs text-muted-foreground shadow">
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy}
        aria-label={state === "active" ? "End call with OMNIEL" : "Talk to OMNIEL"}
        className="flex h-14 items-center gap-2 rounded-full border border-hairline bg-foreground px-5 text-sm font-medium text-background shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <span
          className={`h-2 w-2 rounded-full ${state === "active" ? "bg-red-500" : "bg-current"}`}
          aria-hidden
        />
        {state === "active"
          ? "End call"
          : state === "loading" || state === "connecting"
            ? "Connecting…"
            : "Talk to OMNIEL"}
      </button>
    </div>
  );
}

/** Public entry point — mount once near the root. Renders nothing during SSR/hydration. */
export function VapiWidget() {
  return (
    <ClientOnly>
      <VapiWidgetInner />
    </ClientOnly>
  );
}
