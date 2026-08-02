import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Panel, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { productBySlug } from "@/lib/omniel";

export const Route = createFileRoute("/products/$slug/")({
  component: Overview,
});

function Overview() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug)!;

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <SectionHeading eyebrow="Overview" title={product.summary} />
          <dl className="grid grid-cols-2 gap-6 self-end">
            {product.spec.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow">{s.label}</dt>
                <dd className="mt-2 text-base">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2">
          {product.capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06}>
              <Panel interactive className="h-full">
                <h3 className="text-xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            <ActionLink to="/products/$slug/features" params={{ slug: product.slug }}>
              Explore features
            </ActionLink>
            <ActionLink to="/contact" variant="ghost">
              Request access
            </ActionLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
