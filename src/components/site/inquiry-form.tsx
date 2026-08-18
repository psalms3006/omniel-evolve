import { useId, useState, type FormEvent } from "react";
import { contactEmail } from "@/lib/omniel";
import { cn } from "@/lib/utils";

type Props = {
  /** Stable id used for deep links and future assistant navigation. */
  id: string;
  title: string;
  description: string;
  categories?: readonly string[];
  categoryLabel?: string;
  className?: string;
  submitLabel?: string;
};

const field =
  "w-full rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-accent/60";

/**
 * Front-end only inquiry form.
 * No submission backend is connected yet — the form composes a message the
 * visitor can send to the public OMNIEL address.
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
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const category = String(data.get("category") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `${title}${category ? ` — ${category}` : ""}`;
    const body = [`Name: ${name}`, `Email: ${String(data.get("email") ?? "")}`, "", message].join(
      "\n",
    );
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
          <input id={`${uid}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
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
            <select id={`${uid}-category`} name="category" className={cn(field, "appearance-none")}>
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
            rows={5}
            required
            className={cn(field, "resize-y")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-500 hover:brightness-110"
          >
            {submitLabel}
          </button>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {sent
              ? "Your email client should have opened. If not, write to " + contactEmail + "."
              : "Submissions are sent by email for now. A hosted form will follow."}
          </p>
        </div>
      </form>
    </section>
  );
}
