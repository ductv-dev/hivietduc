export const locales = ["vi", "en", "ru", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

/** Tên ngôn ngữ hiển thị trong nút chuyển */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  vi: { short: "VI", name: "Tiếng Việt" },
  en: { short: "EN", name: "English" },
  ru: { short: "RU", name: "Русский" },
  ko: { short: "KO", name: "한국어" },
};

/** Mã locale cho Open Graph */
export const ogLocale: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  ru: "ru_RU",
  ko: "ko_KR",
};

/** Cookie ghi nhớ ngôn ngữ khách đã chọn */
export const LOCALE_COOKIE = "NEXT_LOCALE";
