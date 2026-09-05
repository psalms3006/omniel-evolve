import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientField, NeuralField } from "@/components/site/neural-field";
import {
  ActionLink,
  Eyebrow,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  Shell,
} from "@/components/site/primitives";
import { positioning, principles, products, technologyDirections } from "@/lib/omniel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMNIEL — Building intelligence without borders" },
      {
        name: "description",
        content:
          "OMNIEL is an early-stage AI and technology ecosystem being built from Nigeria: NOVA, VYREN, ARVO and KIWI.",
      },
      { property: "og:title", content: "OMNIEL — Building intelligence without borders" },
      {
        property: "og:description",
        content:
          "An early-stage AI and technology ecosystem being built from Nigeria, with global ambition.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <div className="relative flex min-h-[86svh] w-full items-center overflow-hidden pb-24 pt-36 md:pb-28 md:pt-40">
      <AmbientField />
      <div className="absolute inset-0">
        <NeuralField hue={205} />
      </div>

      <Shell>
        <div className="relative max-w-3xl">
          <Eyebrow>OMNIEL — Nigeria</Eyebrow>
          <h1 className="text-balance-tight mt-6 text-[clamp(2.4rem,6.5vw,4.9rem)] leading-[1.04]">
            {positioning.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {positioning.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionLink to="/products">Explore the ecosystem</ActionLink>
            <ActionLink to="/about" variant="ghost">
              Why OMNIEL exists
            </ActionLink>
          </div>
          <p className="mt-12 max-w-md text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Early-stage · Pre-launch · Built in Nigeria for a global audience
          </p>
        </div>
      </Shell>
    </div>
  );
}

function EcosystemSection() {
  return (
    <Section id="products" className="border-t border-hairline">
      <SectionHeading
        eyebrow="The ecosystem"
        title="One ecosystem. Four distinct systems."
        lede="OMNIEL is an umbrella for products that solve different classes of problems. They are not four versions of the same assistant, and none of them is ranked above the others."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.06}>
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              id={product.slug}
              className="block h-full scroll-mt-28"
            >
              <Panel interactive className="relative h-full overflow-hidden p-0">
                <div className="relative h-40 overflow-hidden border-b border-hairline">
                  <NeuralField hue={product.hue} intensity={0.7} core={false} />
                </div>
                <div className="p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-display text-2xl tracking-[0.3em]">{product.name}</p>
                    <span className="rounded-full border border-hairline px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                      {product.kind}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{product.role}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {product.summary}
                  </p>
                  <p className="mt-7 flex items-center justify-between text-sm text-foreground">
                    <span>Learn about {product.name} →</span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {product.status}
                    </span>
                  </p>
                </div>
              </Panel>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function BeliefSection() {
  return (
    <Section id="about" className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>Why OMNIEL exists</Eyebrow>
          <blockquote className="text-balance-tight mt-6 text-2xl leading-[1.25] sm:text-3xl md:text-4xl">
            “{positioning.belief}”
          </blockquote>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            Africa supplies a great deal of what the global economy runs on. OMNIEL is being built
            from Nigeria on the belief that it can also build the technology shaping what comes next
            — seriously, and to a global standard.
          </p>
          <div className="mt-10">
            <ActionLink to="/about" variant="ghost">
              About OMNIEL
            </ActionLink>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.05}>
              <Panel className="h-full p-6">
                <h3 className="text-lg leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function TechnologySection() {
  return (
    <Section className="border-t border-hairline">
      <SectionHeading
        eyebrow="Technology direction"
        title="What is actually being built."
        lede="These are directions under active development across the ecosystem, at different levels of maturity. Nothing here is presented as finished."
      />
      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {technologyDirections.map((d, i) => (
          <Reveal as="li" key={d.id} delay={i * 0.04}>
            <Panel interactive className="h-full p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                {d.stage}
              </p>
              <h3 className="mt-4 text-xl">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </Panel>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12">
        <ActionLink to="/technology" variant="ghost">
          Read the technology direction
        </ActionLink>
      </div>
    </Section>
  );
}

function ClosingSection() {
  return (
    <Section className="border-t border-hairline">
      <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-16">
        <div className="relative max-w-2xl">
          <Eyebrow>Get involved</Eyebrow>
          <h2 className="text-balance-tight mt-6 text-3xl leading-[1.1] md:text-5xl">
            Small team. Large ambition. Early enough to matter.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            OMNIEL is building toward becoming a global frontier AI and technology company. If you
            want to work on it, partner with it, or support it, this is the moment to reach out.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ActionLink to="/careers">Careers</ActionLink>
            <ActionLink to="/contact" variant="ghost">
              Contact
            </ActionLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <EcosystemSection />
      <BeliefSection />
      <TechnologySection />
      <ClosingSection />
    </>
  );
}
