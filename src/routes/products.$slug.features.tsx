import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { ActionLink, Panel, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { productBySlug } from "@/lib/omniel";

export const Route = createFileRoute("/products/$slug/features")({
  component: Features,
});

function Features() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug)!;
  const [open, setOpen] = useState<string | null>(product.capabilities[0]?.title ?? null);

  return (
    <Section>
      <SectionHeading
        eyebrow="Features"
        title={`What ${product.name} does, precisely.`}
        lede="Each capability is expandable. Nothing is hidden behind a sales conversation."
      />

      <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
        {product.capabilities.map((c, i) => {
          const isOpen = open === c.title;
          return (
            <Reveal as="li" key={c.title} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : c.title)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-7 text-left"
              >
                <span className="min-w-0">
                  <span className="font-mono text-[0.7rem] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-display text-2xl tracking-tight">{c.title}</span>
                </span>
                <span
                  aria-hidden
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pb-8 text-base leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </motion.div>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {product.spec.map((s) => (
          <Panel key={s.label} className="p-6">
            <p className="eyebrow">{s.label}</p>
            <p className="mt-3 font-display text-xl">{s.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-12">
        <ActionLink to="/products/$slug/demo" params={{ slug: product.slug }}>
          See it running
        </ActionLink>
      </div>
    </Section>
  );
}
