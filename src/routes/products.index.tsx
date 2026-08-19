import { createFileRoute, Link } from "@tanstack/react-router";
import { NeuralField } from "@/components/site/neural-field";
import { PageHero, Panel, Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { products } from "@/lib/omniel";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — NOVA, VYREN, ARVO and KIWI | OMNIEL" },
      {
        name: "description",
        content:
          "The OMNIEL product ecosystem: NOVA the generalist assistant, VYREN for complex technical work, ARVO the voice-first system, and KIWI, an emerging project.",
      },
      { property: "og:title", content: "OMNIEL products" },
      {
        property: "og:description",
        content: "Four systems, four different classes of problem, one ecosystem.",
      },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Four systems. Different problems."
        lede="Each OMNIEL product has its own identity, audience and status. None of them is a ranked version of another."
      />

      <Section id="ecosystem">
        <ul className="grid gap-4 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                id={p.slug}
                className="block h-full scroll-mt-28"
              >
                <Panel interactive className="h-full overflow-hidden p-0">
                  <div className="relative h-36 border-b border-hairline">
                    <NeuralField hue={p.hue} intensity={0.7} core={false} />
                  </div>
                  <div className="p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-display text-2xl tracking-[0.3em]">{p.name}</p>
                      <span className="rounded-full border border-hairline px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                        {p.kind}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{p.role}</p>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                    <p className="mt-7 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {p.status}
                    </p>
                  </div>
                </Panel>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="compare" className="border-t border-hairline">
        <SectionHeading
          eyebrow="Compare"
          title="Which one is for what."
          lede="A plain comparison, without ranking."
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <caption className="sr-only">Comparison of OMNIEL products</caption>
            <thead>
              <tr className="border-b border-hairline text-muted-foreground">
                <th scope="col" className="py-4 pr-6 font-normal">
                  Product
                </th>
                <th scope="col" className="py-4 pr-6 font-normal">
                  Position
                </th>
                <th scope="col" className="py-4 pr-6 font-normal">
                  Primary audience
                </th>
                <th scope="col" className="py-4 font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-b border-hairline align-top">
                  <th scope="row" className="py-5 pr-6 font-display text-lg tracking-[0.2em]">
                    {p.name}
                  </th>
                  <td className="py-5 pr-6 text-muted-foreground">{p.kind}</td>
                  <td className="py-5 pr-6 text-muted-foreground">{p.audience.join(", ")}</td>
                  <td className="py-5 text-muted-foreground">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
