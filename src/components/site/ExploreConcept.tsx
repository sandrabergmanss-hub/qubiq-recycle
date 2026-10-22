import { COPY, CONCEPT_TOPICS } from "@/content/site";
import { ChevronDown } from "lucide-react";

export function ExploreConcept() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <h2 id="explore-heading" className="display text-4xl md:text-5xl">{COPY.explore.title}</h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{COPY.explore.description}</p>
      </div>
      <div className="border-t border-border">
        {CONCEPT_TOPICS.map((topic) => (
          <details key={topic.id} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium leading-relaxed hover:text-primary focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 md:text-lg [&::-webkit-details-marker]:hidden">
              <span>{topic.title}</span>
              <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground group-open:rotate-180" />
            </summary>
            <div className="space-y-4 pb-7 pr-6 text-base leading-relaxed text-muted-foreground md:pr-10">
              {topic.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}