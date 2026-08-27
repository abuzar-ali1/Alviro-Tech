"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie, ShieldCheck } from "lucide-react";

const CONSENT_STORAGE_KEY = "alviro-cookie-consent-v1";
const OPEN_COOKIE_SETTINGS_EVENT = "alviro:open-cookie-settings";

type CookiePreference = {
  analytics: boolean;
  updatedAt: string;
  version: 1;
};

function readPreference(): CookiePreference | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    const preference = JSON.parse(stored) as Partial<CookiePreference>;
    if (preference.version !== 1 || typeof preference.analytics !== "boolean") {
      return null;
    }
    return preference as CookiePreference;
  } catch {
    return null;
  }
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preference, setPreference] = useState<CookiePreference | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const storedPreference = readPreference();
    const frame = window.requestAnimationFrame(() => {
      setPreference(storedPreference);
      setOpen(!storedPreference);
    });

    const openSettings = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const savePreference = (analytics: boolean) => {
    const nextPreference: CookiePreference = {
      analytics,
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextPreference));
    } catch {
      // The choice still applies for this visit when browser storage is unavailable.
    }

    setPreference(nextPreference);
    setOpen(false);
    window.dispatchEvent(
      new CustomEvent("alviro:cookie-consent-change", { detail: nextPreference }),
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[140] mx-auto max-w-5xl overflow-hidden rounded-[1.4rem] border border-white/15 bg-[rgba(8,12,16,.97)] p-4 shadow-[0_28px_100px_rgba(0,0,0,.7)] backdrop-blur-2xl sm:inset-x-5 sm:bottom-5 sm:p-5"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--acid)] via-[var(--cyan)] to-[var(--violet)]" aria-hidden="true" />
          <div className="grid gap-5 pl-2 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6">
            <span className="hidden size-12 place-items-center rounded-2xl bg-[var(--acid)] text-[var(--ink)] lg:grid" aria-hidden="true">
              <Cookie className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-[var(--acid)]" aria-hidden="true" />
                <h2 id="cookie-consent-title" className="display-type text-lg text-white sm:text-xl">
                  Your privacy, your choice.
                </h2>
              </div>
              <p id="cookie-consent-description" className="mt-2 max-w-3xl text-[13px] leading-6 text-white/58 sm:text-sm">
                We use essential browser storage to remember your preferences. With your permission, optional analytics may help us improve the experience. You can change this choice at any time in the footer.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-white/42">
                <Link href="/privacy" onClick={() => setOpen(false)} className="underline decoration-white/25 underline-offset-4 transition hover:text-[var(--acid)]">
                  Read our Privacy Policy
                </Link>
                {preference && (
                  <span>Current choice: {preference.analytics ? "all cookies" : "essential only"}</span>
                )}
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[18rem]">
              <button
                type="button"
                onClick={() => savePreference(false)}
                className="min-h-11 rounded-full border border-white/15 bg-white/[.04] px-4 text-[11px] font-black uppercase tracking-[.08em] text-white transition hover:border-white/35 hover:bg-white/[.08]"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => savePreference(true)}
                className="min-h-11 rounded-full bg-[var(--acid)] px-4 text-[11px] font-black uppercase tracking-[.08em] text-[var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(200,255,90,.18)]"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
