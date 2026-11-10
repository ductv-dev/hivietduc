import { Inter } from "next/font/google";

/** Inter: đủ dấu tiếng Việt + chữ Kirin (tiếng Nga). Tiếng Hàn rơi về font hệ thống. */
export const font = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese", "cyrillic"],
  display: "swap",
  fallback: [
    "system-ui",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "Noto Sans KR",
    "sans-serif",
  ],
});
