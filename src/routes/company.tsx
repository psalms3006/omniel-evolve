import { createFileRoute } from "@tanstack/react-router";
import { CoreScene } from "@/components/site/core-scene";
import {
  ActionLink,
  PageHero,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  Stat,
} from "@/components/site/primitives";
import { offices, roadmap } from "@/lib/omniel";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — OMNIEL" },
      {
        name: "description",
        content:
          "The mission, manifesto, history, and global offices of OMNIEL, a company building intelligence infrastructure.",
      },
      { property: "og:title", content: "Company — OMNIEL" },
      {
        property: "og:description",
        content: "Why OMNIEL exists, and how it is built to last.",
      },
    ],
  }),
  component: Company,
});

const leadership = [
  { name: "Chief Executive", role: "Company", note: "Appointment announced 2024" },
  { name: "Chief Scientist", role: "Research", note: "Leads reasoning and memory" },
  { name: "Head of Safety", role: "Safety", note: "Evaluation and deployment gates" },
  { name: "Head of Design", role: "Product", note: "NOVA surface and system language" },
  { name: "Head of Hardware", role: "Silicon", note: "Low-power inference" },
  { name: "Head of Cloud", role: "Infrastructure", note: "Eleven regions" },
];

function Company() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="A company designed to be useful in 2046."
        lede="Most of what we build will be invisible. That is the intention. Infrastructure earns its place by being unremarkable to depend on."
      >
        <ActionLink to="/careers">Work with us</ActionLink>
        <ActionLink to="/contact" variant="ghost">
          Contact
        </ActionLink>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="Mission"
            title="Give people intelligence they can hold to account."
            lede="Capability without legibility is a liability. We build systems that can be questioned — by the person using them, by the organization deploying them, and by the public."
          />
          <div className="grid grid-cols-2 gap-10 self-center">
            <Stat value="2021" label="Founded" />
            <Stat value="640" label="People" />
            <Stat value="6" label="Offices" />
            <Stat value="41" label="Papers published" />
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <div className="relative overflow-hidden rounded-3xl border border-hairline">
          <CoreScene className="absolute inset-0 opacity-60" hue={78} density={0.5} compact />
          <div className="relative p-8 md:p-16">
            <p className="eyebrow">Manifesto</p>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p className="text-foreground">
                We think the next century of computing will be judged on restraint, not capability.
              </p>
              <p>
                Anything that can act on your behalf must be able to explain itself in a sentence you
                would repeat to someone you respect. Anything that remembers you must let you forget.
                Anything that runs for weeks must be able to show its work minute by minute.
              </p>
              <p>
                We would rather ship a smaller system that holds than a larger one that impresses. We
                would rather publish the failed experiment than imply it never happened. We would
                rather be trusted slowly.
              </p>
              <p className="text-foreground">This is the whole of the strategy.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Timeline" title="How we got here." />
        <ol className="mt-14 space-y-px">
          {roadmap.map((item, i) => (
            <Reveal as="li" key={item.year} delay={i * 0.05}>
              <div className="grid gap-3 border-t border-hairline py-8 md:grid-cols-[8rem_12rem_1fr] md:gap-8">
                <p className="font-mono text-sm text-accent">{item.year}</p>
                <p className="font-display text-xl">{item.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Leadership" title="Who is accountable." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, i) => (
            <Reveal as="li" key={person.name} delay={(i % 3) * 0.05}>
              <Panel interactive className="h-full p-6">
                <div
                  aria-hidden
                  className="mb-6 h-28 rounded-2xl border border-hairline bg-surface"
                />
                <p className="font-display text-lg">{person.name}</p>
                <p className="mt-1 text-sm text-accent">{person.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{person.note}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Offices" title="Six locations, one clock." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office, i) => (
            <Reveal as="li" key={office.city} delay={(i % 3) * 0.05}>
              <Panel interactive className="h-full p-6">
                <p className="font-display text-xl">{office.city}</p>
                <p className="mt-2 text-sm text-muted-foreground">{office.role}</p>
                <p className="mt-6 font-mono text-xs text-accent">{office.coords}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
