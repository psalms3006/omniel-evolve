import { Link, Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { CoreScene } from "@/components/site/core-scene";
import { Eyebrow, Shell } from "@/components/site/primitives";
import { productBySlug } from "@/lib/omniel";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — OMNIEL" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ${product.role} — OMNIEL` },
        { name: "description", content: product.summary },
        { property: "og:title", content: `${product.name} — ${product.role}` },
        { property: "og:description", content: product.statement },
      ],
    };
  },
  component: ProductLayout,
});

const tabs = [
  { label: "Overview", to: "/products/$slug" as const, exact: true },
  { label: "Features", to: "/products/$slug/features" as const, exact: false },
  { label: "Demo", to: "/products/$slug/demo" as const, exact: false },
  { label: "Technology", to: "/products/$slug/technology" as const, exact: false },
];

function ProductLayout() {
  const { product } = Route.useLoaderData();

  return (
    <>
      <header className="relative overflow-hidden pb-10 pt-36 md:pt-44">
        <CoreScene
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          hue={product.hue}
          density={0.6}
        />
        <Shell>
          <Eyebrow>{product.role}</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] leading-none tracking-[0.18em]">
            {product.name}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {product.statement}
          </p>
        </Shell>
      </header>

      <div className="sticky top-[4.5rem] z-30">
        <Shell>
          <nav aria-label={`${product.name} sections`} className="glass rounded-full p-1.5">
            <ul className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <li key={tab.label}>
                  <Link
                    to={tab.to}
                    params={{ slug: product.slug }}
                    activeOptions={{ exact: tab.exact }}
                    className="inline-flex whitespace-nowrap rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-surface-strong data-[status=active]:text-foreground"
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Shell>
      </div>

      <Outlet />
    </>
  );
}
