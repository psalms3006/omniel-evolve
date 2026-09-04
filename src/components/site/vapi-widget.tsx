import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import type Vapi from "@vapi-ai/web";
import { ClientOnly } from "./client-only";
import { createActionDispatcher } from "@/lib/vapi-integration/actions";
import { attachToolHandlers } from "@/lib/vapi-integration/tool-handlers";

/**
 * Root-cause fix: `@vapi-ai/web`'s CJS build does `class X extends
 * require("events").default`. Under this project's bundler (Rolldown/Vite 8)
 * the browser polyfill for Node's `events` builtin resolves to a plain
 * object instead of the EventEmitter class, so importing the npm package at
 * all throws "Class extends value #<Object> is not a constructor" before any
 * app code runs — independent of env vars or anything in this file.
 *
 * Vapi ships an official pre-bundled script-tag build made exactly to avoid
 * this class of bundler/CJS-interop bug: it's loaded as a plain <script>,
 * outside Vite's module graph entirely, so this project's bundler never
 * touches it. See https://github.com/VapiAI/html-script-tag.
 */
const SCRIPT_SRC = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";

type VapiSDKButtonConfig = {
  position?:
    "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom" | "top" | "left" | "right";
  offset?: string;
  width?: string;
  height?: string;
  idle?: {
    color?: string;
    type?: "pill" | "round";
    title?: string;
    subtitle?: string;
    icon?: string;
  };
  loading?: {
    color?: string;
    type?: "pill" | "round";
    title?: string;
    subtitle?: string;
    icon?: string;
  };
  active?: {
    color?: string;
    type?: "pill" | "round";
    title?: string;
    subtitle?: string;
    icon?: string;
  };
};

declare global {
  interface Window {
    vapiSDK?: {
      run: (opts: {
        apiKey: string;
        assistant: string;
        assistantOverrides?: Record<string, unknown>;
        config?: VapiSDKButtonConfig;
      }) => Vapi | null;
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadVapiScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve, reject) => {
    if (window.vapiSDK) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the Vapi embed script."));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

// Matches the site's dark, minimal palette (background #0b0d12) rather than
// the SDK's default bright-green pill. Icons are Vapi's own doc-recommended
// lucide-static URLs — small, publicly hosted, not part of this app's bundle.
const BUTTON_CONFIG: VapiSDKButtonConfig = {
  position: "bottom-right",
  offset: "24px",
  width: "56px",
  height: "56px",
  idle: {
    color: "#151822",
    type: "round",
    icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg",
  },
  loading: {
    color: "#151822",
    type: "round",
    icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg",
  },
  active: {
    color: "#e5484d",
    type: "round",
    icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg",
  },
};

function VapiWidgetInner() {
  const router = useRouter();
  const detachRef = useRef<() => void>(() => {});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const publicKey = import.meta.env["VITE_VAPI_PUBLIC_KEY"] as string | undefined;
    const assistantId = import.meta.env["VITE_VAPI_ASSISTANT_ID"] as string | undefined;
    if (!publicKey || !assistantId) {
      console.warn(
        "[VAPI ERROR] VITE_VAPI_PUBLIC_KEY / VITE_VAPI_ASSISTANT_ID not set — voice assistant disabled.",
      );
      return;
    }

    loadVapiScript()
      .then(() => {
        if (cancelled) return;
        const vapi = window.vapiSDK?.run({
          apiKey: publicKey,
          assistant: assistantId,
          config: BUTTON_CONFIG,
        });
        if (!vapi) {
          console.error("[VAPI ERROR] window.vapiSDK.run() returned no instance.");
          setErrorMessage("Voice assistant couldn't start. Try refreshing the page.");
          return;
        }
        console.log("[VAPI INIT] embed script loaded, widget running");
        detachRef.current = attachToolHandlers(vapi, createActionDispatcher(router));
        vapi.on("call-start", () => console.log("[VAPI CONNECTED]"));
        vapi.on("call-start-failed", (event: unknown) => {
          console.error("[VAPI ERROR] call-start-failed", event);
          setErrorMessage("Couldn't connect the call. Check your network and try again.");
        });
        vapi.on("error", (err: unknown) => {
          console.error("[VAPI ERROR]", err);
          setErrorMessage("Couldn't connect the call. Check your network and try again.");
        });
      })
      .catch((err) => {
        console.error("[VAPI ERROR] failed to load the Vapi embed script", err);
        if (!cancelled) setErrorMessage("Voice assistant couldn't load. Try refreshing the page.");
      });

    return () => {
      cancelled = true;
      detachRef.current();
    };
  }, [router]);

  if (!errorMessage) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <p className="max-w-[220px] rounded-xl bg-background/95 px-3 py-2 text-right text-xs text-muted-foreground shadow">
        {errorMessage}
      </p>
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
