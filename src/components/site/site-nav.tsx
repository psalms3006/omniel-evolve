import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navigation, products } from "@/lib/omniel";
import iconAsset from "@/assets/omniel-icon.png.asset.json";
import wordmarkAsset from "@/assets/omniel-wordmark.png.asset.json";
import { cn } from "@/lib/utils";

function Wordmark() {
  const [expanded, setExpanded] = useState(true);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Reveal on load, then collapse to just the "O" after a beat — skip the
  // choreography entirely for prefers-reduced-motion.
  useEffect(() => {
    if (reduceMotion) {
      setExpanded(false);
      return;
    }
    timerRef.current = setTimeout(() => setExpanded(false), 900);
    return clearTimer;
  }, [reduceMotion]);

  useEffect(() => clearTimer, []);

  function handleTap() {
    // Touch devices don't fire hover — first tap reveals, doesn't navigate yet.
    clearTimer();
    setExpanded(true);
    timerRef.current = setTimeout(() => setExpanded(false), 1500);
  }

  return (
    <Link
      to="/"
      aria-label="OMNIEL home"
      className="group relative flex shrink-0 items-center"
      onMouseEnter={() => {
        clearTimer();
        setExpanded(true);
      }}
      onMouseLeave={() => {
        clearTimer();
        setExpanded(false);
      }}
      onClick={(e) => {
        if (!expanded && window.matchMedia("(hover: none)").matches) {
          e.preventDefault();
          handleTap();
        }
      }}
    >
      {/* Fixed-size slot: the icon always renders here so the nav links
          never shift. The full wordmark sweeps out over the bar on hover. */}
      <img src={iconAsset.url} alt="" className="block h-7 w-auto shrink-0" />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-10 block h-7 -translate-y-1/2 overflow-hidden"
        initial={false}
        animate={{ width: expanded ? 167 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "width" }}
      >
        <img src={wordmarkAsset.url} alt="" className="block h-7 w-auto max-w-none" />
      </motion.span>
      <span className="sr-only">OMNIEL</span>
    </Link>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-700 md:px-5",
              scrolled ? "glass" : "border border-transparent",
            )}
          >
            <div className="flex min-w-0 items-center gap-8">
              <Wordmark />
              <ul className="hidden items-center gap-1 lg:flex">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground data-[status=active]:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/contact"
                className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-500 hover:brightness-110 sm:inline-flex"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:bg-surface-strong lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 h-px w-full bg-current transition-all duration-500",
                      open ? "top-1.5 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-px w-full bg-current transition-all duration-500",
                      open ? "top-1.5 -rotate-45" : "top-3",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background/85 pb-16 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.to}
                      className="block border-b border-hairline py-4 font-display text-2xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="glass-quiet rounded-2xl p-4"
                  >
                    <p className="font-display text-lg tracking-[0.2em]">{p.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground"
              >
                Contact OMNIEL
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
