import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BRAND, NAV } from "@/content/site";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { ConceptViewer } from "@/components/site/ConceptViewer";
import { ContactForm } from "@/components/site/ContactForm";
import hero from "@/assets/hero-stockholm.jpg";
import courtyard from "@/assets/courtyard.jpg";
import room from "@/assets/recycling-room.jpg";
import dusk from "@/assets/stockholm-dusk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QUBIQ — a recycling concept for Stockholm" },
      {
        name: "description",
        content:
          "QUBIQ is an emerging vision for smarter, more space-conscious recycling in Stockholm's residential buildings. A concept open to investors, the city and partners.",
      },
      { property: "og:title", content: "QUBIQ — a better future is built into the everyday" },
      {
        property: "og:description",
        content:
          "QUBIQ is a concept for space-conscious recycling in Stockholm's shared residential spaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Parallax({ src, alt, className, w, h }: { src: string; alt: string; className?: string; w: number; h: number }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.parentElement!.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translateY(${p * -8}%) scale(1.15)`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <img ref={ref} src={src} alt={alt} width={w} height={h} loading="lazy" className="h-full w-full scale-[1.15] object-cover will-change-transform" />
    </div>
  );
}

function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <div className="eyebrow flex items-center gap-4 text-muted-foreground">
      <span>{n}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}

const STEPS = [
  { n: "01", t: "Bring your recyclable cardboard.", d: "Residents carry packaging to the shared recycling room, as they do today." },
  { n: "02", t: "Use the proposed compaction system.", d: "The concept explores reducing bulky cardboard into a more manageable form." },
  { n: "03", t: "Continue through established arrangements.", d: "Material carries on through the building's existing recycling collection." },
];

const AUDIENCES = [
  { t: "Investors", d: "Interested in sustainable urban innovation at an early, formative stage." },
  { t: "City of Stockholm", d: "Municipal stakeholders exploring better everyday recycling infrastructure." },
  { t: "Property owners & BRFs", d: "Housing associations considering how shared spaces could work better." },
  { t: "Development partners", d: "Product development, manufacturing and pilot-project collaborators." },
];

