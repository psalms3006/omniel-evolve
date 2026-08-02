import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ActionLink,
  PageHero,
  Panel,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { benchmarks, researchPapers, roadmap } from "@/lib/omniel";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — OMNIEL" },
      {
        name: "description",
        content:
          "Publications, benchmarks, safety commitments, and the OMNIEL research roadmap through 2028.",
      },
      { property: "og:title", content: "Research — OMNIEL" },
      {
        property: "og:description",
        content: "Open publications, evaluation harnesses, and our deployment framework.",
      },
    ],
  }),
  component: Research,
});

const areas = ["All", "Reasoning", "Agents", "Memory", "Voice", "Robotics"];

function Research() {
  const [area, setArea] = useState("All");
  const [openPaper, setOpenPaper] = useState<string | null>(null);
  const papers = researchPapers.filter((p) => area === "All" || p.area === area);

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="We publish what we learn, including what did not work."
        lede="Our results ship with the harness that produced them. Reproduction is the point."
      >
        <ActionLink to="/careers">Join the lab</ActionLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Publications" title="Recent papers" />
        <div className="mt-10 flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              aria-pressed={area === a}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                area === a
                  ? "border-accent/50 bg-surface-strong text-foreground"
                  : "border-hairline text-muted-foreground hover:text-foreground"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
          {papers.map((paper) => {
            const isOpen = openPaper === paper.title;
            return (
              <li key={paper.title}>
                <button
                  type="button"
                  onClick={() => setOpenPaper(isOpen ? null : paper.title)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-7 text-left"
                >
                  <span className="min-w-0">
                    <span className="font-mono text-xs text-muted-foreground">
                      {paper.year} · {paper.area}
                    </span>
                    <span className="mt-2 block text-lg leading-snug">{paper.title}</span>
                  </span>
                  <span aria-hidden className="shrink-0 text-muted-foreground">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 text-sm leading-relaxed text-muted-foreground">
                    {paper.abstract}
                  </p>
                </motion.div>
              </li>
            );
          })}
          {papers.length === 0 ? (
            <li className="py-10 text-sm text-muted-foreground">
              No publications in this area yet.
            </li>
          ) : null}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Benchmarks"
            title="Numbers, with the method attached."
            lede="Evaluated on public suites plus our own held-out sets, which are released after each model generation."
          />
          <div className="space-y-6">
            {benchmarks.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.05}>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="min-w-0 truncate text-sm">{b.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {b.omniel} / {b.field}
                    </p>
                  </div>
                  <div className="mt-3 h-px w-full bg-hairline">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: b.omniel / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="h-px bg-accent"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Roadmap" title="Where the work is going." />
        <ol className="mt-14 grid gap-4 md:grid-cols-5">
          {roadmap.map((item, i) => (
            <Reveal as="li" key={item.year} delay={i * 0.06}>
              <Panel interactive className="h-full p-6">
                <p className="font-mono text-xs text-accent">{item.year}</p>
                <p className="mt-4 font-display text-lg">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Safety"
            title="Thresholds we will not cross quietly."
            lede="Before a system reaches a person, it passes evaluation gates tied to specific capabilities. If a gate fails, the deployment does not happen and we say why."
          />
          <Reveal>
            <Panel>
              <ul className="space-y-6">
                {[
                  ["Capability gates", "Evaluations mapped to concrete thresholds, published per release."],
                  ["Independent review", "External red teams with access to internal checkpoints."],
                  ["Incident disclosure", "Material failures reported within 30 days."],
                  ["Open science", "Methods and harnesses released even when results are unflattering."],
                ].map(([t, b]) => (
                  <li key={t} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <p className="eyebrow">{t}</p>
                    <p className="text-sm text-muted-foreground">{b}</p>
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
