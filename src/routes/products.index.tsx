import { createFileRoute, Link } from "@tanstack/react-router";
import { CoreScene } from "@/components/site/core-scene";
import {
  ActionLink,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  PageHero,
} from "@/components/site/primitives";
import { ecosystem, products } from "@/lib/omniel";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — OMNIEL" },
      {
        name: "description",
        content:
          "NOVA, a personal AI operating system, and VYREN, an autonomous agent platform — two products on one OMNIEL architecture.",
      },
      { property: "og:title", content: "Products — OMNIEL" },
      {
        property: "og:description",
        content: "Two products on one architecture: NOVA and VYREN.",
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
        title="Two products. One architecture beneath them."
        lede="Each product in the OMNIEL ecosystem inherits the same memory, reasoning, and permission model. Adding the next one changes nothing about how the others behave."
      >
        <ActionLink to="/products/$slug" params={{ slug: "nova" }}>
          Discover NOVA
        </ActionLink>
        <ActionLink to="/products/$slug" params={{ slug: "vyren" }} variant="ghost">
          Discover VYREN
        </ActionLink>
      </PageHero>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <Panel className="h-full overflow-hidden p-0">
                <div className="relative h-64">
                  <CoreScene className="absolute inset-0" hue={product.hue} density={0.5} compact />
                </div>
                <div className="p-8 md:p-10">
                  <p className="font-display text-3xl tracking-[0.3em]">{product.name}</p>
                  <p className="mt-2 text-sm text-accent">{product.role}</p>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    {product.statement}
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-5">
                    {product.spec.map((s) => (
                      <div key={s.label}>
                        <dt className="eyebrow">{s.label}</dt>
                        <dd className="mt-2 text-sm">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <ActionLink to="/products/$slug" params={{ slug: product.slug }}>
                      Overview
                    </ActionLink>
                    <ActionLink
                      to="/products/$slug/demo"
                      params={{ slug: product.slug }}
                      variant="ghost"
                    >
                      Demo
                    </ActionLink>
                  </div>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Room for what comes next."
          lede="The naming system, the permission model, and the developer surface were designed so that cloud, studio, and robotics could arrive without a rewrite."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((item) => (
            <li key={item.name}>
              <Link to={item.to} className="block h-full">
                <Panel interactive className="h-full p-6">
                  <p className="font-display text-lg">{item.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.role}</p>
                </Panel>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
