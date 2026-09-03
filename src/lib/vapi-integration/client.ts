/**
 * The only module that imports `@vapi-ai/web` directly. Everything else
 * (actions.ts, tool-handlers.ts, the rest of the app) stays free of Vapi
 * types so the dependency can be swapped or removed without touching
 * routing/components.
 *
 * Lazy-imported so the SDK is never pulled into the initial bundle or
 * evaluated during SSR — pair with <ClientOnly> at the call site.
 */
import type Vapi from "@vapi-ai/web";

let cached: Promise<Vapi | null> | null = null;

/**
 * @vapi-ai/web ships as CJS only (`exports.default = Vapi`, no ESM build, no
 * package.json "exports" map). A dynamic `import("@vapi-ai/web")` of a
 * module shaped like that double-wraps under Vite/browser ESM interop: the
 * resolved module's `.default` is the CJS `exports` object itself (which
 * itself has a `.default` holding the actual class), not the class directly.
 * Reproduced outside the browser too — Node's own dynamic-import interop of
 * this exact package produces the same shape — so this isn't
 * browser/extension-specific. Resolve whichever candidate actually is a
 * constructor rather than assuming `.default` is it, so this keeps working
 * if the package ever ships a real ESM build and the wrapping goes away.
 */
function resolveVapiCtor(mod: Record<string, unknown>): typeof Vapi {
  const candidates = [
    mod["default"],
    (mod["default"] as Record<string, unknown> | undefined)?.["default"],
    mod,
  ];
  const ctor = candidates.find((c): c is typeof Vapi => typeof c === "function");
  if (!ctor) {
    throw new TypeError("Could not resolve the Vapi constructor from the @vapi-ai/web module.");
  }
  return ctor;
}

export function getVapiClient(): Promise<Vapi | null> {
  if (cached) return cached;

  const publicKey = import.meta.env["VITE_VAPI_PUBLIC_KEY"] as string | undefined;
  if (!publicKey) {
    console.warn("VITE_VAPI_PUBLIC_KEY is not set — voice assistant is disabled.");
    cached = Promise.resolve(null);
    return cached;
  }

  cached = import("@vapi-ai/web")
    .then((mod) => {
      const VapiCtor = resolveVapiCtor(mod as unknown as Record<string, unknown>);
      return new VapiCtor(publicKey);
    })
    .catch((err) => {
      // A failed dynamic import (e.g. transient network issue) must not
      // permanently disable the widget for the rest of the page's life —
      // clear the cache so the next click retries instead of re-awaiting
      // the same rejected promise forever.
      cached = null;
      throw err;
    });
  return cached;
}
