"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, BarChart3, BrainCircuit, Layers3, MessageCircle, MousePointer2, Palette, Quote, Search, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { PROCESS, SERVICES, TESTIMONIALS } from "../data";

const SERVICE_ICONS = [BrainCircuit, Sparkles, UserRound, Layers3, BarChart3, Search, MessageCircle, MousePointer2, Palette];

const BRANDS = [
  { name: "Bata", src: "/bata_logo-1.png", accent: "#ff515d" },
  { name: "Eccountant", src: "/eccountant_logo.png", accent: "#63e6ff" },
  { name: "Hitech", src: "/hitech_logo.png", accent: "#ff725e" },
  { name: "Innovent", src: "/innovent_logo.png", accent: "#a78bfa" },
  { name: "Maskni", src: "/maskni_logo.png", accent: "#f7c873" },
  { name: "Shiza", src: "/shiza_logo.png", accent: "#d64be8" },
] as const;

const RESULT_SIGNALS = [
  { accent: "#c8ff5a", label: "Workflow clarity", initials: "FA" },
  { accent: "#63e6ff", label: "Strategic delivery", initials: "JW" },
  { accent: "#a78bfa", label: "Built to scale", initials: "DC" },
  { accent: "#8ce99a", label: "Content velocity", initials: "AK" },
  { accent: "#f7c873", label: "Operational control", initials: "OR" },
  { accent: "#ff8fab", label: "Connected growth", initials: "OB" },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const } },
};

export function BrandRail() {
  return (
    <section className="brand-rail-shell relative border-y border-white/10 bg-white/[.025] py-7 sm:py-8" aria-labelledby="supported-brands-title">
      <div className="site-container relative mb-5 sm:mb-6">
        <h2 id="supported-brands-title" className="mono-type text-[10px] font-bold uppercase tracking-[.22em] text-white/45 sm:text-[11px]">
          Brands We Have Supported
        </h2>
      </div>
      <div className="brand-rail-window">
        <div className="brand-logo-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4" aria-hidden={copy === 1}>
              {BRANDS.map((brand) => (
                <li
                  key={`${copy}-${brand.name}`}
                  className="brand-logo-card group relative grid h-[5.25rem] w-[10.5rem] shrink-0 place-items-center overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#f8f8f3] px-5 shadow-[0_18px_50px_rgba(0,0,0,.2)] sm:h-[6.25rem] sm:w-[13.5rem] sm:rounded-[1.4rem] sm:px-7"
                  style={{ "--brand-accent": brand.accent } as CSSProperties}
                >
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--brand-accent)] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  <span className="absolute right-3 top-3 size-1.5 rounded-full bg-[var(--brand-accent)] opacity-45 transition duration-500 group-hover:scale-150 group-hover:opacity-100" aria-hidden="true" />
                  <Image
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    width={774}
                    height={280}
                    sizes="(max-width: 640px) 168px, 216px"
                    className="h-auto max-h-[3.25rem] w-full object-contain opacity-75 saturate-[.72] transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:saturate-100 sm:max-h-[3.75rem]"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
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
          <div><p className="eyebrow mb-6 text-[#5f7820]">03 / The 6-D framework</p><h2 className="display-type max-w-5xl text-[clamp(3rem,6.4vw,5.8rem)] leading-[.88]">From uncertainty<span className="text-gradient-dark block">to momentum.</span></h2></div>
          <p className="border-l border-black/25 pl-5 text-base leading-7 text-black/58 sm:text-lg">A clear operating rhythm that removes guesswork, aligns every decision, and keeps performance visible.</p>
        </motion.header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step, index) => (
            <motion.article key={step.number} initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }} className="group relative min-h-[17.5rem] overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/65 p-6 shadow-[0_22px_60px_rgba(6,8,11,.08)] transition duration-500 hover:-translate-y-2 hover:bg-white sm:p-8">
              <div className="absolute right-0 top-0 size-36 rounded-full bg-[var(--acid)]/16 blur-[50px] transition group-hover:bg-[var(--cyan)]/20" aria-hidden="true" />
              <div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="display-type text-5xl text-[#617b20] sm:text-6xl">{step.number}.</span><ArrowUpRight className="size-5 text-black/30 transition group-hover:rotate-45 group-hover:text-black" /></div><div className="mt-auto pt-10"><h3 className="display-type text-2xl sm:text-3xl">{step.title}</h3><p className="mt-4 text-sm leading-7 text-black/58 sm:text-[15px]">{step.description}</p></div></div>
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
        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="testimonial-set flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1}>
                {TESTIMONIALS.map((item, index) => {
                  const signal = RESULT_SIGNALS[index];
                  return (
                    <motion.figure
                      key={`${copy}-${item.name}`}
                      initial={copy === 0 && !reduceMotion ? { opacity: 0, y: 28 } : false}
                      whileInView={copy === 0 && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="result-card group relative isolate flex min-h-[26rem] w-[min(82vw,28rem)] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10161d]/90 p-6 shadow-[0_28px_90px_rgba(0,0,0,.3)] sm:min-h-[28rem] sm:p-8"
                      style={{ "--result-accent": signal.accent } as CSSProperties}
                    >
                      <div className="result-card-halo absolute -right-16 -top-20 size-64 rounded-full bg-[var(--result-accent)] opacity-[.09] blur-[75px] transition duration-700 group-hover:scale-125 group-hover:opacity-[.17]" aria-hidden="true" />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--result-accent)] to-transparent opacity-75" aria-hidden="true" />
                      <div className="relative flex w-full flex-col">
                        <div className="flex items-center justify-between gap-5">
                          <span className="mono-type rounded-full border border-white/10 bg-white/[.045] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white/50">Client story / 0{index + 1}</span>
                          <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[.045]" aria-hidden="true">
                            <Quote className="size-5 text-[var(--result-accent)]" />
                          </span>
                        </div>

                        <blockquote className="display-type mt-10 text-balance text-[clamp(1.45rem,2vw,2rem)] leading-[1.05] text-white">
                          “{item.quote}”
                        </blockquote>

                        <figcaption className="mt-auto pt-10">
                          <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-7 bg-[var(--result-accent)]" aria-hidden="true" />
                            <span className="mono-type text-[9px] font-bold uppercase tracking-[.16em] text-[var(--result-accent)]">{signal.label}</span>
                          </div>
                          <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--result-accent)] text-[11px] font-black tracking-[.08em] text-[var(--ink)] shadow-[0_0_28px_color-mix(in_srgb,var(--result-accent)_25%,transparent)]">{signal.initials}</span>
                            <span className="min-w-0">
                              <span className="block font-black text-white">{item.name}</span>
                              <span className="mono-type mt-1.5 block text-[9px] uppercase leading-5 tracking-[.1em] text-white/38">{item.role}</span>
                            </span>
                          </div>
                        </figcaption>
                      </div>
                    </motion.figure>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
