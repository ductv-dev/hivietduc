import { ImageResponse } from "next/og";
import { initials } from "@/config/site";
import { loadOgFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";


export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 0,
          background: "#2563eb",
          color: "white",
          fontSize: 84,
          fontWeight: 700,
          fontFamily: "BVP",
          letterSpacing: -1,
        }}
      >
        {initials}
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
