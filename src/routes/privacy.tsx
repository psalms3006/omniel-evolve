import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/primitives";
import { contactEmail } from "@/lib/omniel";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — OMNIEL" },
      {
        name: "description",
        content: "How the OMNIEL website handles information while the ecosystem is in development.",
      },
      { property: "og:title", content: "Privacy — OMNIEL" },
      { property: "og:description", content: "Privacy notice for the OMNIEL website." },
    ],
  }),
  component: Privacy,
});

/* PLACEHOLDER: this notice is a plain-language draft, not legal advice.
   Replace with a reviewed policy before any formal launch. */
function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice"
        lede="OMNIEL is pre-launch. This notice describes the website only, and will be replaced with a reviewed policy before any formal launch."
      />
      <Section>
        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            This website does not currently operate accounts, and no submission backend is connected
            yet. Forms on this site compose an email in your own mail client — nothing is stored on
            our side until you choose to send it.
          </p>
          <p>
            If you email {contactEmail}, that message and the details you include are kept only for
            the purpose of replying to you.
          </p>
          <p>
            No advertising trackers are used on this site. Any future analytics, hosted forms or
            product accounts will be described here before they are introduced.
          </p>
          <p>
            To ask what we hold about you, or to have a message deleted, write to{" "}
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
