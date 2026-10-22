import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, COPY } from "@/content/site";

// Contact is a mailto call-to-action: the visitor's own email app sends the message,
// so nothing is collected, stored or forwarded by this site.
export function ContactCta() {
  return (
    <div className="max-w-3xl">
      <h2 className="display text-5xl md:text-7xl">{COPY.contact.title}</h2>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {COPY.contact.description}
      </p>
      <div className="mt-12 flex flex-col items-start gap-6">
        <Button asChild variant="editorial" size="editorial">
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {COPY.contact.cta}
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
