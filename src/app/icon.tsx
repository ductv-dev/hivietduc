import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";

export const contentType = "image/png";

const sizes = [32, 192, 512];

/** Favicon (32) + icon PWA (192, 512) → /icon/32, /icon/192, /icon/512 */
export function generateImageMetadata() {
  return sizes.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const s = Number(await id);
  return new ImageResponse(<BrandMark size={s} />, {
    width: s,
    height: s,
  });
}
