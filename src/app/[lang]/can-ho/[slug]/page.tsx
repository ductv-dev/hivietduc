import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { hasLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary, toClient, type Dictionary } from "@/i18n/dictionaries";
import type { Listing } from "@/data/listings";
import { JsonLd } from "@/components/json-ld";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ListingContact } from "@/components/listing-contact";
import { PageBackground } from "@/components/page-background";
import { findListing, formatPrice, listingPath, pick, publicListings } from "@/lib/listings";

export function generateStaticParams() {
  const slugs = publicListings().map((l) => ({ slug: l.slug }));
  // Cache Components yêu cầu ít nhất 1 tham số — khi chưa có căn nào thì dùng mục giữ chỗ (trả 404)
  return slugs.length ? slugs : [{ slug: "_" }];
}

async function load(params: PageProps<"/[lang]/can-ho/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const listing = findListing(slug);
  if (!listing) notFound();
  return { lang, listing, t: getDictionary(lang) };
}

const describe = (l: Listing, lang: Locale, t: Dictionary) =>
  pick(l.description, lang) ||
  `${t.types[l.type]} · ${l.size} m² · ${t.areas[l.area]} · ${formatPrice(l.price, l.deal, lang)}`;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/can-ho/[slug]">): Promise<Metadata> {
  const { lang, listing: l, t } = await load(params);
  const title = `${pick(l.title, lang)} — ${formatPrice(l.price, l.deal, lang)}`;
  const description = describe(l, lang, t).slice(0, 300);
  const path = listingPath(lang, l.slug);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(locales.map((x) => [x, listingPath(x, l.slug)])),
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: path,
      siteName: site.name,
      title,
      description,
      images: l.images.slice(0, 1).map((src) => ({ url: src, alt: pick(l.title, lang) })),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ListingPage({ params }: PageProps<"/[lang]/can-ho/[slug]">) {
  const { lang, listing: l, t } = await load(params);
  const title = pick(l.title, lang);
  const description = pick(l.description, lang);
  const price = formatPrice(l.price, l.deal, lang);
  const closed = l.status === "rented" || l.status === "sold";
  const message = t.listing.message.replace("{code}", l.code).replace("{title}", title);
  const url = `${site.url}${listingPath(lang, l.slug)}`;

  const facts: [string, string | number | undefined][] = [
    [t.listing.type, t.types[l.type]],
    [t.listing.area, t.areas[l.area]],
    [t.listing.size, `${l.size} m²`],
    [t.listing.bedrooms, l.bedrooms],
    [t.listing.bathrooms, l.bathrooms],
    [t.listing.floor, l.floor],
    [t.listing.project, l.project],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: title,
        description: describe(l, lang, t),
        url,
        inLanguage: lang,
        image: l.images.map((src) => `${site.url}${src}`),
        dateModified: l.updatedAt,
        offers: {
          "@type": "Offer",
          price: l.price,
          priceCurrency: "VND",
          businessFunction:
            l.deal === "rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
          availability: closed ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          seller: { "@id": `${site.url}/#agent` },
        },
        about: {
          "@type": "Apartment",
          name: title,
          numberOfBedrooms: l.bedrooms,
          numberOfBathroomsTotal: l.bathrooms,
          floorSize: { "@type": "QuantitativeValue", value: l.size, unitCode: "MTK" },
          address: {
            "@type": "PostalAddress",
            addressLocality: `${t.areas[l.area]}, Đà Nẵng`,
            addressCountry: "VN",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageBackground />
      <div className="mx-auto w-full max-w-3xl px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-safe">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md"
          >
            <ArrowLeft className="size-4" /> {t.listing.back}
          </Link>
          <LanguageSwitcher current={lang} label={t.language} path={`/can-ho/${l.slug}`} />
        </div>

        <article className="mt-4 overflow-hidden rounded-3xl bg-white text-gray-900 shadow-2xl">
          {/* Ảnh: vuốt ngang trên điện thoại */}
          {l.images.length > 0 && (
            <div className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]">
              {l.images.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] w-full shrink-0 snap-center bg-gray-100">
                  <Image
                    src={src}
                    alt={`${title} — ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                  {l.images.length > 1 && (
                    <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2 py-0.5 text-xs text-white">
                      {i + 1}/{l.images.length}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6 p-5 sm:p-7">
            <header>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-[#0f2747] px-2.5 py-1 text-white">
                  {l.deal === "rent" ? t.listing.rent : t.listing.sale}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1">#{l.code}</span>
                {closed && (
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-700">
                    {l.status === "rented" ? t.listing.rented : t.listing.sold}
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">{title}</h1>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="size-3.5" /> {t.areas[l.area]}, Đà Nẵng
              </p>
              <p className="mt-3 text-2xl font-bold text-[#0f2747]">{price}</p>
            </header>

            <section aria-labelledby="details">
              <h2 id="details" className="mb-3 font-semibold">
                {t.listing.details}
              </h2>
              <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {facts
                  .filter(([, v]) => v !== undefined && v !== "")
                  .map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
                      <dt className="text-xs text-gray-500">{k}</dt>
                      <dd className="mt-0.5 font-semibold">{v}</dd>
                    </div>
                  ))}
              </dl>
            </section>

            {l.features.length > 0 && (
              <section aria-labelledby="features">
                <h2 id="features" className="mb-3 font-semibold">
                  {t.listing.features}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {l.features.map((f) => (
                    <li key={f} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {t.featureLabels[f]}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {description && <p className="leading-relaxed whitespace-pre-line text-gray-700">{description}</p>}

            <section aria-labelledby="ask" className="rounded-2xl bg-gray-50 p-4">
              <h2 id="ask" className="mb-3 font-semibold">
                {t.listing.ask}
              </h2>
              <ListingContact t={toClient(t)} message={message} />
            </section>

            <p className="text-xs text-gray-400">
              {t.listing.updated}: <time dateTime={l.updatedAt}>{l.updatedAt}</time>
            </p>
          </div>
        </article>

        <footer className="mt-8 pb-2 text-center text-[11px] text-white/60">
          {site.name} · {t.role}
        </footer>
      </div>
    </>
  );
}
