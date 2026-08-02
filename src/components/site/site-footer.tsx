import { Link } from "@tanstack/react-router";
import { ecosystem } from "@/lib/omniel";

const columns = [
  {
    title: "Products",
    links: [
      { label: "NOVA", to: "/products/nova" },
      { label: "VYREN", to: "/products/vyren" },
      { label: "All products", to: "/products" },
      { label: "Technology", to: "/technology" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Developers", to: "/developers" },
      { label: "Documentation", to: "/developers" },
      { label: "Playground", to: "/developers" },
      { label: "Status", to: "/developers" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Publications", to: "/research" },
      { label: "Benchmarks", to: "/research" },
      { label: "Safety", to: "/research" },
      { label: "Roadmap", to: "/research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "News", to: "/news" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden pt-24">
      <div aria-hidden className="aurora pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-40" />
      <div className="shell">
        <div className="grid gap-12 border-t border-hairline pt-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.42em]">OMNIEL</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Intelligence infrastructure built to last decades. Designed in San Francisco and
              Zürich.
            </p>
            <ul className="mt-8 space-y-2">
              {ecosystem.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="group flex items-baseline gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[0.7rem] text-accent/70">—</span>
                    <span>{item.name}</span>
                    <span className="text-xs opacity-60">{item.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OMNIEL. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link to="/company" className="transition-colors hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/company" className="transition-colors hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/research" className="transition-colors hover:text-foreground">
                Safety
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Press
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
