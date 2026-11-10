import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { BRAND } from "@/lib/brand-mark";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Sale căn hộ Đà Nẵng`,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: BRAND.navy,
    theme_color: BRAND.navy,
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
