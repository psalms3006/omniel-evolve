import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";
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

      <Section id="what-this-is">
        <SectionHeading eyebrow="01" title="What this site is" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          This website describes an early-stage AI and technology initiative. Product descriptions
          reflect work in development and planned direction, not guarantees of availability,
          performance or release timing.
        </p>
      </Section>

      <Section id="figures" className="border-t border-hairline">
        <SectionHeading eyebrow="02" title="Figures and targets" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Any figures presented as targets — including NOVA's internal productivity goal — are
          targets, not independently validated benchmarks.
        </p>
      </Section>

      <Section id="ownership" className="border-t border-hairline">
        <SectionHeading eyebrow="03" title="Ownership" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          The OMNIEL name, product names and site content belong to OMNIEL. Please don't reproduce
          them in a way that implies endorsement or partnership.
        </p>
      </Section>

      <Section id="changes" className="border-t border-hairline">
        <SectionHeading eyebrow="04" title="Changes to these terms" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          As the site and the products it describes change, these terms will change with them. Last
          updated September 2026.
        </p>
      </Section>

      <Section id="contact" className="border-t border-hairline">
        <SectionHeading eyebrow="05" title="Contact" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Questions about these terms can be sent to{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          .
        </p>
      </Section>
    </>
  );
}
