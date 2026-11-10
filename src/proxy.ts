import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { publicListings } from "@/lib/listings";

/** Chọn ngôn ngữ: cookie (khách đã chọn) > Accept-Language của trình duyệt > tiếng Việt */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = req.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  // Nhiều người Việt để máy tiếng Anh: có tiếng Việt ở bất kỳ đâu trong danh sách thì ưu tiên tiếng Việt
  if (ranked.some((r) => r.lang === "vi")) return "vi";
  const match = ranked.find((r) => hasLocale(r.lang))?.lang as Locale | undefined;
  if (match) return match;
  // Khách nước ngoài dùng ngôn ngữ khác (Đức, Pháp, Trung...) -> tiếng Anh
  return header.trim() ? "en" : defaultLocale;
}

const listingSlugs = new Set(publicListings().map((l) => l.slug));

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) {
    // Căn không tồn tại -> trả 404 thật trước khi trang stream (tốt cho SEO)
    const m = pathname.match(/^\/[a-z]{2}\/can-ho\/([^/]+)\/?$/);
    if (m && !listingSlugs.has(decodeURIComponent(m[1]))) {
      return NextResponse.rewrite(new URL(`/${pathname.split("/")[1]}/_khong-ton-tai`, req.url), {
        status: 404,
      });
    }
    return;
  }

  // Giữ nguyên query (utm_source...) khi chuyển hướng
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua file tĩnh, ảnh, API nội bộ, trang /qr và các route metadata
  matcher: [
    "/((?!_next|_vercel|qr|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|manifest.webmanifest|bg/|.*\\..*).*)",
  ],
};
