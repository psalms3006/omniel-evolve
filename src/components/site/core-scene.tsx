import { lazy, Suspense } from "react";
import { ClientOnly, usePrefersReducedMotion } from "@/components/site/client-only";

const IntelligenceCore = lazy(() => import("@/components/three/intelligence-core"));

/**
 * WebGL scene wrapper. Never imported during SSR render, and degrades to a
 * static luminous field when the visitor prefers reduced motion.
 */
export function CoreScene({
  hue = 205,
  density = 1,
  compact = false,
  className,
}: {
  hue?: number;
  density?: number;
  compact?: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden>
      <div className="aurora absolute inset-0 opacity-80" />
      {reduced ? null : (
        <ClientOnly>
          <Suspense fallback={null}>
            <IntelligenceCore hue={hue} density={density} compact={compact} />
          </Suspense>
        </ClientOnly>
      )}
    </div>
  );
}
