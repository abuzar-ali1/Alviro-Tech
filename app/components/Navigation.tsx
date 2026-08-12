"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Linkedin, Menu, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data";

const ACCENTS: Record<string, string> = {
  "#home": "#c8ff5a",
  "#services": "#63e6ff",
  "#process": "#a78bfa",
  "#results": "#f7c873",
  "#contact": "#ff8fab",
};

export default function Navigation() {
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const accent = ACCENTS[active] ?? ACCENTS["#home"];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const focusLine = (barRef.current?.getBoundingClientRect().height ?? 64) + 150;
      const sections = NAV_LINKS.flatMap((link) => {
        const node = document.getElementById(link.href.slice(1));
        return node ? [{ href: link.href, node }] : [];
      });
      let current = sections[0]?.href ?? "#home";
      for (const section of sections) {
        const box = section.node.getBoundingClientRect();
        if (box.top <= focusLine) current = section.href;
        if (box.top <= focusLine && box.bottom > focusLine) break;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections.at(-1)?.href ?? current;
      }
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setActive((previous) => (previous === current ? previous : current));
      setScrolled(window.scrollY > 24);
      setProgress(available > 0 ? window.scrollY / available : 0);
    };
    const queue = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const wasOpen = open;
    setActive(href);
    setOpen(false);
    const offset = (barRef.current?.getBoundingClientRect().height ?? 64) + 28;
    window.history.replaceState(null, "", href);
    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      if (reduceMotion || !lenis) {
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      lenis.scrollTo(target, { offset: -offset, duration: 1.05, force: true });
    }, wasOpen ? 320 : 0);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left"
        style={{ transform: `scaleX(${progress})`, backgroundColor: accent, boxShadow: `0 0 18px ${accent}99` }}
      />
      <motion.nav
        aria-label="Primary navigation"
        initial={reduceMotion ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-3 z-[80] px-3 sm:top-4 sm:px-5"
      >
        <div className={`site-container pointer-events-auto rounded-[1.25rem] border px-3 backdrop-blur-2xl transition duration-500 sm:px-4 ${scrolled ? "border-white/15 bg-[rgba(6,8,11,.94)] shadow-[0_22px_70px_rgba(0,0,0,.46)]" : "border-white/10 bg-[rgba(6,8,11,.78)] shadow-[0_14px_48px_rgba(0,0,0,.24)]"}`}>
          <div ref={barRef} className="flex h-16 items-center justify-between gap-3">
            <a href="#home" onClick={(event) => navigate(event, "#home")} aria-label="Alviro Tech, return to the top" className="flex min-w-0 items-center gap-3 rounded-xl">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-black/10 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,.18)] transition-colors duration-500" style={{ backgroundColor: accent }}>
                <Image src="/Alviro-Tech-Logo-Black.png" alt="" width={937} height={823} priority className="h-full w-full object-contain" />
              </span>
              <span className="min-w-0">
                <span className="display-type block text-base leading-none text-white sm:text-lg">Alviro Tech</span>
                <span className="mono-type mt-1 block truncate text-[8px] font-bold uppercase tracking-[.2em] text-[var(--muted)] sm:text-[9px]">Digital growth systems</span>
              </span>
            </a>

            <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[.035] p-1 xl:flex">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                return (
                  <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} aria-current={isActive ? "location" : undefined} className="group relative isolate overflow-hidden rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[.08em] transition-colors" style={{ color: isActive ? "#06080b" : "#ffffff" }}>
                    {!isActive && <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: ACCENTS[link.href] }} />}
                    {isActive && <motion.span layoutId="active-nav-pill" className="absolute inset-0 -z-10 rounded-full" style={{ backgroundColor: accent }} transition={{ type: "spring", stiffness: 430, damping: 34 }} />}
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 xl:flex">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Alviro Tech on LinkedIn" className="grid size-9 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition hover:border-white/25 hover:bg-white/[.06] hover:text-white"><Linkedin className="size-4" /></a>
              <a href="#contact" onClick={(event) => navigate(event, "#contact")} className="ml-1 inline-flex h-10 items-center gap-2 rounded-full px-4 text-[11px] font-black uppercase tracking-[.08em] transition hover:-translate-y-0.5" style={{ backgroundColor: accent, color: "#06080b" }}>
                Request a quote <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-2 xl:hidden">
              <a href="#contact" onClick={(event) => navigate(event, "#contact")} className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-black uppercase tracking-[.06em] sm:rounded-full sm:px-4" style={{ backgroundColor: accent, color: "#06080b" }}>
                <span className="hidden sm:inline">Request quote</span><ArrowUpRight className="size-3.5" />
              </a>
              <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white">
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div id="mobile-menu" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden xl:hidden">
                <div className="grid gap-1 border-t border-white/8 py-3">
                  {NAV_LINKS.map((link, index) => {
                    const isActive = active === link.href;
                    return (
                      <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} aria-current={isActive ? "location" : undefined} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold hover:bg-white/[.05]" style={{ backgroundColor: isActive ? ACCENTS[link.href] : "transparent", color: isActive ? "#06080b" : "#ffffff" }}>
                        {link.name}<span className="mono-type text-[10px] opacity-60">0{index + 1}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
