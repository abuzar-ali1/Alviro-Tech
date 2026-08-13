"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Globe2, Megaphone, MonitorSmartphone, MousePointerClick, Palette, Search, Share2, Sparkles, Zap } from "lucide-react";

const FOCUS_WORDS = ["websites", "campaigns", "systems", "brands"];

const CHANNELS = [
  { name: "AI automation", short: "AI", detail: "Smarter workflows", icon: BrainCircuit, x: 50, y: 7, accent: "#c8ff5a" },
  { name: "Paid media", short: "Ads", detail: "High-intent reach", icon: Megaphone, x: 84, y: 29, accent: "#f7c873" },
  { name: "Social growth", short: "Social", detail: "Audience momentum", icon: Share2, x: 83, y: 73, accent: "#ff8fab" },
  { name: "Brand systems", short: "Brand", detail: "Distinctive identity", icon: Palette, x: 50, y: 93, accent: "#a78bfa" },
  { name: "Web & CRO", short: "Web", detail: "Conversion journeys", icon: MonitorSmartphone, x: 17, y: 73, accent: "#63e6ff" },
  { name: "Search & SEO", short: "SEO", detail: "Compounding demand", icon: Search, x: 16, y: 29, accent: "#8ce99a" },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [activeChannel, setActiveChannel] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 130]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, reduceMotion ? 1 : 0]);
  const consoleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -85]);

  useEffect(() => {
    const timer = window.setInterval(() => setFocusIndex((index) => (index + 1) % FOCUS_WORDS.length), 2500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reduceMotion || orbitPaused) return;
    const timer = window.setInterval(() => setActiveChannel((index) => (index + 1) % CHANNELS.length), 1900);
    return () => window.clearInterval(timer);
  }, [orbitPaused, reduceMotion]);

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--ink)] pb-14 pt-28 sm:pt-32 lg:pb-18">
      <div className="grid-field absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="orb absolute -left-40 top-[6%] size-[28rem] rounded-full bg-[var(--violet)]/16 blur-[120px]" aria-hidden="true" />
      <div className="orb absolute -right-40 top-[18%] size-[36rem] rounded-full bg-[var(--cyan)]/14 blur-[140px] [animation-delay:1.2s]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[var(--ink)] to-transparent" aria-hidden="true" />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_.88fr] lg:gap-12 xl:gap-20">
          <motion.div style={{ y: copyY, opacity: copyOpacity }}>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="eyebrow text-[var(--acid)]">Alviro Tech</span>
              <span className="hidden size-1 rounded-full bg-white/25 sm:block" />
              <span className="mono-type flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/48">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>
                Accepting growth partnerships
              </span>
            </motion.div>

            <h1 className="display-type text-balance text-[clamp(4.1rem,10.5vw,9.3rem)] leading-[.79] text-white">
              <span className="hero-line block overflow-hidden pb-[.08em]"><span className="block">We build</span></span>
              <span className="hero-line hero-line-delay block overflow-hidden pb-[.09em]"><span className="text-gradient block">digital</span></span>
              <span className="hero-line hero-line-late block overflow-hidden pb-[.1em]"><span className="block">growth.</span></span>
            </h1>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }} className="mt-8 grid gap-8 border-t border-white/10 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-pretty max-w-xl text-base leading-7 text-white/58 sm:text-lg">We turn ambitious ideas into high-performance websites, campaigns, and revenue systems—built to scale without the guesswork.</p>
                <div className="mt-5 flex h-8 items-center gap-3 text-sm font-bold text-white/86">
                  <span className="grid size-7 place-items-center rounded-full border border-white/10 bg-white/[.04] text-[var(--cyan)]"><Zap className="size-3.5" /></span>
                  <span>Engineering better</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={FOCUS_WORDS[focusIndex]} initial={{ y: 9, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -9, opacity: 0 }} className="text-[var(--acid)]">{FOCUS_WORDS[focusIndex]}.</motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <a href="#services" className="cta-primary">Explore services <ArrowDown className="size-4" /></a>
                <a href="#contact" className="cta-secondary">Request a quote <ArrowUpRight className="size-4" /></a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(15% 8% 15% 8% round 2rem)" }} animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }} transition={{ delay: 0.25, duration: 1.15, ease: [0.16, 1, 0.3, 1] }} style={{ y: consoleY }} className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
            <div className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-br from-[var(--cyan)]/20 via-[var(--violet)]/5 to-[var(--acid)]/18 blur-3xl" aria-hidden="true" />
            <div className="marketing-engine relative min-h-[39rem] overflow-hidden rounded-[2rem] border border-white/12 bg-[#090e14] p-5 shadow-[0_38px_120px_rgba(0,0,0,.58)] sm:min-h-[42rem] sm:p-7">
              <div className="absolute inset-0 grid-field opacity-30" aria-hidden="true" />
              <div className="marketing-aurora absolute -inset-40 opacity-60" aria-hidden="true" />

              <div className="relative flex h-full min-h-[35.5rem] flex-col sm:min-h-[38.5rem]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#ff6b6b]" /><span className="size-2 rounded-full bg-[#f7c873]" /><span className="size-2 rounded-full bg-[var(--acid)]" /></div>
                  <span className="mono-type flex items-center gap-2 text-[8px] font-bold uppercase tracking-[.2em] text-white/42"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--acid)] opacity-70" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--acid)]" /></span>Growth engine / live</span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="mono-type text-[9px] font-bold uppercase tracking-[.18em] text-[var(--cyan)]">Connected digital growth</p>
                    <h2 className="display-type mt-2 max-w-[18rem] text-[2rem] leading-[.9] text-white sm:text-[2.55rem]">Every channel.<br /><span className="text-gradient">One engine.</span></h2>
                  </div>
                  <motion.span animate={reduceMotion ? undefined : { rotate: [0, 10, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--acid)] text-[var(--ink)] shadow-[0_0_34px_rgba(200,255,90,.28)] sm:size-12"><MousePointerClick className="size-5" /></motion.span>
                </div>

                <div className="relative mt-3 h-[17rem] sm:h-[19rem]" onMouseEnter={() => setOrbitPaused(true)} onMouseLeave={() => setOrbitPaused(false)} onFocus={() => setOrbitPaused(true)} onBlur={() => setOrbitPaused(false)}>
                  <div className="absolute left-1/2 top-1/2 size-[12.5rem] -translate-x-1/2 -translate-y-1/2 sm:size-[14.5rem]" aria-hidden="true">
                    <span className="marketing-orbit-ring absolute inset-0 rounded-full border border-dashed border-white/15" />
                    <span className="marketing-orbit-ring marketing-orbit-ring-reverse absolute inset-[18%] rounded-full border border-[var(--cyan)]/14" />
                    <span className="marketing-core-pulse absolute inset-[35%] rounded-full bg-[var(--acid)]/10 blur-xl" />
                  </div>

                  <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
                    {[[200, 150, 200, 21], [200, 150, 336, 87], [200, 150, 332, 219], [200, 150, 200, 279], [200, 150, 68, 219], [200, 150, 64, 87]].map((line, index) => (
                      <motion.line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: activeChannel === index ? 0.9 : 0.22 }} transition={{ pathLength: { delay: 0.65 + index * 0.06, duration: 0.8 }, opacity: { duration: 0.4 } }} stroke={CHANNELS[index].accent} strokeWidth={activeChannel === index ? 1.6 : 0.75} strokeDasharray="3 7" />
                    ))}
                  </svg>

                  <div className="absolute left-1/2 top-1/2 z-10 w-[9.25rem] -translate-x-1/2 -translate-y-1/2 text-center sm:w-[10.5rem]">
                    <motion.div animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="mx-auto grid size-14 place-items-center rounded-[1.15rem] border border-white/15 bg-white/[.07] text-white shadow-[0_0_34px_rgba(200,255,90,.12)] backdrop-blur-xl sm:size-16"><Zap className="size-6 text-[var(--acid)]" /></motion.div>
                    <p className="mono-type mt-3 text-[7px] font-bold uppercase tracking-[.18em] text-white/32">Now optimizing</p>
                    <AnimatePresence mode="wait">
                      <motion.div key={CHANNELS[activeChannel].name} initial={reduceMotion ? false : { opacity: 0, y: 7, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -7, filter: "blur(5px)" }} transition={{ duration: 0.32 }}>
                        <p className="mt-1 text-sm font-black text-white sm:text-base">{CHANNELS[activeChannel].name}</p>
                        <p className="mt-0.5 text-[9px] text-white/38">{CHANNELS[activeChannel].detail}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {CHANNELS.map((channel, index) => {
                    const Icon = channel.icon;
                    const active = activeChannel === index;
                    return (
                      <motion.button key={channel.name} type="button" onMouseEnter={() => setActiveChannel(index)} onFocus={() => setActiveChannel(index)} onClick={() => setActiveChannel(index)} animate={{ scale: active ? 1.08 : 1, y: active && !reduceMotion ? -3 : 0 }} whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} className="group absolute z-20 flex w-[4.15rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center sm:w-[5rem]" style={{ left: `${channel.x}%`, top: `${channel.y}%` }} aria-label={`Focus ${channel.name}`} aria-pressed={active}>
                        <span className="grid size-9 place-items-center rounded-xl border bg-[#101821] shadow-[0_12px_30px_rgba(0,0,0,.35)] transition duration-400 sm:size-10" style={{ color: channel.accent, borderColor: active ? channel.accent : "rgba(255,255,255,.1)", boxShadow: active ? `0 0 30px ${channel.accent}35` : undefined }}><Icon className="size-4" /></span>
                        <span className="mono-type text-[7px] font-bold uppercase tracking-[.08em] text-white/45 transition group-hover:text-white sm:text-[8px]">{channel.short}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-auto rounded-[1.35rem] border border-white/10 bg-white/[.035] p-3.5 sm:p-4">
                  <div className="mb-3 flex items-center justify-between"><span className="mono-type text-[8px] font-bold uppercase tracking-[.16em] text-white/36">Growth journey</span><Sparkles className="size-3.5 text-[var(--acid)]" /></div>
                  <div className="growth-flow relative grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                    {["Attract", "Convert", "Scale"].map((step, index) => (
                      <div key={step} className="contents">
                        <div className="rounded-xl border border-white/8 bg-black/20 px-2 py-2.5 text-center"><p className="text-[10px] font-black text-white sm:text-xs">{step}</p><p className="mono-type mt-1 text-[6px] uppercase tracking-[.1em] text-white/28">0{index + 1}</p></div>
                        {index < 2 && <ArrowRight className="size-3 text-[var(--cyan)]/55" aria-hidden="true" />}
                      </div>
                    ))}
                    <span className="growth-flow-signal absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--acid)] shadow-[0_0_12px_var(--acid)]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <motion.div animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 1, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="glass-panel absolute -right-2 top-24 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex sm:-right-8"><Globe2 className="size-4 text-[var(--acid)]" /><div><p className="mono-type text-[8px] uppercase tracking-[.18em] text-white/42">Omnichannel</p><p className="text-xs font-bold text-white">One clear strategy</p></div></motion.div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="mt-16 grid grid-cols-3 border-y border-white/10 lg:mt-20 lg:max-w-3xl">
          {[["100+", "Projects completed"], ["08", "Growth disciplines"], ["24/7", "Delivery support"]].map(([value, label], index) => <div key={label} className={`py-5 ${index ? "border-l border-white/10 pl-5 sm:pl-8" : "pr-4"}`}><p className="display-type text-2xl text-white sm:text-3xl">{value}</p><p className="mono-type mt-1 text-[8px] font-bold uppercase tracking-[.14em] text-white/38 sm:text-[9px]">{label}</p></div>)}
        </motion.div>
      </div>
    </section>
  );
}