function Index() {
  return (
    <div id="top" className="bg-background text-foreground">
      <Nav />

      {/* 1 HERO */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-ivory">
        <img
          src={hero}
          alt="Stockholm's Riddarholmen waterfront reflected in still morning water"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-14 md:px-10 md:pb-20">
          <p className="eyebrow animate-rise mb-6 opacity-80" style={{ animationDelay: "300ms" }}>
            A concept for Stockholm
          </p>
          <h1 className="display max-w-5xl text-[13vw] sm:text-7xl lg:text-[8.5rem]">
            <span className="animate-rise block" style={{ animationDelay: "500ms" }}>A better future</span>
            <span className="animate-rise block" style={{ animationDelay: "700ms" }}>
              is built into <em className="font-serif font-normal">the everyday.</em>
            </span>
          </h1>
          <div className="animate-rise mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between" style={{ animationDelay: "1000ms" }}>
            <p className="max-w-md text-lg opacity-85">
              An emerging vision for smarter, more space-conscious recycling in Stockholm.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#vision" className="eyebrow bg-ivory px-7 py-4 text-ink transition-opacity hover:opacity-90">
                Explore the vision
              </a>
              <a href="#contact" className="eyebrow border border-ivory/60 px-7 py-4 transition-colors hover:bg-ivory/10">
                Discuss a collaboration
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 VISION */}
      <section id="vision" className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <Reveal><SectionLabel n="01">The bigger vision</SectionLabel></Reveal>
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-5xl md:text-7xl">
              Better recycling starts where <em className="font-serif font-normal">everyday life</em> happens.
            </h2>
            <div className="mt-12 grid max-w-2xl gap-6 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>
                Online shopping and deliveries bring more packaging into our homes. Much of it is cardboard — light, but bulky — and it ends up in the shared recycling rooms of apartment buildings.
              </p>
              <p>
                Residents already do their part. The opportunity lies in the spaces and systems around them: designing recycling environments that are more practical, more considered and more pleasant to use.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={150}>
            <Parallax src={courtyard} alt="A quiet Scandinavian residential courtyard with birch trees and timber facades" w={1280} h={1600} className="aspect-[4/5]" />
            <p className="eyebrow mt-4 text-muted-foreground">Shared residential space · illustrative</p>
          </Reveal>
        </div>
      </section>

      {/* 3 CONCEPT */}
      <section id="concept" className="bg-card py-28 md:py-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal><SectionLabel n="02">The concept</SectionLabel></Reveal>
          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">A new approach to everyday recycling.</h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The proposed solution is a medium-sized, space-efficient compaction machine for residential recycling rooms. The initial concept focuses on cardboard. Future configurations for plastic and metal may be explored.
              </p>
              <dl className="mt-12 divide-y divide-border border-y border-border">
                {[
                  ["Space-conscious form factor", "Concept intention"],
                  ["Designed for shared residential recycling environments", "Concept intention"],
                  ["Intended to make handling packaging more practical", "Concept intention"],
                  ["Connects industrial design with everyday behaviour", "Concept intention"],
                  ["Plastic and metal configurations", "Future possibility"],
                ].map(([t, k]) => (
                  <div key={t} className="flex items-baseline justify-between gap-6 py-5">
                    <dt className="text-lg">{t}</dt>
                    <dd className={`eyebrow shrink-0 ${k === "Future possibility" ? "text-water" : "text-muted-foreground"}`}>{k}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-muted-foreground">
                These are design intentions, not verified performance claims. Final design, dimensions and specifications are yet to be established.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 3D */}
      <section aria-labelledby="viewer-h" className="bg-ink py-28 text-ivory md:py-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="viewer-h" className="display text-4xl md:text-6xl">Explore the concept.</h2>
            <p className="max-w-sm opacity-70">
              This space is reserved for the approved concept model, product film and technical illustrations.
            </p>
          </Reveal>
          <Reveal delay={150} className="text-foreground">
            <ConceptViewer />
          </Reveal>
        </div>
      </section>

      {/* 5 HOW */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <Reveal><SectionLabel n="03">How it could work</SectionLabel></Reveal>
        <ol className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="bg-background">
              <li className="flex h-full flex-col p-2 pb-10 md:p-8">
                <span className="display font-serif text-7xl font-normal text-stone md:text-8xl">{s.n}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-tight">{s.t}</h3>
                <p className="mt-4 text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">Conceptual steps — not operating instructions.</p>
      </section>

      {/* 6 SHARED SPACES */}
      <section className="relative">
        <Parallax src={room} alt="A calm, timber-lined shared recycling room with flattened cardboard stacked neatly" w={1600} h={1072} className="h-[70vh] min-h-[420px]" />
        <div className="mx-auto -mt-32 max-w-[1440px] px-6 md:px-10">
          <Reveal className="relative ml-auto max-w-2xl bg-background p-8 md:p-14">
            <SectionLabel n="04">Designed for shared spaces</SectionLabel>
            <h2 className="display mt-8 text-4xl md:text-5xl">Made to belong in the rooms we share.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Recycling rooms in Swedish apartment buildings and BRFs come with real constraints. The design ambition is a machine considered for its footprint, ease of use and visual integration — something that could sit comfortably alongside existing arrangements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7 STOCKHOLM */}
      <section id="stockholm" className="relative mt-28 flex min-h-[90vh] items-center overflow-hidden bg-ink text-ivory md:mt-40">
        <Parallax src={dusk} alt="Stockholm's skyline across the water at blue hour" w={1920} h={1088} className="absolute inset-0" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 py-28 md:px-10">
          <Reveal>
            <p className="eyebrow opacity-80">05 — A vision for Stockholm</p>
            <h2 className="display mt-8 max-w-5xl text-5xl md:text-8xl">
              A cleaner city is shaped by <em className="font-serif font-normal">everyday decisions.</em>
            </h2>
            <p className="mt-10 max-w-lg text-lg opacity-85">
              From the courtyard to the waterfront, the quality of a city is built in small, repeated moments. Better-designed recycling could be one of them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 COLLABORATION */}
      <section id="collaboration" className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <Reveal><SectionLabel n="06">Collaboration</SectionLabel></Reveal>
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-5xl md:text-7xl">Help shape the next chapter of urban recycling.</h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              The project is at the concept stage. We welcome conversations about development, feasibility, collaboration and potential pilot projects.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="eyebrow bg-primary px-7 py-4 text-primary-foreground hover:opacity-90">Start a conversation</a>
              <a href="#contact" className="eyebrow border border-foreground px-7 py-4 hover:bg-foreground hover:text-background">Explore a potential pilot</a>
            </div>
          </Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-6">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.t} delay={i * 100} className="bg-background p-8">
                <h3 className="text-xl font-medium tracking-tight">{a.t}</h3>
                <p className="mt-3 text-muted-foreground">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 CONTACT */}
      <section id="contact" className="bg-card py-28 md:py-40">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel n="07">Contact</SectionLabel>
            <h2 className="display mt-8 text-5xl">Let's talk.</h2>
            <p className="mt-6 text-muted-foreground">Tell us a little about yourself and how you'd like to be involved.</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* 10 FOOTER */}
      <footer className="bg-ink py-16 text-ivory">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 md:flex-row md:justify-between md:px-10">
          <div>
            <p className="text-lg font-semibold">{BRAND}</p>
            <p className="mt-3 max-w-xs opacity-70">Exploring better-designed everyday recycling for Stockholm.</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="eyebrow opacity-70 hover:opacity-100">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-16 max-w-[1440px] px-6 text-xs opacity-50 md:px-10">
          A concept in development. Imagery is illustrative.
        </p>
      </footer>
    </div>
  );
}
