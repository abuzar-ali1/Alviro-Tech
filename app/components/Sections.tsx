"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BarChart3, BrainCircuit, Layers3, MessageCircle, MousePointer2, Palette, Quote, Search, ShieldCheck, UserRound } from "lucide-react";
import { PROCESS, SERVICES, TESTIMONIALS } from "../data";

const SERVICE_ICONS = [BrainCircuit, UserRound, Layers3, BarChart3, Search, MessageCircle, MousePointer2, Palette];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const } },
};

export function BrandRail() {
  const brands = ["Bata", "Hitech", "Maskni", "Eccountant", "Shiza", "Innovent"];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[.025] py-4">
      <div className="marquee-track flex items-center gap-9 pr-9">
        {[...brands, ...brands].map((brand, index) => (
          <div key={`${brand}-${index}`} className="flex items-center gap-9">
            <span className="mono-type text-[10px] font-bold uppercase tracking-[.22em] text-white/42">{brand}</span>
            <span className="size-1 rounded-full bg-[var(--acid)]/65" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="services" className="relative overflow-clip bg-[var(--ink-soft)] py-24 sm:py-32">
      <div className="grid-field absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="site-container relative">
        <motion.header variants={reveal} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_25rem] lg:items-end">
          <div><p className="eyebrow mb-6 text-[var(--cyan)]">02 / What we do</p><h2 className="display-type max-w-4xl text-[clamp(3.4rem,8.5vw,7.7rem)] leading-[.84] text-white">Growth is a<span className="text-gradient block">connected system.</span></h2></div>
          <p className="border-l border-[var(--cyan)] pl-5 text-base leading-7 text-[var(--muted)] sm:text-lg">Strategy, creative, technology, and optimization working together—never as disconnected deliverables.</p>
        </motion.header>

        <div className="space-y-8 lg:space-y-12">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <motion.article
                key={service.number}
                initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.985 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.78, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="service-card project-glow relative isolate overflow-hidden rounded-[1.75rem] border border-white/11 bg-[#111820] shadow-[0_34px_100px_rgba(0,0,0,.42)] lg:min-h-[34rem] lg:rounded-[2.25rem]"
                style={{ "--service-top": `${96 + index * 18}px`, zIndex: index + 1 } as CSSProperties}
              >
                <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: service.accent }} aria-hidden="true" />
                <div className="grid h-full gap-8 p-6 sm:p-8 lg:min-h-[34rem] lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:p-11">
                  <div>
                    <div className="flex items-center justify-between gap-5"><span className="mono-type text-[11px] font-bold tracking-[.2em] text-white/35">{service.number}</span><span className="grid size-12 place-items-center rounded-2xl text-[var(--ink)]" style={{ backgroundColor: service.accent }}><Icon className="size-5" /></span></div>
                    <p className="eyebrow mt-12" style={{ color: service.accent }}>{service.shortTitle}</p>
                    <h3 className="display-type mt-5 max-w-xl text-balance text-[clamp(2.3rem,4.6vw,4.7rem)] leading-[.9] text-white">{service.title}</h3>
                  </div>
                  <div className="lg:border-l lg:border-white/10 lg:pl-10">
                    <p className="max-w-2xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">{service.description}</p>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">{service.detail}</p>
                    <div className="mt-8 flex flex-wrap gap-2.5">{service.tags.map((tag) => <span key={tag} className="mono-type rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em] text-white/55">{tag}</span>)}</div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="process" className="relative overflow-hidden bg-[var(--paper)] py-24 text-[var(--ink)] sm:py-32">
      <div className="grid-field-dark absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute -left-32 top-20 size-[30rem] rounded-full bg-[var(--acid)]/30 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-[var(--cyan)]/24 blur-[130px]" aria-hidden="true" />
      <div className="site-container relative">
        <motion.header variants={reveal} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_26rem] lg:items-end">
          <div><p className="eyebrow mb-6 text-[#5f7820]">03 / The 6-D framework</p><h2 className="display-type max-w-5xl text-[clamp(3.5rem,8.5vw,7.8rem)] leading-[.84]">From uncertainty<span className="text-gradient-dark block">to momentum.</span></h2></div>
          <p className="border-l border-black/25 pl-5 text-base leading-7 text-black/58 sm:text-lg">A clear operating rhythm that removes guesswork, aligns every decision, and keeps performance visible.</p>
        </motion.header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step, index) => (
            <motion.article key={step.number} initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }} className="group relative min-h-[20rem] overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/65 p-6 shadow-[0_22px_60px_rgba(6,8,11,.08)] transition duration-500 hover:-translate-y-2 hover:bg-white sm:p-8">
              <div className="absolute right-0 top-0 size-36 rounded-full bg-[var(--acid)]/16 blur-[50px] transition group-hover:bg-[var(--cyan)]/20" aria-hidden="true" />
              <div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="display-type text-6xl text-[#617b20] sm:text-7xl">{step.number}.</span><ArrowUpRight className="size-5 text-black/30 transition group-hover:rotate-45 group-hover:text-black" /></div><div className="mt-auto pt-14"><h3 className="display-type text-3xl sm:text-4xl">{step.title}</h3><p className="mt-4 text-sm leading-7 text-black/58 sm:text-base">{step.description}</p></div></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Results() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="results" className="relative overflow-hidden bg-[var(--ink)] py-24 sm:py-32">
      <div className="grid-field absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute -right-40 top-0 size-[36rem] rounded-full bg-[var(--violet)]/10 blur-[140px]" aria-hidden="true" />
      <div className="site-container relative">
        <motion.header variants={reveal} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div><p className="eyebrow mb-6 text-[#f7c873]">04 / Client signal</p><h2 className="display-type max-w-5xl text-[clamp(3.5rem,8.7vw,8rem)] leading-[.84] text-white">Built for real<span className="text-gradient block">business impact.</span></h2></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><div className="flex items-center gap-3 text-[var(--acid)]"><ShieldCheck className="size-5" /><span className="mono-type text-[10px] font-bold uppercase tracking-[.16em]">Execution over theatre</span></div><p className="mt-4 text-sm leading-7 text-[var(--muted)]">Systems that improve visibility, speed, control, and long-term scalability.</p></div>
        </motion.header>
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <motion.figure key={item.name} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }} className="glass-panel flex min-h-[25rem] flex-col rounded-[1.75rem] p-6 sm:p-8">
              <Quote className="size-9 text-[var(--cyan)]" /><blockquote className="display-type mt-9 text-balance text-2xl leading-[1.06] text-white sm:text-3xl">“{item.quote}”</blockquote><figcaption className="mt-auto border-t border-white/10 pt-6"><p className="font-black text-white">{item.name}</p><p className="mono-type mt-2 text-[9px] uppercase tracking-[.13em] text-white/36">{item.role}</p></figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <div className="mt-20"><p className="mono-type site-container mb-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/28">Brands we have supported</p><BrandRail /></div>
    </section>
  );
}
