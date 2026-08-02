import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { CoreScene } from "@/components/site/core-scene";
import {
  ActionLink,
  Panel,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { technologyPillars } from "@/lib/omniel";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — OMNIEL" },
      {
        name: "description",
        content:
          "Foundation models, memory, reasoning, voice, vision, agents, robotics, operating system, cloud, and the developer platform behind OMNIEL.",
      },
      { property: "og:title", content: "Technology — OMNIEL" },
      {
        property: "og:description",
        content: "The layers beneath NOVA and VYREN, documented and measured.",
      },
    ],
  }),
  component: Technology,
});

const stack = [
  { name: "Surface", detail: "NOVA · VYREN · Studio" },
  { name: "Reasoning", detail: "Budgeted deliberation" },
  { name: "Perception", detail: "Voice · Vision · Spatial" },
  { name: "Memory", detail: "Episodic · Semantic · Procedural" },
  { name: "Runtime", detail: "Durable execution · Capability broker" },
  { name: "Substrate", detail: "Cloud · Silicon" },
];

function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  return (
    <Panel className="p-0">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <ul className="divide-y divide-hairline">
          {stack.map((layer, i) => (
            <li key={layer.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-7 py-6 text-left transition-colors ${
                  active === i ? "bg-surface-strong" : "hover:bg-surface"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-display text-lg">{layer.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{layer.detail}</span>
                </span>
                <span
                  aria-hidden
                  className={`h-px w-10 shrink-0 transition-colors ${
                    active === i ? "bg-accent" : "bg-hairline"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="relative min-h-[24rem] border-t border-hairline lg:border-l lg:border-t-0">
          <CoreScene className="absolute inset-0" hue={200 + active * 12} density={0.6} compact />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground"
            >
              {stack[active]!.name.toUpperCase()}
            </motion.p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="A stack that explains itself."
        lede="Eleven layers, one curriculum, one permission model. Below is the whole of it — not a diagram drawn for a keynote."
      >
        <ActionLink to="/research">Read the research</ActionLink>
        <ActionLink to="/developers" variant="ghost">
          Developer platform
        </ActionLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Architecture" title="Hover a layer to inspect it." />
        <div className="mt-12">
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="Capabilities"
          title="Every layer, in plain language."
          lede="Each of these is a working system with published evaluations, not a roadmap item."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technologyPillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.id} delay={(i % 3) * 0.06}>
              <Panel interactive className="h-full">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
                  {pillar.metric}
                </p>
                <h3 className="mt-4 text-xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Principle"
            title="Capability is only useful if it is bounded."
            lede="Permission, budget, and reversal are properties of the runtime rather than promises in documentation. A system that cannot be constrained cannot be trusted with anything that matters."
          />
          <Reveal>
            <Panel>
              <ul className="space-y-6">
                {[
                  ["Declared", "Access and spend are stated before execution begins."],
                  ["Observed", "Every step emits a trace to storage you control."],
                  ["Reversible", "Actions carry a defined undo window and an owner."],
                  ["Evaluated", "Capability thresholds gate every deployment."],
                ].map(([title, body]) => (
                  <li key={title} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <p className="eyebrow">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
