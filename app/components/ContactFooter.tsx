"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data";
import { CookieSettingsButton } from "./CookieConsent";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};
type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const reduceMotion = useReducedMotion();

  const update = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || "Unable to send your message.");
      setForm({ name: "", email: "", message: "", website: "" });
      setSubmitState("success");
      setFeedback(
        "Thanks—your project brief has been delivered. Our team will reply by email.",
      );
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--ink-soft)] py-20 sm:py-24"
    >
      <div
        className="grid-field absolute inset-0 opacity-45"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-[var(--cyan)]/[.08] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-44 top-12 size-[34rem] rounded-full bg-[var(--acid)]/[.08] blur-[130px]"
        aria-hidden="true"
      />
      <div className="site-container relative">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_25rem] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-6 text-[#ff8fab]">05 / Open channel</p>
            <h2 className="display-type max-w-5xl text-[clamp(2.9rem,6.4vw,5.8rem)] leading-[.87] text-white">
              Bring us the
              <span className="text-gradient block">growth problem.</span>
            </h2>
          </div>
          <p className="border-l border-[#ff8fab] pl-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
            Tell us where you are, where you want to go, and what is getting in
            the way. We will map the clearest next move.
          </p>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-[1.75rem] p-5 sm:p-8 lg:rounded-[2.25rem] lg:p-10"
          >
            <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mono-type text-[.65rem] font-bold uppercase tracking-[.18em] text-[var(--cyan)]">
                  Free consultation
                </p>
                <h3 className="display-type mt-2 text-2xl text-white sm:text-3xl">
                  Start the brief.
                </h3>
              </div>
              <p className="mono-type text-[.6rem] font-bold uppercase tracking-[.14em] text-white/38">
                Clear scope / honest next step
              </p>
            </div>
            <AnimatePresence>
              {submitState !== "idle" && submitState !== "sending" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role={submitState === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${submitState === "success" ? "border-[var(--acid)]/25 bg-[var(--acid)]/[.08] text-[var(--acid)]" : "border-[#ff8fab]/30 bg-[#ff8fab]/10 text-[#ffb3c5]"}`}
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <p className="text-sm font-semibold leading-6">{feedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <form id="quote-form" onSubmit={submit} className="scroll-mt-28 space-y-5">
              <div
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={update}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Jane Smith"
                    className="field-control"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update}
                    placeholder="jane@company.com"
                    className="field-control"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <label htmlFor="message" className="field-label !mb-0">
                    Project details
                  </label>
                  <span className="mono-type text-[.56rem] uppercase tracking-[.12em] text-white/25">
                    Goal · timeline · blocker
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us what you want to grow, where it is stuck, and what a strong outcome looks like."
                  className="field-control resize-y py-4"
                />
              </div>
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="cta-primary w-full disabled:cursor-wait disabled:opacity-65 sm:w-auto"
              >
                <Send className="size-4" />
                {submitState === "sending"
                  ? "Sending brief..."
                  : "Send project brief"}
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col gap-6"
            aria-label="Direct contact options"
          >
            <div className="rounded-[1.75rem] bg-[var(--acid)] p-6 text-[var(--ink)] sm:p-8 lg:rounded-[2.25rem]">
              <div className="mb-12 flex items-center justify-between">
                <span className="mono-type text-[.63rem] font-black uppercase tracking-[.18em]">
                  Growth availability
                </span>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--ink)] opacity-35" />
                  <span className="relative inline-flex size-3 rounded-full bg-[var(--ink)]" />
                </span>
              </div>
              <p className="display-type max-w-sm text-3xl leading-[.98] sm:text-4xl">
                Booking select partnerships.
              </p>
              <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-black/62">
                Best fit: ambitious businesses ready to connect strategy,
                creative, and technology into one measurable growth system.
              </p>
            </div>
            <div className="glass-panel rounded-[1.75rem] p-3 sm:p-4 lg:rounded-[2.25rem]">
              <div className="divide-y divide-white/10">
                {[
                  {
                    label: "Email",
                    value: CONTACT.email,
                    href: `mailto:${CONTACT.email}`,
                    icon: Mail,
                  },
                  {
                    label: "WhatsApp",
                    value: CONTACT.phoneDisplay,
                    href: CONTACT.whatsapp,
                    icon: Phone,
                  },
                  {
                    label: "Delivery",
                    value: "United Kingdom · Worldwide",
                    href: null,
                    icon: Globe2,
                  },
                ].map((item) => {
                  const content = (
                    <>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.045] text-[var(--cyan)]">
                        <item.icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="mono-type block text-[.58rem] font-bold uppercase tracking-[.16em] text-white/35">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words text-sm font-semibold text-white sm:text-base">
                          {item.value}
                        </span>
                      </span>
                      {item.href && (
                        <ArrowUpRight className="size-4 text-white/25" />
                      )}
                    </>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                      rel={
                        item.label === "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 rounded-2xl px-3 py-5 transition hover:bg-white/[.04] sm:px-4"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl px-3 py-5 sm:px-4"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--ink)] text-white">
      <div className="site-container py-14 sm:py-16">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_.6fr] lg:items-end lg:gap-20 lg:pb-20">
          <div>
            <p className="eyebrow text-[var(--acid)]">Ready when you are</p>
            <h2 className="display-type mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[.9]">
              Stop guessing.
              <span className="text-gradient block">Start scaling.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
              Build smarter systems, automate operations, and grow faster with
              Alviro Tech.
            </p>
            <a href={`mailto:${CONTACT.email}`} className="cta-primary mt-7">
              <Mail className="size-4" />
              Start a conversation
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_.8fr_.8fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center overflow-hidden rounded-2xl bg-[var(--acid)] p-2.5 shadow-[0_14px_40px_rgba(200,255,90,.13)]">
                <Image
                  src="/Alviro-Tech-Logo-Black.png"
                  alt=""
                  width={937}
                  height={823}
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="display-type text-xl">Alviro Tech</p>
                <p className="mono-type mt-1 text-[9px] uppercase tracking-[.18em] text-[var(--muted)]">
                  Digital growth systems
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--muted)]">
              A results-driven digital agency helping ambitious businesses grow
              through strategy, design, technology, and performance marketing.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="mono-type mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-[var(--muted)]">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[var(--acid)]"
                  >
                    <span className="h-px w-0 bg-[var(--acid)] transition-all group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mono-type mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-[var(--muted)]">
              Connect
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-sm font-semibold text-white/75 hover:text-[var(--acid)]"
            >
              {CONTACT.email}
            </a>
            <div className="mt-6 flex gap-2">
              {[
                { label: "Facebook", href: CONTACT.facebook, icon: Facebook },
                {
                  label: "Instagram",
                  href: CONTACT.instagram,
                  icon: Instagram,
                },
                { label: "LinkedIn", href: CONTACT.linkedin, icon: Linkedin },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Alviro Tech on ${social.label}`}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition hover:-translate-y-1 hover:border-[var(--acid)] hover:text-[var(--acid)]"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-white/10 pt-7 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-type">
            © {new Date().getUTCFullYear()} Alviro Tech. Built for measurable
            growth.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:justify-end">
            <nav aria-label="Legal and privacy" className="flex items-center gap-5">
              <Link href="/privacy" className="mono-type transition hover:text-[var(--acid)]">
                Privacy policy
              </Link>
              <CookieSettingsButton className="mono-type uppercase tracking-[.16em] transition hover:text-[var(--acid)]" />
            </nav>
            <p className="mono-type">Strategy · Design · Technology</p>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid size-10 place-items-center rounded-full border border-white/12 text-white transition hover:-translate-y-1 hover:border-[var(--acid)] hover:text-[var(--acid)]"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppAction() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Alviro Tech on WhatsApp"
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-[75] flex items-center rounded-full border border-[#25D366]/35 bg-[#07100c]/90 p-1.5 shadow-[0_0_28px_rgba(37,211,102,.2)] backdrop-blur-xl transition hover:border-[#25D366]/70 hover:shadow-[0_0_38px_rgba(37,211,102,.32)] sm:bottom-7 sm:right-7"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_0_18px_rgba(37,211,102,.42)] sm:size-12">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 sm:size-6"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-black uppercase tracking-[.16em] text-[#25D366] opacity-0 transition-all duration-500 group-hover:max-w-36 group-hover:pl-3 group-hover:pr-2 group-hover:opacity-100">
        Talk on WhatsApp
      </span>
    </motion.a>
  );
}
