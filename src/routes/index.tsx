import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CoreScene } from "@/components/site/core-scene";
import {
  ActionLink,
  Eyebrow,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  Shell,
  Stat,
} from "@/components/site/primitives";
import { benchmarks, ecosystem, news, products, technologyPillars } from "@/lib/omniel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMNIEL — Intelligence infrastructure" },
      {
        name: "description",
        content:
          "OMNIEL builds the intelligence layer beneath software: NOVA, a personal AI operating system, and VYREN, an autonomous agent platform.",
      },
      { property: "og:title", content: "OMNIEL — Intelligence infrastructure" },
      {
        property: "og:description",
        content: "A personal AI operating system and an autonomous agent platform, built to last decades.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100svh] min-h-[38rem] w-full overflow-hidden">
      <motion.div
        style={reduced ? {} : { y, scale }}
        className="absolute inset-0"
      >
        <CoreScene className="absolute inset-0" hue={205} />
      </motion.div>

      <motion.div
        style={reduced ? {} : { opacity: fade }}
        className="relative flex h-full items-end pb-20 md:items-center md:pb-0"
      >
        <Shell>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-3xl"
          >
            <Eyebrow>OMNIEL</Eyebrow>
            <h1 className="text-balance-tight mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]">
              Intelligence, held to the standard of infrastructure.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We build systems that remember, reason, and act — with the restraint that comes from
              knowing they will run for a very long time.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink to="/products">Explore the ecosystem</ActionLink>
              <ActionLink to="/technology" variant="ghost">
                How it works
              </ActionLink>
            </div>
          </motion.div>
        </Shell>
      </motion.div>

      <motion.div
        style={reduced ? {} : { opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden md:block"
      >
        <Shell>
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Scroll</span>
            <span className="font-mono normal-case tracking-normal">
              37.77° N, 122.42° W — 47.37° N, 8.54° E
            </span>
          </div>
        </Shell>
      </motion.div>
    </div>
  );
}

function EcosystemSection() {
  return (
    <Section id="ecosystem">
      <SectionHeading
        eyebrow="The ecosystem"
        title="One architecture. Many surfaces."
        lede="OMNIEL is not a single model. It is a shared substrate — memory, reasoning, perception, and control — expressed through products that grow without redrawing the map."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.08}>
            <Link to="/products/$slug" params={{ slug: product.slug }} className="block h-full">
              <Panel interactive className="relative h-full overflow-hidden p-0">
                <div className="relative h-56 overflow-hidden">
                  <CoreScene className="absolute inset-0" hue={product.hue} density={0.45} compact />
                </div>
                <div className="p-7 md:p-9">
                  <p className="font-display text-2xl tracking-[0.3em]">{product.name}</p>
                  <p className="mt-2 text-sm text-accent">{product.role}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {product.summary}
                  </p>
                  <p className="mt-7 text-sm text-foreground">
                    Discover {product.name}{" "}
                    <span aria-hidden className="inline-block">
                      →
                    </span>
                  </p>
                </div>
              </Panel>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.slice(2).map((item) => (
            <li key={item.name}>
              <Link to={item.to} className="block h-full">
                <Panel interactive className="h-full p-6">
                  <p className="font-display text-lg tracking-tight">{item.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.role}</p>
                </Panel>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function TechnologySection() {
  return (
    <Section id="technology" className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Technology"
            title="Depth you can inspect."
            lede="Every layer of the stack is documented, measured, and replaceable. Nothing important happens where you cannot see it."
          />
          <div className="mt-10">
            <ActionLink to="/technology" variant="ghost">
              Read the architecture
            </ActionLink>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8">
            <Stat value="180 ms" label="Voice turn latency" />
            <Stat value="11" label="Cloud regions" />
            <Stat value="4M" label="Persistent context tokens" />
            <Stat value="10k" label="Concurrent agents" />
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {technologyPillars.slice(0, 6).map((pillar, i) => (
            <Reveal as="li" key={pillar.id} delay={i * 0.05}>
              <Panel interactive className="h-full p-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
                  {pillar.metric}
                </p>
                <h3 className="mt-4 text-xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function BenchmarkSection() {
  return (
    <Section className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <SectionHeading
          eyebrow="Evidence"
          title="Measured, then published."
          lede="Benchmarks are reported with the harness attached. Where we lose, we say so in the paper."
        />
        <div className="space-y-6">
          {benchmarks.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.06}>
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
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                    style={{ originX: 0 }}
                    className="h-px bg-accent"
                  />
                </div>
              </div>
            </Reveal>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            OMNIEL frontier configuration versus the strongest published result available at time of
            evaluation.
          </p>
        </div>
      </div>
    </Section>
  );
}

function DevelopersSection() {
  return (
    <Section className="border-t border-hairline">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Developers"
          title="One SDK across the whole ecosystem."
          lede="The same auth, the same traces, the same primitives — whether you are calling a model, running a fleet, or shipping to a device."
        />
        <Reveal>
          <Panel className="overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">agent.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[0.78rem] leading-relaxed text-muted-foreground">
              <code>{`import { Omniel } from "@omniel/sdk";

const omniel = new Omniel();

const run = await omniel.agents.start({
  model: "vyren-1",
  objective: "Reconcile Q3 invoices against receipts",
  budget: { usd: 340, hours: 6 },
  tools: ["ledger.read", "receipts.read", "report.write"],
});

for await (const step of run.stream()) {
  console.log(step.summary);
}`}</code>
            </pre>
          </Panel>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/developers">Developer platform</ActionLink>
          <ActionLink to="/research" variant="ghost">
            Research
          </ActionLink>
        </div>
      </Reveal>
    </Section>
  );
}

function NewsSection() {
  return (
    <Section className="border-t border-hairline">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="News" title="Recent from OMNIEL" />
        <ActionLink to="/news" variant="quiet">
          All news
        </ActionLink>
      </div>
      <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
        {news.slice(0, 3).map((item, i) => (
          <Reveal as="li" key={item.slug} delay={i * 0.06}>
            <Link
              to="/news/$slug"
              params={{ slug: item.slug }}
              className="group grid gap-3 py-7 transition-colors md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
              <span className="min-w-0">
                <span className="block text-lg transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.excerpt}</span>
              </span>
              <span className="eyebrow">{item.kind}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function ClosingSection() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <CoreScene className="absolute inset-0 opacity-70" hue={78} density={0.6} compact />
      <Shell>
        <Reveal>
          <div className="relative max-w-3xl">
            <h2 className="text-balance-tight text-4xl leading-[1.05] md:text-6xl">
              Build on something that will still be here.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Talk to us about deployment, research collaboration, or joining the team.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink to="/contact">Contact OMNIEL</ActionLink>
              <ActionLink to="/careers" variant="ghost">
                Open roles
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <EcosystemSection />
      <TechnologySection />
      <BenchmarkSection />
      <DevelopersSection />
      <NewsSection />
      <ClosingSection />
    </>
  );
}
