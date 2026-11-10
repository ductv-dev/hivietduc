import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { site } from "@/config/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { font } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}`,
      siteName: site.name,
      title: t.metaTitle,
      description: t.metaDescription,
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f2a2e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${font.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col bg-[#1f2a2e]">
        {children}
        <Toaster theme="light" position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
