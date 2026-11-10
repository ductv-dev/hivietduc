import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";
import { listingPath, publicListings } from "@/lib/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`]));
  const latest = publicListings()
    .map((l) => l.updatedAt)
    .sort()
    .at(-1);

  const homes: MetadataRoute.Sitemap = locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: latest,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: home },
  }));

  const pages: MetadataRoute.Sitemap = publicListings().flatMap((item) => {
    const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}${listingPath(l, item.slug)}`]));
    return locales.map((l) => ({
      url: `${site.url}${listingPath(l, item.slug)}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly" as const,
      priority: item.status === "available" ? 0.8 : 0.3,
      alternates: { languages },
      images: item.images.map((src) => `${site.url}${src}`),
    }));
  });

  return [...homes, ...pages];
}
