import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Accent the arcs with the brand `ion` colour. Reserved for NOVA and the
   *  homepage hero — see DESIGN.md, "Colour has meaning". */
  accent?: boolean;
  /** One very slow rotation. Homepage hero only, and never more than one per
   *  page. Ignored under prefers-reduced-motion (CSS, below). */
  animate?: boolean;
  /** 0..1. Lower it wherever the motif sits close to body text. */
  intensity?: number;
  /** "right" offsets the geometry out of the text column, so a left-aligned
   *  headline sits in clear space and the composition still balances. */
  align?: "center" | "right";
};

/**
 * The OMNIEL meridian — the site's one signature background motif.
 *
 * Replaces the canvas particle-network that previously sat behind 13 surfaces.
 * That was a floating-node graph: competently built, and the single most
 * recognisable cliché of a generic AI startup site. It announced "this is an
 * AI website" while saying nothing about this particular company.
 *
 * This says something specific. OMNIEL's positioning is "building
 * intelligence without borders", from Nigeria outward; the motif is the
 * geometry of a globe — meridians and parallels — drawn as flat arcs rather
 * than a rendered sphere. It is also the wordmark's "O" opened out, so the
 * logo and the background are one idea at two scales.
 *
 * It is deliberately static SVG. No canvas, no animation frame, no per-frame
 * work: it costs nothing on a slow phone, renders identically everywhere, and
 * cannot drop frames. Where the previous component needed a node budget keyed
 * to `navigator.hardwareConcurrency`, this needs nothing.
 */
export function Meridian({
  className,
  accent = false,
  animate = false,
  intensity = 1,
  align = "center",
}: Props) {
  const stroke = accent ? "var(--ion)" : "var(--foreground)";

  // Parallels: ellipses of decreasing width, evenly spaced by latitude, so the
  // sphere reads as a sphere rather than as a stack of ovals.
  const parallels = [-60, -40, -20, 0, 20, 40, 60].map((lat) => {
    const rad = (lat * Math.PI) / 180;
    return { cy: 100 + Math.sin(rad) * 74, rx: Math.cos(rad) * 78, ry: Math.cos(rad) * 12 };
  });

  // Meridians: longitudes drawn as ellipse arcs narrowing toward the poles.
  const meridians = [0, 30, 60, 90, 120, 150].map((lon) => {
    const rad = (lon * Math.PI) / 180;
    return { rx: Math.abs(Math.cos(rad)) * 78 };
  });

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className={cn(
          // Square, sized from the container's width, and centred by the same
          // transform the keyframes use -- so the animated and static cases
          // land in exactly the same place.
          "absolute top-1/2 aspect-square w-[125%] max-w-[64rem] -translate-x-1/2 -translate-y-1/2",
          align === "right" ? "left-[78%]" : "left-1/2",
          // Brand motion, level 3. One rotation, slow enough not to be noticed
          // consciously. Disabled entirely for reduced motion by the global
          // rule in styles.css.
          animate && "motion-safe:animate-[meridian-turn_120s_linear_infinite]",
        )}
        style={{ opacity: 0.34 * intensity }}
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {/* Fade the geometry out before it reaches the edges, so the motif
            never collides with the layout's own borders. */}
        <defs>
          <radialGradient id="meridian-fade">
            <stop offset="20%" stopColor="white" stopOpacity="0.95" />
            <stop offset="85%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="meridian-mask">
            <rect width="200" height="200" fill="url(#meridian-fade)" />
          </mask>
        </defs>

        <g mask="url(#meridian-mask)">
          <circle cx="100" cy="100" r="78" />
          {parallels.map((p, i) => (
            <ellipse key={`p${i}`} cx="100" cy={p.cy} rx={p.rx} ry={p.ry} />
          ))}
          {meridians.map((m, i) => (
            <ellipse key={`m${i}`} cx="100" cy="100" rx={m.rx} ry="78" />
          ))}
        </g>
      </svg>
    </div>
  );
}
