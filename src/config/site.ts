/**
 * ============================================================
 *  THÔNG TIN LIÊN HỆ — câu chữ từng ngôn ngữ nằm ở src/i18n/dictionaries.ts
 * ============================================================
 */

export const site = {
  /** Tên hiển thị */
  name: "Viết Đức",
  /** Ảnh đại diện: bỏ file vào /public rồi ghi đường dẫn, ví dụ "/avatar.jpg". Để trống = hiện chữ cái đầu */
  avatar: "/avt.jpg",
  /** Ảnh nền (đặt trong /public). Ảnh Cầu Vàng: Andreea Popa / Unsplash */
  background: "/bg/golden-bridge.jpg",

  /**
   * Domain chính. Trên Vercel tự lấy domain production,
   * chỉ cần đặt NEXT_PUBLIC_SITE_URL nếu gắn domain riêng.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),

  contact: {
    /** SĐT hiển thị & để gọi */
    phone: "0866 791 931",
    /** SĐT dạng quốc tế, KHÔNG dấu +, bỏ số 0 đầu — dùng cho WhatsApp */
    phoneIntl: "84866791931",
    /** SĐT đăng ký Zalo (viết liền) */
    zalo: "0866791931",
    /** Username Telegram (không có @). Để trống = mở Telegram bằng số điện thoại */
    telegram: "",
    /** Username trang/nick Facebook cho Messenger (m.me/...) — để trống để ẩn */
    messenger: "",
  },
} as const;

/** Chữ cái đầu của tên, dùng khi chưa có avatar (vd "Viết Đức" -> "VĐ") */
export const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .slice(-2)
  .join("")
  .toUpperCase();
