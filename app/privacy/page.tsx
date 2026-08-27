import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { CookieSettingsButton } from "../components/CookieConsent";
import { CONTACT } from "../data";

export const metadata: Metadata = {
  title: "Privacy Policy | Alviro Tech",
  description: "How Alviro Tech collects, uses, and protects information when you use this website.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you submit the contact form, we collect the name, work email, and project details you provide. We may also receive information you choose to share when contacting us by email, WhatsApp, or social media. The site can process basic technical information needed to deliver pages securely and reliably.",
  },
  {
    title: "How we use information",
    body: "We use your information to respond to enquiries, assess project fit, provide requested services, maintain site security, and improve the clarity and performance of our website. We do not sell personal information.",
  },
  {
    title: "Cookies and browser storage",
    body: "Essential browser storage remembers your cookie preference. Optional analytics will only be used when you choose to allow them. You can review or change your choice at any time using Cookie settings in the footer.",
  },
  {
    title: "Sharing and service providers",
    body: "We may use carefully selected service providers for website hosting, email delivery, security, and business operations. They may process information only as needed to provide those services or when required by law.",
  },
  {
    title: "Retention and security",
    body: "We keep information only for as long as reasonably needed for the purpose it was collected, including legitimate business, legal, and security needs. We use appropriate technical and organisational safeguards, although no online service can guarantee absolute security.",
  },
  {
    title: "Your choices and rights",
    body: "Depending on where you live, you may have rights to request access, correction, deletion, restriction, or a copy of your personal information. You may also withdraw cookie consent at any time. Contact us to make a request.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-3 z-[80] px-3 sm:top-4 sm:px-5">
        <div className="site-container flex h-16 items-center justify-between rounded-[1.25rem] border border-white/12 bg-[rgba(6,8,11,.94)] px-3 shadow-[0_18px_60px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:px-4">
          <Link href="/" aria-label="Alviro Tech home" className="flex items-center gap-3 rounded-xl">
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--acid)] p-1.5">
              <Image src="/Alviro-Tech-Logo-Black.png" alt="" width={937} height={823} priority className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="display-type block text-base leading-none text-white sm:text-lg">Alviro Tech</span>
              <span className="mono-type mt-1 block text-[8px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">Digital growth systems</span>
            </span>
          </Link>
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[.04] px-4 text-[11px] font-black uppercase tracking-[.08em] text-white transition hover:border-[var(--acid)] hover:text-[var(--acid)]">
            <ArrowLeft className="size-3.5" /> Home
          </Link>
        </div>
      </header>

      <main id="main-content" className="relative min-h-screen overflow-hidden bg-[var(--ink)] pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="grid-field absolute inset-0 opacity-55" aria-hidden="true" />
        <div className="absolute -left-48 top-10 size-[32rem] rounded-full bg-[var(--violet)]/12 blur-[130px]" aria-hidden="true" />
        <div className="absolute -right-48 top-64 size-[34rem] rounded-full bg-[var(--cyan)]/10 blur-[140px]" aria-hidden="true" />

        <div className="site-container relative">
          <div className="max-w-4xl">
            <p className="eyebrow text-[var(--acid)]">Legal / Privacy</p>
            <h1 className="display-type mt-7 text-balance text-[clamp(2.8rem,5.4vw,5rem)] leading-[.9]">
              Privacy without
              <span className="text-gradient block">the small-print maze.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/58">
              This policy explains what information Alviro Tech handles through this website, why we use it, and the choices available to you.
            </p>
            <p className="mono-type mt-4 text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Last updated: August 27, 2026</p>
          </div>

          <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
            {sections.map((section, index) => (
              <section key={section.title} className="rounded-[1.5rem] border border-white/10 bg-white/[.035] p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="mono-type text-[10px] font-bold text-[var(--cyan)]">0{index + 1}</span>
                  <h2 className="display-type text-xl sm:text-2xl">{section.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/58">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-5 grid gap-6 rounded-[1.75rem] border border-[var(--acid)]/20 bg-[var(--acid)]/[.07] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-[var(--acid)]">
                <ShieldCheck className="size-5" />
                <h2 className="display-type text-xl sm:text-2xl">Questions or privacy requests?</h2>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">Contact us and we will respond as clearly and promptly as possible.</p>
            </div>
            <a href={`mailto:${CONTACT.email}`} className="cta-primary w-full sm:w-auto">
              <Mail className="size-4" /> {CONTACT.email}
            </a>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[var(--ink)] text-white">
        <div className="site-container flex flex-col gap-4 py-7 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-type">© {new Date().getUTCFullYear()} Alviro Tech</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/" className="transition hover:text-[var(--acid)]">Home</Link>
            <CookieSettingsButton className="uppercase tracking-[.14em] transition hover:text-[var(--acid)]" />
          </div>
        </div>
      </footer>
    </>
  );
}
