import Image from "next/image";
import Link from "next/link";
import { BedDouble, ChevronDown, MapPin, Maximize2 } from "lucide-react";
import type { Listing } from "@/data/listings";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatPrice, listingPath, pick } from "@/lib/listings";

/** Tiêu đề khu vực trên nền ảnh */
function SectionHeading({ title, subtitle, id }: { title: string; subtitle?: string; id: string }) {
  return (
    <div className="mb-4 text-white">
      <h2 id={id} className="text-xl font-bold tracking-tight lg:text-2xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-white/75">{subtitle}</p>}
    </div>
  );
}

/* ---------------- Căn hộ đang trống ---------------- */

export function ListingsSection({
  items,
  lang,
  t,
}: {
  items: Listing[];
  lang: Locale;
  t: Dictionary;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="listings" className="mt-12">
      <SectionHeading id="listings" title={t.listing.title} subtitle={t.listing.subtitle} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <li key={l.slug}>
            <ListingCard listing={l} lang={lang} t={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ListingCard({ listing: l, lang, t }: { listing: Listing; lang: Locale; t: Dictionary }) {
  const title = pick(l.title, lang);
  return (
    <Link
      href={listingPath(lang, l.slug)}
      className="group block overflow-hidden rounded-2xl bg-white text-gray-900 shadow-lg ring-1 ring-black/5 transition-transform active:scale-[0.99] lg:hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {l.images[0] && (
          <Image
            src={l.images[0]}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow-sm">
          {l.deal === "rent" ? t.listing.rent : t.listing.sale} · {t.types[l.type]}
        </span>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-[#0f2747]">{formatPrice(l.price, l.deal, lang)}</p>
        <h3 className="mt-0.5 line-clamp-2 font-semibold leading-snug">{title}</h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {t.areas[l.area]}
          </span>
          <span className="inline-flex items-center gap-1">
            <Maximize2 className="size-3.5" /> {l.size} m²
          </span>
          <span className="inline-flex items-center gap-1">
            <BedDouble className="size-3.5" /> {l.bedrooms}
          </span>
        </p>
      </div>
    </Link>
  );
}

/* ---------------- Khu vực + Hỏi đáp ---------------- */

export function AreasAndFaq({ t }: { t: Dictionary }) {
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <section aria-labelledby="areas">
        <SectionHeading id="areas" title={t.areasTitle} />
        <ul className="flex flex-wrap gap-2">
          {Object.values(t.areas).map((a) => (
            <li
              key={a}
              className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-md"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq">
        <SectionHeading id="faq" title={t.faqTitle} />
        <div className="divide-y divide-gray-200 overflow-hidden rounded-2xl bg-white/95 text-gray-900 shadow-lg ring-1 ring-black/5 backdrop-blur">
          {t.faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
