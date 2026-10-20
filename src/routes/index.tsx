import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BRAND, NAV, COPY, STEPS, AUDIENCES } from "@/content/site";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { ConceptViewer } from "@/components/site/ConceptViewer";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-stockholm.jpg";
import courtyard from "@/assets/courtyard.jpg";
import room from "@/assets/recycling-room.jpg";
import dusk from "@/assets/stockholm-dusk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qubiq Recycle — thoughtful product design for everyday recycling" },
      {
        name: "description",
        content:
           "Discover Qubiq Recycle, an early-stage cardboard compaction concept for shared residential spaces. Thoughtful product design with a vision for Stockholm.",
      },
      { property: "og:title", content: "Qubiq Recycle — a better future is built into the everyday" },
      {
        property: "og:description",
        content:
          "Qubiq Recycle is a concept for space-conscious recycling in Stockholm's shared residential spaces.",
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
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translateY(${p * -8}%) scale(1.15)`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); };
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

function Index() {
  return (
    <div id="top" className="bg-background text-foreground">
      <Nav />

      {/* 1 HERO */}
      <section className="hero-frame relative overflow-hidden bg-ink text-ivory">
        <img src={hero} alt="Stockholm's Riddarholmen waterfront in morning light" width={1920} height={1088} fetchPriority="high" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-12 md:px-10 md:pb-16">
          <p className="eyebrow animate-rise mb-5 opacity-80">{COPY.hero.eyebrow}</p>
          <p className="animate-rise mb-7 text-xl font-medium">{BRAND}</p>
          <h1 className="display animate-rise max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            A better future is built into <em className="font-serif font-normal">the everyday.</em>
          </h1>
          <div className="animate-rise mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed opacity-85">{COPY.hero.description}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="editorial" size="editorial" className="bg-ivory text-ink hover:bg-ivory/90"><a href="#concept">Explore the concept <ArrowDown /></a></Button>
              <Button asChild variant="editorialOutline" size="editorial"><a href="#contact">Discuss a collaboration <ArrowUpRight /></a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 VISION */}
      <section id="vision" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <Reveal><SectionLabel n="01">The everyday challenge</SectionLabel></Reveal>
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-4xl md:text-6xl">
              {COPY.challenge.title}
            </h2>
            <div className="mt-8 grid max-w-xl gap-5 text-base leading-relaxed text-muted-foreground">
              <p>
                {COPY.challenge.paragraphs[0]}
              </p>
              <p>
                {COPY.challenge.paragraphs[1]}
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={150}>
            <Parallax src={courtyard} alt="A quiet Scandinavian residential courtyard with birch trees and timber facades" w={1280} h={1600} className="aspect-[5/4]" />
            <p className="eyebrow mt-4 text-muted-foreground">Shared residential space · illustrative</p>
          </Reveal>
        </div>
      </section>

      {/* 3 CONCEPT */}
      <section id="concept" className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal><p className="eyebrow opacity-65">02 — The product concept</p></Reveal>
          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="display text-4xl md:text-6xl">{COPY.concept.title}</h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="max-w-lg text-lg leading-relaxed opacity-80">
                {COPY.concept.description}
              </p>
              <dl className="mt-10 divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
                <div className="flex flex-wrap justify-between gap-3 py-5"><dt>Cardboard compaction</dt><dd className="eyebrow opacity-65">Initial focus</dd></div>
                <div className="flex flex-wrap justify-between gap-3 py-5"><dt>Plastic &amp; metal</dt><dd className="eyebrow opacity-65">Future possibilities</dd></div>
              </dl>
              <p className="mt-6 max-w-lg text-sm leading-relaxed opacity-65">{COPY.concept.note}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 3D */}
      <section aria-labelledby="viewer-h" className="bg-card pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="viewer-h" className="display text-4xl md:text-6xl">A concept taking shape.</h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Product renders, film and technical illustrations will follow as the design develops.
            </p>
          </Reveal>
          <Reveal delay={150} className="text-foreground">
            <ConceptViewer />
          </Reveal>
        </div>
      </section>

      {/* 5 HOW */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <Reveal><SectionLabel n="03">How it could work</SectionLabel></Reveal>
        <ol className="mt-12 divide-y divide-border border-y border-border">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="bg-background">
              <li className="grid items-baseline gap-4 py-7 md:grid-cols-[80px_1fr_1fr] md:gap-10">
                <span className="font-serif text-4xl font-normal text-stone">{s.n}</span>
                <h3 className="text-2xl font-medium">{s.t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">Conceptual steps — not operating instructions.</p>
      </section>

      {/* 6 SHARED SPACES */}
      <section className="relative">
        <Parallax src={room} alt="A calm, timber-lined shared recycling room with flattened cardboard stacked neatly" w={1600} h={1072} className="h-[50vh] min-h-[340px] max-h-[580px]" />
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal className="grid gap-8 py-14 md:grid-cols-2 md:gap-16 md:py-20">
            <div><SectionLabel n="04">Designed for shared spaces</SectionLabel>
            <h2 className="display mt-8 text-4xl md:text-5xl">{COPY.shared.title}</h2></div>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {COPY.shared.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7 STOCKHOLM */}
      <section id="stockholm" className="relative flex min-h-[540px] items-center overflow-hidden bg-ink text-ivory">
        <Parallax src={dusk} alt="Stockholm's skyline across the water at blue hour" w={1920} h={1088} className="absolute inset-0" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 py-28 md:px-10">
          <Reveal>
            <p className="eyebrow opacity-80">05 — A vision for Stockholm</p>
            <h2 className="display mt-8 max-w-5xl text-4xl md:text-6xl">
              {COPY.stockholm.title}
            </h2>
            <p className="mt-10 max-w-lg text-lg opacity-85">
              {COPY.stockholm.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 COLLABORATION */}
      <section id="collaboration" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <Reveal><SectionLabel n="06">Collaboration</SectionLabel></Reveal>
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-4xl md:text-6xl">{COPY.collaboration.title}</h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              {COPY.collaboration.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="editorial" size="editorial"><a href="#contact">Start a conversation <ArrowUpRight /></a></Button>
              <Button asChild variant="editorialOutline" size="editorial"><a href="#contact">Explore a potential pilot <ArrowUpRight /></a></Button>
            </div>
          </Reveal>
          <div className="divide-y divide-border border-y border-border lg:col-span-6">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.t} delay={i * 100} className="grid gap-4 py-6 sm:grid-cols-[32px_1fr]">
                <span className="eyebrow text-stone">{a.n}</span><div><h3 className="text-xl font-medium">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p></div>
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
