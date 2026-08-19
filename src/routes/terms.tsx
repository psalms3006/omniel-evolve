import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/primitives";
import { contactEmail } from "@/lib/omniel";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — OMNIEL" },
      {
        name: "description",
        content: "Terms of use for the OMNIEL website during the pre-launch stage.",
      },
      { property: "og:title", content: "Terms — OMNIEL" },
      { property: "og:description", content: "Terms of use for the OMNIEL website." },
    ],
  }),
  component: Terms,
});

/* PLACEHOLDER: plain-language draft, not legal advice.
   Replace with reviewed terms before any formal launch. */
function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of use"
        lede="A short, honest set of terms for a website that describes work in progress."
      />
      <Section>
        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            This website describes an early-stage AI and technology initiative. Product descriptions
            reflect work in development and planned direction, not guarantees of availability,
            performance or release timing.
          </p>
          <p>
            Any figures presented as targets — including NOVA's internal productivity goal — are
            targets, not independently validated benchmarks.
          </p>
          <p>
            The OMNIEL name, product names and site content belong to OMNIEL. Please do not
            reproduce them in a way that implies endorsement or partnership.
          </p>
          <p>
            Questions about these terms can be sent to{" "}
            <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
