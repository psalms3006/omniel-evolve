import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import type Vapi from "@vapi-ai/web";
import { ClientOnly } from "./client-only";
import { createActionDispatcher } from "@/lib/vapi-integration/actions";
import { getVapiClient } from "@/lib/vapi-integration/client";
import { attachToolHandlers } from "@/lib/vapi-integration/tool-handlers";

type CallState = "idle" | "connecting" | "active" | "unavailable";

function VapiWidgetInner() {
  const router = useRouter();
  const vapiRef = useRef<Vapi | null>(null);
  const detachRef = useRef<() => void>(() => {});
  const [state, setState] = useState<CallState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(
    () => () => {
      detachRef.current();
      vapiRef.current?.stop();
    },
    [],
  );

  async function startCall() {
    setState("connecting");
    setErrorMessage(null);
    console.log("[VAPI INIT] loading client");

    let vapi: Vapi | null;
    try {
      vapi = await getVapiClient();
    } catch (err) {
      // Root-cause fix: previously this await had no try/catch, so a
      // rejected getVapiClient() (e.g. the @vapi-ai/web chunk failing to
      // load) left state stuck on "connecting" forever with no console
      // output at all.
      console.error("[VAPI ERROR] failed to load the Vapi SDK", err);
      setState("unavailable");
      setErrorMessage("Voice assistant couldn't load. Try refreshing the page.");
      return;
    }
    if (!vapi) {
      console.warn("[VAPI ERROR] VITE_VAPI_PUBLIC_KEY is not set — voice assistant disabled");
      setState("unavailable");
      return;
    }

    const assistantId = import.meta.env["VITE_VAPI_ASSISTANT_ID"] as string | undefined;
    if (!assistantId) {
      console.warn(
        "[VAPI ERROR] VITE_VAPI_ASSISTANT_ID is not set — cannot start the dashboard-managed assistant.",
      );
      setState("unavailable");
      return;
    }
    console.log("[VAPI INIT] assistantId =", assistantId);

    vapiRef.current = vapi;
    detachRef.current = attachToolHandlers(vapi, createActionDispatcher(router));
    vapi.on("call-start", () => {
      console.log("[VAPI CONNECTED]");
      setState("active");
    });
    vapi.on("call-end", () => setState("idle"));
    // More specific than the generic "error" event: fires with a stage/
    // reason breakdown when the call never manages to start at all, which
    // is exactly the "stuck on Connecting…" symptom.
    vapi.on("call-start-failed", (event: unknown) => {
      console.error("[VAPI ERROR] call-start-failed", event);
      setState("idle");
      setErrorMessage("Couldn't connect the call. Check your network and try again.");
    });
    vapi.on("error", (err: unknown) => {
      console.error("[VAPI ERROR]", err);
      setState("idle");
      setErrorMessage("Couldn't connect the call. Check your network and try again.");
    });

    console.log("[VAPI START] calling vapi.start()");
    try {
      // Root-cause fix: previously this call's returned promise was neither
      // awaited nor caught. If starting the call rejected (invalid
      // assistant id, invalid/mismatched public key, mic permission denial,
      // blocked origin, etc.) without also emitting an "error" event, the
      // rejection was silently swallowed and the button stayed on
      // "Connecting…" indefinitely with nothing in the console.
      await vapi.start(assistantId);
    } catch (err) {
      console.error("[VAPI ERROR] vapi.start() rejected", err);
      setState("idle");
      setErrorMessage("Couldn't connect the call. Check your network and try again.");
    }
  }

  function endCall() {
    vapiRef.current?.stop();
    setState("idle");
  }

  if (state === "unavailable" && !errorMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {errorMessage ? (
        <p className="max-w-[220px] rounded-xl bg-background/95 px-3 py-2 text-right text-xs text-muted-foreground shadow">
          {errorMessage}
        </p>
      ) : null}
      <button
        type="button"
        onClick={state === "active" ? endCall : startCall}
        disabled={state === "connecting"}
        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-500 hover:brightness-110 disabled:opacity-60"
        aria-label={state === "active" ? "End voice assistant call" : "Talk to OMNIEL"}
      >
        {state === "active"
          ? "End call"
          : state === "connecting"
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
