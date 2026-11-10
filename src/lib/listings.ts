import { listings, type Listing } from "@/data/listings";
import type { Locale } from "@/i18n/config";

/** Căn hiện trên trang chủ (đang trống), mới cập nhật lên trước */
export const availableListings = () =>
  listings
    .filter((l) => l.status === "available")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

/** Căn có trang riêng (trừ nháp) */
export const publicListings = () => listings.filter((l) => l.status !== "draft");

export const findListing = (slug: string) => publicListings().find((l) => l.slug === slug);

/** Lấy chữ theo ngôn ngữ: thiếu thì dùng tiếng Anh, rồi tiếng Việt */
export function pick(text: Listing["title"] | undefined, lang: Locale) {
  if (!text) return "";
  return text[lang] ?? text.en ?? text.vi;
}

const num = (n: number, lang: Locale) =>
  n.toLocaleString(lang === "vi" ? "vi-VN" : lang === "ru" ? "ru-RU" : "en-US", {
    maximumFractionDigits: 2,
  });

/** Định dạng giá VND theo thói quen từng ngôn ngữ */
export function formatPrice(vnd: number, deal: Listing["deal"], lang: Locale) {
  const B = 1_000_000_000;
  const M = 1_000_000;
  const rent = deal === "rent";

  if (lang === "ko") {
    // 만 = 10,000 · 억 = 100,000,000
    const v = vnd >= 1e8 ? `${num(vnd / 1e8, lang)}억 동` : `${num(vnd / 1e4, lang)}만 동`;
    return rent ? `월 ${v}` : v;
  }
  if (lang === "vi") {
    const v = vnd >= B ? `${num(vnd / B, lang)} tỷ` : `${num(vnd / M, lang)} triệu`;
    return rent ? `${v}/tháng` : v;
  }
  if (lang === "ru") {
    const v = vnd >= B ? `${num(vnd / B, lang)} млрд ₫` : `${num(vnd / M, lang)} млн ₫`;
    return rent ? `${v}/мес` : v;
  }
  const v = vnd >= B ? `${num(vnd / B, lang)}B VND` : `${num(vnd / M, lang)}M VND`;
  return rent ? `${v}/month` : v;
}

export const listingPath = (lang: Locale, slug: string) => `/${lang}/can-ho/${slug}`;
