import { initials } from "@/config/site";

export const BRAND = {
  navy: "#0f2747",
  gold: "#f5c04e",
};

/**
 * Logo chữ ký: mái nhà vàng (bất động sản / Cầu Vàng) trên chữ VĐ trắng, nền navy.
 * Dùng cho favicon, apple-icon, icon PWA (render bằng next/og).
 * @param rounded bo góc — tắt cho apple-icon vì iOS tự bo.
 */
export function BrandMark({ size, rounded = true }: { size: number; rounded?: boolean }) {
  const s = size;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.navy,
        borderRadius: rounded ? s * 0.22 : 0,
        fontFamily: "OG",
      }}
    >
      <svg width={s * 0.58} height={s * 0.2} viewBox="0 0 58 20" style={{ marginTop: s * 0.02 }}>
        <path
          d="M5 16.5 L29 4 L53 16.5"
          fill="none"
          stroke={BRAND.gold}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          display: "flex",
          marginTop: s * 0.015,
          color: "white",
          fontSize: s * 0.4,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: -s * 0.015,
        }}
      >
        {initials}
      </div>
    </div>
  );
}
