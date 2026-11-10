import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`]));
  return locales.map((l) => ({
    url: `${site.url}/${l}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
