import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { INTEREST_OPTIONS } from "@/content/site";
import { sendContactMessage } from "@/lib/contact.functions";

type State = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "interest" | "message", string>>;

const field =
  "w-full border-0 border-b border-input bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const send = useServerFn(sendContactMessage);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    if (!data["name"]?.trim()) errs.name = "Please enter your name.";
    else if (data["name"].length > 100) errs.name = "Please keep your name under 100 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"] ?? "")) errs.email = "Please enter a valid email.";
    if (!data["interest"]) errs.interest = "Please choose an area of interest.";
    const msg = (data["message"] ?? "").trim();
    if (msg.length < 10) errs.message = "Please write a short message.";
    else if (msg.length > 5000) errs.message = "Please keep your message under 5000 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    try {
      const res = await send({ data });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="border-t border-foreground pt-8">
        <p className="display text-3xl">Thank you.</p>
        <p className="mt-3 text-muted-foreground">Your message has been received. We'll be in touch.</p>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-2 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      {!CONTACT_ENDPOINT && <p className="text-sm text-muted-foreground sm:col-span-2">Contact submissions are not connected yet. No messages can be delivered.</p>}
      <label className="block">
        <span className="eyebrow text-muted-foreground">Name</span>
        <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-err" />
        <Err k="name" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Organization</span>
        <input name="organization" autoComplete="organization" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Work email</span>
        <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-err" />
        <Err k="email" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Area of interest</span>
        <select name="interest" defaultValue="" className={field} aria-invalid={!!errors.interest} aria-describedby="interest-err">
          <option value="" disabled>
            Select…
          </option>
          {INTEREST_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Err k="interest" />
      </label>
      <label className="block sm:col-span-2">
        <span className="eyebrow text-muted-foreground">Message</span>
        <textarea name="message" rows={4} className={field} aria-invalid={!!errors.message} aria-describedby="message-err" />
        <Err k="message" />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="editorial" size="editorial"
          type="submit"
          disabled={state === "sending"}
          className="self-start"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        <ArrowUpRight /></Button>
        <div aria-live="polite" className="text-sm">
          {state === "unconfigured" && (
            <p className="text-muted-foreground">
              Message not sent — submissions aren't connected yet. Your details were not stored.
            </p>
          )}
          {state === "error" && <p className="text-destructive">Something went wrong. Please try again.</p>}
        </div>
      </div>
    </form>
  );
}
