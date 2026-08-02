import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ActionLink,
  PageHero,
  Panel,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { offices, positions } from "@/lib/omniel";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — OMNIEL" },
      {
        name: "description",
        content:
          "Open roles in research, platform, design, safety, and hardware across six OMNIEL offices.",
      },
      { property: "og:title", content: "Careers — OMNIEL" },
      {
        property: "og:description",
        content: "Work on intelligence infrastructure with people who publish their failures.",
      },
    ],
  }),
  component: Careers,
});

const teams = ["All", "Research", "Platform", "Design", "Safety", "Hardware"];

const process = [
  { step: "01", title: "Conversation", body: "Forty-five minutes on what you have built and why." },
  { step: "02", title: "Work sample", body: "A real problem from the team, timeboxed and paid." },
  { step: "03", title: "Depth", body: "Two sessions with the people you would work beside." },
  { step: "04", title: "Decision", body: "An answer within five working days, always with reasons." },
];

const benefits = [
  ["Equity for everyone", "Every employee holds meaningful ownership from day one."],
  ["Research time", "One day a week for work you choose, published if you want."],
  ["Relocation", "Full support to any of our six offices, including family."],
  ["Health", "Comprehensive cover for you and your dependents, globally."],
  ["Sabbatical", "Six paid weeks after four years, no justification required."],
  ["Equipment", "Whatever hardware the work actually needs."],
];

function Careers() {
  const [team, setTeam] = useState("All");
  const roles = positions.filter((p) => team === "All" || p.team === team);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Come build something that has to keep working."
        lede="We hire people who are careful in public and ambitious in private. The work is long-horizon and the standards are unhidden."
      >
        <ActionLink to="/company">Read the manifesto</ActionLink>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Culture"
          title="Slow to conclude. Quick to correct."
          lede="Disagreement is written down. Decisions carry an owner and a date. Nobody defends a position they no longer hold."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, body], i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 0.05}>
              <Panel interactive className="h-full p-6">
                <p className="font-display text-lg">{title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Process" title="Four steps. No surprises." />
        <ol className="mt-14 grid gap-4 md:grid-cols-4">
          {process.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.06}>
              <Panel interactive className="h-full p-6">
                <p className="font-mono text-xs text-accent">{s.step}</p>
                <p className="mt-4 font-display text-lg">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Open roles" title={`${positions.length} positions open`} />
        <div className="mt-10 flex flex-wrap gap-2">
          {teams.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTeam(t)}
              aria-pressed={team === t}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                team === t
                  ? "border-accent/50 bg-surface-strong text-foreground"
                  : "border-hairline text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
          {roles.map((role) => (
            <li key={role.title}>
              <a
                href="mailto:careers@omniel.com"
                className="group grid gap-2 py-7 md:grid-cols-[1.4fr_0.6fr_0.6fr_auto] md:items-baseline md:gap-6"
              >
                <span className="text-lg transition-colors group-hover:text-accent">
                  {role.title}
                </span>
                <span className="text-sm text-muted-foreground">{role.team}</span>
                <span className="text-sm text-muted-foreground">{role.location}</span>
                <span className="font-mono text-xs text-muted-foreground">{role.type}</span>
              </a>
            </li>
          ))}
          {roles.length === 0 ? (
            <li className="py-10 text-sm text-muted-foreground">No open roles on this team.</li>
          ) : null}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Locations" title="Where you would sit." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o) => (
            <li key={o.city}>
              <Panel interactive className="h-full p-6">
                <p className="font-display text-xl">{o.city}</p>
                <p className="mt-2 text-sm text-muted-foreground">{o.role}</p>
                <p className="mt-6 font-mono text-xs text-accent">{o.coords}</p>
              </Panel>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
