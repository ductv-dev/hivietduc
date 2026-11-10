"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LOCALE_COOKIE, localeLabels, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav
      aria-label={label}
      className="flex rounded-full bg-black/25 p-1 ring-1 ring-white/20 backdrop-blur-md"
    >
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            title={localeLabels[l].name}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`relative min-w-11 rounded-full px-2.5 py-1.5 text-center text-xs font-semibold transition-colors ${
              active ? "text-gray-900" : "text-white/85 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{localeLabels[l].short}</span>
          </Link>
        );
      })}
    </nav>
  );
}
