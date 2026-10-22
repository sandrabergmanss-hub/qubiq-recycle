import { createFileRoute } from "@tanstack/react-router";
import { BRAND, NAV, COPY, CONTACT_EMAIL, STEPS } from "@/content/site";
import { Nav } from "@/components/site/Nav";
import { ExploreConcept } from "@/components/site/ExploreConcept";
import { ConceptViewer } from "@/components/site/ConceptViewer";
import { ContactCta } from "@/components/site/ContactCta";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero-stockholm.jpg";
import room from "@/assets/recycling-room.jpg";
import courtyard from "@/assets/courtyard.jpg";
import stockholm from "@/assets/stockholm-dusk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qubiq Recycle — a recycling concept in development" },
      { name: "description", content: "Explore Qubiq Recycle’s vision for space-conscious cardboard recycling in shared residential buildings. An early-stage concept in development in Stockholm." },
      { property: "og:title", content: "Qubiq Recycle — a recycling concept in development" },
      { property: "og:description", content: "The idea, the development status and a way to connect: exploring cardboard compaction for shared residential recycling spaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="eyebrow">{children}</p>
  );
}

function Index() {
  return (
    <div id="top" className="bg-background text-foreground">
      <Nav />
      <main>
        <section aria-labelledby="hero-heading" className="hero-frame relative overflow-hidden bg-ink text-ivory">
          <img src={hero} alt="Stockholm's Riddarholmen waterfront in morning light" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="veil absolute inset-0" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-12 md:px-10 md:pb-16">
            <p className="eyebrow mb-6 opacity-80">{COPY.hero.eyebrow}</p>
            <h1 id="hero-heading" className="display max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">{COPY.hero.headline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-90 md:text-xl">{COPY.hero.description}</p>
            <div className="mt-9">
              <Button asChild variant="editorial" size="editorial" className="bg-ivory text-ink hover:bg-ivory/90">
                <a href="#idea">{COPY.hero.cta}<ArrowDown /></a>
              </Button>
            </div>
          </div>
        </section>

        <section id="idea" aria-labelledby="idea-heading" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="text-muted-foreground"><SectionLabel>{COPY.idea.title}</SectionLabel></div>
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 id="idea-heading" className="display max-w-xl text-4xl md:text-6xl">{COPY.idea.headline}</h2>
              <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                {COPY.idea.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div>
              <figure>
                <img src={room} alt="An illustrative shared recycling room with cardboard stacked beside collection bins" width={1600} height={1072} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="eyebrow mt-4 text-muted-foreground">{COPY.idea.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="development" aria-labelledby="development-heading" className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
            <SectionLabel>{COPY.development.title}</SectionLabel>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
              <h2 id="development-heading" className="display max-w-xl text-4xl md:text-6xl">{COPY.development.headline}</h2>
              <div className="max-w-xl space-y-6 text-lg leading-relaxed">
                <p className="opacity-85">{COPY.development.description}</p>
                <p className="opacity-85">{COPY.development.focus}</p>
              </div>
            </div>
          </div>
          <div className="bg-background text-foreground">
            <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-16">
              <div>
                <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">{COPY.development.viewerNote}</p>
                <ConceptViewer />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="text-muted-foreground"><SectionLabel>{COPY.journey.title}</SectionLabel></div>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 id="journey-heading" className="display max-w-xl text-4xl md:text-5xl">{COPY.journey.headline}</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{COPY.journey.description}</p>
            </div>
            <ol className="space-y-8">
              {STEPS.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-5">
                  <span className="eyebrow pt-1 text-muted-foreground">0{index + 1}</span>
                  <div><h3 className="text-xl font-medium">{step.title}</h3><p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="shared-heading" className="bg-card">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-20">
            <figure>
              <img src={courtyard} alt="An illustrative residential courtyard with planting and shared outdoor space" width={1600} height={1072} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="eyebrow mt-4 text-muted-foreground">{COPY.shared.caption}</figcaption>
            </figure>
            <div>
              <div className="text-muted-foreground"><SectionLabel>{COPY.shared.title}</SectionLabel></div>
              <h2 id="shared-heading" className="display mt-8 max-w-xl text-4xl md:text-5xl">{COPY.shared.headline}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{COPY.shared.description}</p>
            </div>
          </div>
        </section>

        <section id="stockholm" aria-labelledby="stockholm-heading" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-muted-foreground"><SectionLabel>{COPY.stockholm.title}</SectionLabel></div>
              <h2 id="stockholm-heading" className="display mt-8 max-w-xl text-4xl md:text-5xl">{COPY.stockholm.headline}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{COPY.stockholm.description}</p>
            </div>
            <figure>
              <img src={stockholm} alt="An illustrative view across Stockholm's waterfront at dusk" width={1600} height={1072} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="eyebrow mt-4 text-muted-foreground">{COPY.stockholm.caption}</figcaption>
            </figure>
          </div>
        </section>

        <section id="explore" aria-labelledby="explore-heading" className="bg-card">
          <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28"><ExploreConcept /></div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <ContactCta />
          </div>
        </section>
      </main>

      <footer className="bg-ink py-16 text-ivory">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 md:flex-row md:justify-between md:px-10">
          <div>
            <p className="text-lg font-semibold">{BRAND}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block opacity-70 hover:opacity-100">{CONTACT_EMAIL}</a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="eyebrow opacity-70 hover:opacity-100">{n.label}</a></li>)}
          </ul>
        </div>
        <p className="mx-auto mt-16 max-w-[1440px] px-6 text-xs opacity-50 md:px-10">{COPY.footer}</p>
      </footer>
    </div>
  );
}
