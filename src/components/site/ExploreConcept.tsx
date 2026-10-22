import { COPY, CONCEPT_TOPICS } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ExploreConcept() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <h2 id="explore-heading" className="display text-4xl md:text-5xl">{COPY.explore.title}</h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{COPY.explore.description}</p>
      </div>
      <Accordion type="multiple" className="border-t border-border">
        {CONCEPT_TOPICS.map((topic) => (
          <AccordionItem key={topic.id} value={topic.id}>
            <AccordionTrigger className="gap-6 py-6 text-base leading-relaxed transition-none hover:no-underline hover:text-primary focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 md:text-lg [&>svg]:transition-none">
              {topic.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-7 pr-6 text-base leading-relaxed text-muted-foreground md:pr-10">
              {topic.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}