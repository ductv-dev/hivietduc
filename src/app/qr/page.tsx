import type { Metadata } from "next";
import { QrStudio } from "./qr-studio";

export const metadata: Metadata = {
  title: "Tạo mã QR",
  robots: { index: false, follow: false },
};

export default function QrPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-8 pb-safe">
      <QrStudio />
    </main>
  );
}
