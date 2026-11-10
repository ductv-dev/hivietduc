import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { site } from "@/config/site";
import "./globals.css";

const font = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description = `${site.title}. ${site.bio}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "cho thuê căn hộ Đà Nẵng",
    "phòng trọ Đà Nẵng",
    "thuê phòng Đà Nẵng",
    "studio Đà Nẵng",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: site.name,
    title: `${site.name} · ${site.title}`,
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#16171c" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col">
        {children}
        <Toaster theme="system" position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
