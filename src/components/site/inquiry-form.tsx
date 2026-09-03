import { useId, useState, type FormEvent } from "react";
import { contactEmail } from "@/lib/omniel";
import { cn } from "@/lib/utils";

type Props = {
  /**
   * Stable id used for deep links, the `fill_form`/`open_form` assistant
   * tools, and as the `formId` sent to POST /api/enquiry. Must match one of
   * the ids in ENQUIRY_FORM_IDS (src/lib/enquiry-schema.ts).
   */
  id: string;
  title: string;
  description: string;
  categories?: readonly string[];
  categoryLabel?: string;
  className?: string;
  submitLabel?: string;
};

type Status = "idle" | "sending" | "sent" | "failed";

const field =
  "w-full rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-accent/60";

function buildMailto(
  title: string,
  category: string,
  name: string,
  email: string,
  message: string,
) {
  const subject = `${title}${category ? ` — ${category}` : ""}`;
  const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Inquiry form. Tries the real /api/enquiry backend first; if that fails for
 * any reason (not configured, network error, delivery failure), it falls
 * back to opening the visitor's email client via mailto — it never claims a
 * submission succeeded unless the backend actually confirmed it.
 *
 * Field inputs carry `data-field="..."` attributes so the assistant's
 * `fill_form` action can populate them without relying on randomly generated
 * ids (`useId()` output isn't stable/guessable from outside the component).
 */
export function InquiryForm({
  id,
  title,
  description,
  categories,
  categoryLabel = "Area",
  className,
  submitLabel = "Send",
}: Props) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const category = String(data.get("category") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Clicking Send is the user's explicit confirmation.
        body: JSON.stringify({ formId: id, name, email, category, message, confirmation: true }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
    } catch {
      // fall through to mailto fallback below
    }

    setStatus("failed");
    window.location.href = buildMailto(title, category, name, email, message);
  }

  return (
    <section id={id} className={cn("glass scroll-mt-28 rounded-3xl p-6 md:p-9", className)}>
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>

      <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <label htmlFor={`${uid}-name`} className="eyebrow mb-2 block">
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            data-field="name"
            required
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            data-field="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>

        {categories ? (
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-category`} className="eyebrow mb-2 block">
              {categoryLabel}
            </label>
            <select
              id={`${uid}-category`}
              name="category"
              data-field="category"
              className={cn(field, "appearance-none")}
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-background">
                  {c}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="eyebrow mb-2 block">
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            data-field="message"
            rows={5}
            required
            className={cn(field, "resize-y")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-500 hover:brightness-110 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {status === "sent" && "Sent — thank you, we'll be in touch."}
            {status === "sending" && "Sending…"}
            {status === "failed" &&
              `Automatic sending failed — your email client should have opened as a fallback. If not, write to ${contactEmail}.`}
            {status === "idle" &&
              "Submissions go straight to OMNIEL, with your email client as a fallback if that fails."}
          </p>
        </div>
      </form>
    </section>
  );
}
