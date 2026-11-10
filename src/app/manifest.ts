import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Sale căn hộ Đà Nẵng`,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#2563eb",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
