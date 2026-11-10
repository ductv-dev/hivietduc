import { ImageResponse } from "next/og";
import { initials, site } from "@/config/site";
import { loadOgFonts } from "@/lib/og-fonts";

export const alt = `${site.name} · ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Ảnh preview khi dán link vào Facebook / Zalo / Messenger */
export default async function OgImage() {
  const channels = ["Zalo", "WhatsApp", "Telegram", "Gọi điện"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f6f7f9",
          color: "#111827",
          fontFamily: "BVP",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2563eb",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          {initials}
        </div>
        <div style={{ marginTop: 36, fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
          {site.name}
        </div>
        <div style={{ marginTop: 8, fontSize: 40, color: "#4b5563" }}>{site.title}</div>
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {channels.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                padding: "12px 26px",
                borderRadius: 999,
                background: "white",
                border: "2px solid #e5e7eb",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, fontSize: 32, fontWeight: 700, color: "#2563eb" }}>
          {`Zalo · ${site.contact.phone}`}
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
