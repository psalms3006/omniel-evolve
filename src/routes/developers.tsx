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

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developers — OMNIEL" },
      {
        name: "description",
        content:
          "SDKs, APIs, CLI, playground, and documentation for building on NOVA, VYREN, and OMNIEL Cloud.",
      },
      { property: "og:title", content: "Developers — OMNIEL" },
      {
        property: "og:description",
        content: "One SDK, one auth model, one trace format across the OMNIEL ecosystem.",
      },
    ],
  }),
  component: Developers,
});

const sdks = [
  { name: "TypeScript", pkg: "npm i @omniel/sdk", status: "Stable · v3.2" },
  { name: "Python", pkg: "pip install omniel", status: "Stable · v3.2" },
  { name: "Go", pkg: "go get go.omniel.dev/sdk", status: "Stable · v2.8" },
  { name: "Rust", pkg: "cargo add omniel", status: "Beta · v0.9" },
  { name: "Swift", pkg: "swift package add omniel", status: "Beta · v0.7" },
  { name: "Kotlin", pkg: "implementation(\"dev.omniel:sdk\")", status: "Beta · v0.6" },
];

const samples: Record<string, { label: string; code: string }> = {
  chat: {
    label: "Reasoning",
    code: `const reply = await omniel.responses.create({
  model: "nova-1",
  input: "Summarize this contract diff",
  attachments: [file],
  deliberation: "auto",
});

console.log(reply.text);`,
  },
  agents: {
    label: "Agents",
    code: `const run = await omniel.agents.start({
  model: "vyren-1",
  objective: "Reconcile Q3 invoices",
  budget: { usd: 340, hours: 6 },
  tools: ["ledger.read", "report.write"],
});

await run.waitUntilDone();`,
  },
  memory: {
    label: "Memory",
    code: `await omniel.memory.write({
  scope: "user",
  kind: "episodic",
  content: "Prefers metric units",
  retention: "until-revoked",
});

const recall = await omniel.memory.query("units");`,
  },
  voice: {
    label: "Voice",
    code: `const session = omniel.voice.connect({
  model: "nova-voice-1",
  duplex: true,
});

session.on("transcript", (t) => render(t));
session.say("Reading the summary now.");`,
  },
};

function Developers() {
  const [tab, setTab] = useState<keyof typeof samples>("chat");

  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="The platform is the product, too."
        lede="Everything OMNIEL builds internally is exposed through the same interfaces you get. No private endpoints, no privileged models."
      >
        <ActionLink href="https://github.com">GitHub</ActionLink>
        <ActionLink to="/contact" variant="ghost">
          Request API access
        </ActionLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Quickstart" title="Sixty seconds to first token." />
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <Panel className="h-full">
              <p className="eyebrow">Command line</p>
              <pre className="mt-6 overflow-x-auto font-mono text-sm leading-loose text-muted-foreground">
                <code>{`$ npm i -g @omniel/cli
$ omniel login
$ omniel run "draft a release note"
$ omniel agents ls --watch`}</code>
              </pre>
              <p className="mt-8 text-sm text-muted-foreground">
                The CLI shares credentials with the SDK and streams the same traces you see in the
                console.
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="h-full p-0">
              <div className="flex gap-1 overflow-x-auto border-b border-hairline p-2">
                {Object.entries(samples).map(([key, s]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key as keyof typeof samples)}
                    aria-pressed={tab === key}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                      tab === key
                        ? "bg-surface-strong text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[0.78rem] leading-relaxed text-muted-foreground md:p-8">
                <code>{samples[tab]!.code}</code>
              </pre>
            </Panel>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="SDKs" title="Six languages, one contract." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sdks.map((sdk, i) => (
            <Reveal as="li" key={sdk.name} delay={(i % 3) * 0.05}>
              <Panel interactive className="h-full p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-lg">{sdk.name}</p>
                  <p className="font-mono text-[0.7rem] text-accent">{sdk.status}</p>
                </div>
                <p className="mt-5 overflow-x-auto whitespace-nowrap rounded-xl bg-surface px-4 py-3 font-mono text-xs text-muted-foreground">
                  {sdk.pkg}
                </p>
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-hairline">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Documentation",
              body: "Guides, references, and runnable recipes for every endpoint in the platform.",
              action: "Read the docs",
            },
            {
              title: "Playground",
              body: "Compare models, tune deliberation budgets, and export the exact request as code.",
              action: "Open playground",
            },
            {
              title: "Status",
              body: "Region-level availability, latency percentiles, and a public incident history.",
              action: "View status",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <Panel interactive className="flex h-full flex-col">
                <h3 className="text-xl">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
                <div className="mt-8">
                  <ActionLink to="/contact" variant="quiet">
                    {card.action}
                  </ActionLink>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
