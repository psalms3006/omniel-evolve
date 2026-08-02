import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ActionLink, Panel, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { productBySlug } from "@/lib/omniel";

export const Route = createFileRoute("/products/$slug/demo")({
  component: Demo,
});

function Demo() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug)!;
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    setVisible(1);
  }, [slug]);

  useEffect(() => {
    if (visible >= product.demo.turns.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 1600);
    return () => clearTimeout(t);
  }, [visible, product.demo.turns.length]);

  return (
    <Section>
      <SectionHeading
        eyebrow="Demo"
        title={`${product.name}, in motion.`}
        lede={product.demo.intro}
      />

      <Reveal>
        <Panel className="mt-14 overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              {product.name} · SESSION
            </p>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              live
            </span>
          </div>

          <div className="space-y-5 p-6 md:p-10">
            {product.demo.turns.slice(0, visible).map((turn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={turn.role === "person" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-xl rounded-3xl px-6 py-4 text-sm leading-relaxed ${
                    turn.role === "person"
                      ? "bg-secondary text-secondary-foreground"
                      : "glass-quiet text-foreground"
                  }`}
                >
                  {turn.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline px-6 py-5">
            <p className="text-xs text-muted-foreground">
              Replayed from a recorded session. No output was edited.
            </p>
            <button
              type="button"
              onClick={() => setVisible(1)}
              className="rounded-full border border-hairline px-5 py-2.5 text-sm transition-colors hover:bg-surface-strong"
            >
              Replay
            </button>
          </div>
        </Panel>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-3">
        <ActionLink to="/products/$slug/technology" params={{ slug: product.slug }}>
          Under the hood
        </ActionLink>
        <ActionLink to="/contact" variant="ghost">
          Request access
        </ActionLink>
      </div>
    </Section>
  );
}
