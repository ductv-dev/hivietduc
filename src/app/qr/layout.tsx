import type { Viewport } from "next";
import { Toaster } from "sonner";
import { font } from "../fonts";
import "../globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/** Root layout riêng cho trang công cụ /qr (chỉ dùng tiếng Việt) */
export default function QrLayout({ children }: LayoutProps<"/qr">) {
  return (
    <html lang="vi" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
