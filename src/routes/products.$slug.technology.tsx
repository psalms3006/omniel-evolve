import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Panel, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { CoreScene } from "@/components/site/core-scene";
import { productBySlug } from "@/lib/omniel";

export const Route = createFileRoute("/products/$slug/technology")({
  component: ProductTechnology,
});

function ProductTechnology() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug)!;

  return (
    <Section>
      <SectionHeading
        eyebrow="Technology"
        title={`The architecture behind ${product.name}.`}
        lede="Four layers, each independently observable. A change in one does not silently alter the others."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ol className="relative space-y-4">
          {product.architecture.map((layer, i) => (
            <Reveal as="li" key={layer.layer} delay={i * 0.07}>
              <Panel interactive className="grid gap-4 md:grid-cols-[8rem_1fr]">
                <div>
                  <p className="font-mono text-[0.7rem] text-accent">
                    L{product.architecture.length - i}
                  </p>
                  <p className="mt-2 font-display text-lg">{layer.layer}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
              </Panel>
            </Reveal>
          ))}
        </ol>

        <div className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-hairline">
          <CoreScene className="absolute inset-0" hue={product.hue} density={0.7} compact />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-mono text-xs text-muted-foreground">
              {product.name} runtime topology · live view
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <ActionLink to="/technology">The full OMNIEL stack</ActionLink>
        <ActionLink to="/developers" variant="ghost">
          Build with {product.name}
        </ActionLink>
      </div>
    </Section>
  );
}
