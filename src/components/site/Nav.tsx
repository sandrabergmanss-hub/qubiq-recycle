import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-background/90 text-foreground backdrop-blur-md border-b border-border"
          : "text-ivory",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="text-lg font-semibold">
          {BRAND}
        </a>
        <ul className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="eyebrow opacity-80 transition-opacity hover:opacity-100">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="icon"
          className="md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <ul id="mobile-nav" className="flex flex-col gap-1 px-6 pb-6 md:hidden">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-2xl font-medium tracking-tight"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
