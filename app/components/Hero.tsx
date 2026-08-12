"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowDown, ArrowUpRight, Globe2, Rocket, Sparkles, Target, TrendingUp, Zap } from "lucide-react";

const FOCUS_WORDS = ["websites", "campaigns", "systems", "brands"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 130]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, reduceMotion ? 1 : 0]);
  const consoleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -85]);

  useEffect(() => {
    const timer = window.setInterval(() => setFocusIndex((index) => (index + 1) % FOCUS_WORDS.length), 2500);
    return () => window.clearInterval(timer);
  }, []);

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

          <motion.div initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(15% 8% 15% 8% round 2rem)" }} animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }} transition={{ delay: 0.25, duration: 1.15, ease: [0.16, 1, 0.3, 1] }} style={{ y: consoleY }} className="relative mx-auto w-full max-w-[31rem] lg:ml-auto">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[var(--cyan)]/18 via-transparent to-[var(--acid)]/14 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0b1117] p-5 shadow-[0_35px_110px_rgba(0,0,0,.5)] sm:p-7">
              <div className="absolute inset-0 grid-field opacity-35" aria-hidden="true" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#ff6b6b]" /><span className="size-2 rounded-full bg-[#f7c873]" /><span className="size-2 rounded-full bg-[var(--acid)]" /></div>
                  <span className="mono-type text-[8px] font-bold uppercase tracking-[.2em] text-white/35">Growth OS / live</span>
                </div>
                <div className="mt-7 flex items-end justify-between gap-4">
                  <div><p className="mono-type text-[9px] font-bold uppercase tracking-[.17em] text-[var(--cyan)]">Velocity signal</p><p className="display-type mt-2 text-5xl text-white sm:text-6xl">LIVE</p><p className="mt-1 text-xs text-white/40">growth systems active</p></div>
                  <div className="grid size-12 place-items-center rounded-2xl bg-[var(--acid)] text-[var(--ink)]"><TrendingUp className="size-5" /></div>
                </div>
                <div className="relative mt-8 h-32 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="growth-bars absolute inset-x-4 bottom-4 flex h-20 items-end gap-2" aria-hidden="true">
                    {[34, 48, 42, 68, 58, 76, 87, 95].map((height, index) => (
                      <motion.span
                        key={`${height}-${index}`}
                        initial={reduceMotion ? false : { height: 0 }}
                        animate={{ height: `${height}%` }}
                        whileHover={reduceMotion ? undefined : { y: -8, scaleY: 1.18 }}
                        transition={{
                          height: { delay: 0.7 + index * 0.07, duration: 0.65 },
                          y: { type: "spring", stiffness: 250, damping: 18 },
                          scaleY: { type: "spring", stiffness: 210, damping: 16 },
                        }}
                        className="growth-bar flex-1 rounded-t-sm bg-gradient-to-t from-[var(--cyan)]/35 to-[var(--acid)]"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[{ label: "Qualified demand", value: "High", icon: Target }, { label: "System health", value: "Ready", icon: Activity }].map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><item.icon className="mb-4 size-4 text-[var(--cyan)]" /><p className="text-lg font-black text-white">{item.value}</p><p className="mono-type mt-1 text-[8px] uppercase tracking-[.13em] text-white/35">{item.label}</p></div>)}
                </div>
                <div className="glass-panel mt-auto flex items-center justify-between gap-4 rounded-2xl p-4">
                  <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[var(--cyan)]/12 text-[var(--cyan)]"><Rocket className="size-4" /></span><div><p className="text-sm font-black text-white">Built to compound</p><p className="text-[10px] text-white/38">strategy × design × technology</p></div></div>
                  <Sparkles className="size-4 text-[var(--acid)]" />
                </div>
              </div>
            </div>
            <div className="glass-panel float-slow absolute -right-3 top-8 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-8"><Globe2 className="size-4 text-[var(--acid)]" /><div><p className="mono-type text-[8px] uppercase tracking-[.18em] text-white/42">Reach</p><p className="text-xs font-bold text-white">Global delivery</p></div></div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="mt-16 grid grid-cols-3 border-y border-white/10 lg:mt-20 lg:max-w-3xl">
          {[["100+", "Projects completed"], ["08", "Growth disciplines"], ["24/7", "Delivery support"]].map(([value, label], index) => <div key={label} className={`py-5 ${index ? "border-l border-white/10 pl-5 sm:pl-8" : "pr-4"}`}><p className="display-type text-2xl text-white sm:text-3xl">{value}</p><p className="mono-type mt-1 text-[8px] font-bold uppercase tracking-[.14em] text-white/38 sm:text-[9px]">{label}</p></div>)}
        </motion.div>
      </div>
    </section>
  );
}
