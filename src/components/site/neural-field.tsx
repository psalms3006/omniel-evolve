import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth 0..1
};

type Props = {
  className?: string;
  /** Base hue for the network, in degrees. */
  hue?: number;
  /** Overall intensity multiplier, 0..1. */
  intensity?: number;
  /** Render the central intelligence glow. */
  core?: boolean;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Node budget tuned per device class: desktop rich, laptop moderate, mobile light. */
function nodeBudget(width: number, height: number) {
  const cores = (typeof navigator !== "undefined" && navigator.hardwareConcurrency) || 4;
  const weak = cores <= 4;
  const cap = width < 640 ? (weak ? 30 : 40) : width < 1100 ? (weak ? 50 : 68) : weak ? 64 : 96;
  // density-based so tall sections do not look empty
  const byArea = Math.round((width * height) / 9000);
  return Math.max(18, Math.min(cap, byArea));
}

/**
 * Lightweight canvas neural network.
 * - single rAF loop, paused when offscreen or when the tab is hidden
 * - device-pixel-ratio capped, node count scaled by viewport and CPU
 * - no React state updates per frame, no canvas blur filters
 * - static single frame under prefers-reduced-motion
 */
export function NeuralField({ className, hue = 205, intensity = 1, core = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let linkDist = 150;

    const pointer = { x: -9999, y: -9999, active: false };

    const stroke = (a: number) => `hsla(${hue}, 60%, 78%, ${a})`;

    function seed() {
      const count = nodeBudget(width, height);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        z: 0.35 + Math.random() * 0.65,
      }));
      linkDist = width < 640 ? 120 : width < 1100 ? 150 : 172;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function drawCore() {
      if (!core) return;
      const cx = width * 0.5;
      const cy = height * 0.48;
      const r = Math.min(width, height) * 0.42;
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsla(${hue}, 70%, 72%, ${0.16 * intensity})`);
      g.addColorStop(0.45, `hsla(${hue}, 70%, 60%, ${0.06 * intensity})`);
      g.addColorStop(1, "hsla(0, 0%, 0%, 0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      drawCore();

      const px = pointer.x;
      const py = pointer.y;
      const pullRadius = 190;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;

        if (!reduced) {
          if (pointer.active) {
            const dx = px - n.x;
            const dy = py - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < pullRadius * pullRadius && d2 > 1) {
              const d = Math.sqrt(d2);
              const pull = (1 - d / pullRadius) * 0.045 * n.z;
              n.vx += (dx / d) * pull;
              n.vy += (dy / d) * pull;
            }
          }
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.992;
          n.vy *= 0.992;

          // gentle drift floor so the field never freezes
          if (Math.abs(n.vx) < 0.02) n.vx += (Math.random() - 0.5) * 0.01;
          if (Math.abs(n.vy) < 0.02) n.vy += (Math.random() - 0.5) * 0.01;

          if (n.x < -20) n.x = width + 20;
          else if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          else if (n.y > height + 20) n.y = -20;
        }

        // connections (forward pairs only)
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]!;
          const dx = m.x - n.x;
          if (dx > linkDist || dx < -linkDist) continue;
          const dy = m.y - n.y;
          if (dy > linkDist || dy < -linkDist) continue;
          const d = Math.hypot(dx, dy);
          if (d > linkDist) continue;
          const a = (1 - d / linkDist) * 0.3 * intensity * ((n.z + m.z) / 2);
          ctx!.strokeStyle = stroke(a);
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(m.x, m.y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        const near =
          pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < pullRadius ? 1.6 : 1;
        const r = (0.9 + n.z * 1.5) * near;
        ctx!.fillStyle = stroke(Math.min(0.75, (0.34 + n.z * 0.46) * intensity * near));
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (running && !reduced) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= -40 &&
        pointer.y >= -40 &&
        pointer.x <= rect.width + 40 &&
        pointer.y <= rect.height + 40;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else if (visible) start();
    }

    resize();
    frame(); // paint one frame immediately (also the reduced-motion render)

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || !running) frame();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [hue, intensity, core]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}

/** Cheap ambient layer: static gradients + grid, one slow CSS pulse. No canvas, no blur filters. */
export function AmbientField({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="aurora animate-drift absolute inset-0 opacity-60" />
      <div className="grid-overlay absolute inset-0" />
    </div>
  );
}
