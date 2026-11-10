import { ImageResponse } from "next/og";
import { initials } from "@/config/site";
import { BrandMark } from "@/lib/brand-mark";
import { loadOgFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icon khi khách "Thêm vào màn hình chính" trên iPhone (iOS tự bo góc) */
export default async function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} rounded={false} />, {
    ...size,
    fonts: await loadOgFonts(initials),
  });
}
