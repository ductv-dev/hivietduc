import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { initials, site } from "@/config/site";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { phoneIntlDisplay } from "@/lib/contact";
import { loadOgFonts } from "@/lib/og-fonts";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

async function dataUrl(...path: string[]) {
  "use cache";
  const b = await readFile(join(process.cwd(), ...path));
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

/** Ảnh preview khi dán link vào Facebook / Zalo / Telegram — theo từng ngôn ngữ */
export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(lang);
  const phone = t.phoneFormat === "intl" ? phoneIntlDisplay : site.contact.phone;
  const channels = t.channelOrder.slice(0, 3).map((c) => t.channels[c]);
  const text = [initials, site.name, t.role, t.location, phone, ...channels, "·"].join(" ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "OG" }}>
        <img
          src={await dataUrl("assets", "og-bg.jpg")}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "rgba(0,0,0,0.55)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 72,
            color: "white",
          }}
        >
          {site.avatar ? (
            <img
              src={await dataUrl("public", site.avatar)}
              alt=""
              width={140}
              height={140}
              style={{ width: 140, height: 140, borderRadius: 999, border: "5px solid white", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 112,
                height: 112,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2563eb",
                border: "5px solid white",
                fontSize: 44,
                fontWeight: 700,
              }}
            >
              {initials}
            </div>
          )}
          <div style={{ marginTop: 28, fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>{site.name}</div>
          <div style={{ marginTop: 4, fontSize: 40, fontWeight: 700, opacity: 0.92 }}>{t.role}</div>
          <div style={{ marginTop: 6, fontSize: 28, opacity: 0.75 }}>{t.location}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                background: "white",
                color: "#111827",
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {phone}
            </div>
            <div style={{ fontSize: 28, opacity: 0.85 }}>{channels.join(" · ")}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts(text, lang === "ko") },
  );
}
