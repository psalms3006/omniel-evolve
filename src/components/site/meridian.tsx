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
  /** Where the form sits. "right" offsets it out of the text column so a
   *  left-aligned headline keeps clear space. "rising" also drops it below the
   *  fold line, so only its lit upper edge is in frame -- the reference
   *  compositions all crop their centrepiece at the bottom rather than the
   *  top, which reads as an object coming into view rather than one that has
   *  been cut off. */
  align?: "center" | "right" | "rising";
  /** Render the volumetric light. The reference compositions are carried by a
   *  single lit object; this is what separates "an object in space" from "a
   *  wireframe on a background". Off for small in-card instances, where the
   *  bloom would only add haze. */
  lit?: boolean;
};

/**
 * The OMNIEL meridian — the site's one signature centrepiece.
 *
 * Replaces the canvas particle-network that previously sat behind 13 surfaces.
 * That was a floating-node graph: competently built, and the single most
 * recognisable cliché of a generic AI startup site. It announced "this is an
 * AI website" while saying nothing about this particular company.
 *
 * This says something specific. OMNIEL's positioning is "building intelligence
 * without borders", from Nigeria outward; the motif is the geometry of a globe
 * — meridians and parallels. It is also the wordmark's "O" opened out, so the
 * logo and the centrepiece are one idea at two scales.
 *
 * WHY IT IS LIT
 *
 * All three reference compositions are carried by one luminous object with a
 * clear light source, and the first version of this component was a flat,
 * evenly-weighted wireframe — legible, but weightless. The difference is not
 * decoration: an even wireframe reads as a texture behind the page, while a
 * lit form reads as an object the page is composed around, which is the whole
 * point of a centrepiece.
 *
 * Light is therefore directional. A single source sits upper-left; stroke
 * opacity falls away from it, a core bloom sits behind the form, and a terminator
 * shadow darkens the lower right. The result is volume from four gradients.
 *
 * It remains static SVG. No canvas, no animation frame, no per-frame work: it
 * costs nothing on a slow phone, renders identically everywhere, and cannot
 * drop frames. Where the previous component needed a node budget keyed to
 * `navigator.hardwareConcurrency`, this needs nothing.
 */
export function Meridian({
  className,
  accent = false,
  animate = false,
  intensity = 1,
  align = "center",
  lit = true,
}: Props) {
  const hue = accent ? "var(--ion)" : "var(--foreground)";
  // Unique per instance so two meridians on one page cannot capture each
  // other's gradients — SVG ids are global to the document.
  const uid = `${accent ? "a" : "n"}${align}${lit ? "l" : "f"}`;

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
          "absolute aspect-square w-[125%] max-w-[64rem] -translate-x-1/2 -translate-y-1/2",
          align === "rising"
            ? "left-[76%] top-[105%] w-[78%] max-w-[42rem]"
            : align === "right"
              ? "left-[78%] top-1/2"
              : "left-1/2 top-1/2",
          // Brand motion, level 3. One rotation, slow enough not to be noticed
          // consciously. Disabled entirely for reduced motion by the global
          // rule in styles.css.
          animate && "motion-safe:animate-[meridian-turn_120s_linear_infinite]",
        )}
        style={{ opacity: intensity }}
        fill="none"
      >
        <defs>
          {/* Fade the geometry out before it reaches the edges, so the motif
              never collides with the layout's own borders. */}
          <radialGradient id={`fade-${uid}`}>
            <stop offset="20%" stopColor="white" stopOpacity="0.95" />
            <stop offset="85%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`mask-${uid}`}>
            <rect width="200" height="200" fill={`url(#fade-${uid})`} />
          </mask>

          {/* The light source: upper-left, falling off across the form. This
              single gradient is what gives the wireframe its direction. */}
          <linearGradient id={`lightfall-${uid}`} x1="12%" y1="4%" x2="88%" y2="96%">
            <stop offset="0%" stopColor={hue} stopOpacity="0.6" />
            <stop offset="45%" stopColor={hue} stopOpacity="0.2" />
            <stop offset="100%" stopColor={hue} stopOpacity="0.06" />
          </linearGradient>

          {/* Core bloom behind the form. */}
          <radialGradient id={`core-${uid}`} cx="38%" cy="30%" r="62%">
            <stop offset="0%" stopColor={hue} stopOpacity="0.3" />
            <stop offset="45%" stopColor={hue} stopOpacity="0.08" />
            <stop offset="100%" stopColor={hue} stopOpacity="0" />
          </radialGradient>

          {/* Terminator: the unlit side, darkened so the sphere has a far edge. */}
          <radialGradient id={`shadow-${uid}`} cx="72%" cy="76%" r="55%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {lit && (
          <circle cx="100" cy="100" r="96" fill={`url(#core-${uid})`} mask={`url(#mask-${uid})`} />
        )}

        <g
          mask={`url(#mask-${uid})`}
          stroke={lit ? `url(#lightfall-${uid})` : hue}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity={lit ? 1 : 0.34}
        >
          <circle cx="100" cy="100" r="78" />
          {parallels.map((p, i) => (
            <ellipse key={`p${i}`} cx="100" cy={p.cy} rx={p.rx} ry={p.ry} />
          ))}
          {meridians.map((m, i) => (
            <ellipse key={`m${i}`} cx="100" cy="100" rx={m.rx} ry="78" />
          ))}
        </g>

        {lit && (
          <circle cx="100" cy="100" r="84" fill={`url(#shadow-${uid})`} mask={`url(#mask-${uid})`} />
        )}
      </svg>
    </div>
  );
}
