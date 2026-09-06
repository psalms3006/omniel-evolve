import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Panel, Section, SectionHeading } from "@/components/site/primitives";
import { contactEmail } from "@/lib/omniel";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — OMNIEL" },
      {
        name: "description",
        content:
          "How the OMNIEL website handles information while the ecosystem is in development.",
      },
      { property: "og:title", content: "Privacy — OMNIEL" },
      { property: "og:description", content: "Privacy notice for the OMNIEL website." },
    ],
  }),
  component: Privacy,
});

const dontDo = [
  "We don't run accounts, logins or user profiles on this site.",
  "We don't use cookies, analytics, or tracking scripts of any kind.",
  "We don't sell, rent or share your information with third parties.",
  "We don't use anything you send us to train any AI model.",
  "We don't show ads or work with advertising networks.",
];

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

      <Section id="scope">
        <SectionHeading eyebrow="01" title="Who this applies to" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          This notice covers omniel.com.ng — the public website. It does not cover NOVA, VYREN,
          ARVO, KIWI or ORIN themselves, which are separate, unlaunched systems with their own data
          practices to be described when they're publicly available.
        </p>
      </Section>

      <Section id="collect" className="border-t border-hairline">
        <SectionHeading eyebrow="02" title="What we collect" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Only what you choose to give us: your name, email address, and whatever you write when you
          use a form on this site or email {contactEmail} directly. That's the entire list.
        </p>
      </Section>

      <Section id="use" className="border-t border-hairline">
        <SectionHeading eyebrow="03" title="How it's used" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Solely to read your message and reply to you. Form submissions send directly to us; if
          that fails, your own email client opens as a fallback so your message isn't lost either
          way. We keep it only for as long as it takes to have that conversation.
        </p>
      </Section>

      <Section id="dont-do" className="border-t border-hairline">
        <SectionHeading eyebrow="04" title="What we don't do" />
        <ul className="grid max-w-2xl gap-3">
          {dontDo.map((item) => (
            <li key={item}>
              <Panel className="p-5 text-sm leading-relaxed text-muted-foreground">{item}</Panel>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          If any of this changes — analytics, hosted forms, product accounts — it will be described
          here, updated, before it's introduced.
        </p>
      </Section>

      <Section id="rights" className="border-t border-hairline">
        <SectionHeading eyebrow="05" title="Your rights" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          You can ask what we hold about you, or ask us to delete it, at any time. Write to{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          .
        </p>
      </Section>

      <Section id="changes" className="border-t border-hairline">
        <SectionHeading eyebrow="06" title="Changes to this notice" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          As OMNIEL's actual practices change, this page will change with them — not the other way
          around. Last updated September 2026.
        </p>
      </Section>

      <Section id="contact" className="border-t border-hairline">
        <SectionHeading eyebrow="07" title="Contact" />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Questions about this notice can go to the same address:{" "}
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
