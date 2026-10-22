import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, COPY } from "@/content/site";

// Contact is a mailto call-to-action: the visitor's own email app sends the message,
// so nothing is collected, stored or forwarded by this site.
// The wording lives in src/content/site.ts. If that entry is ever missing, the section
// still shows its button and email link instead of blanking the page.
const FALLBACK = { title: "Contact", description: "", cta: "Get in touch" };
const contact = COPY.contact ?? FALLBACK;

export function ContactCta() {
  return (
    <div className="max-w-3xl">
      <h2 className="display text-5xl md:text-7xl">{contact.title}</h2>
      {contact.description ? (
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {contact.description}
        </p>
      ) : null}
      <div className="mt-12 flex flex-col items-start gap-6">
        <Button asChild variant="editorial" size="editorial">
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {contact.cta}
            <ArrowUpRight />
          </a>
        </Button>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-base underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}
