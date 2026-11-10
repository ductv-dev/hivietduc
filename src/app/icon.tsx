import { ImageResponse } from "next/og";
import { initials } from "@/config/site";
import { loadOgFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";


export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#2563eb",
          color: "white",
          fontSize: 30,
          fontWeight: 700,
          fontFamily: "OG",
          letterSpacing: -1,
        }}
      >
        {initials}
      </div>
    ),
    { ...size, fonts: await loadOgFonts(initials) },
  );
}
