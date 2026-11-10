/**
 * ============================================================
 *  TOÀN BỘ THÔNG TIN CỦA TRANG NẰM Ở ĐÂY — CHỈ CẦN SỬA FILE NÀY
 * ============================================================
 */

export const site = {
  /** Tên hiển thị */
  name: "Việt Đức",
  /** Dòng giới thiệu ngắn dưới tên */
  title: "Cho thuê căn hộ & phòng tại Đà Nẵng",
  /** Mô tả ngắn (1–2 câu) */
  bio: "Nhắn mình khu vực và ngân sách, mình gửi phòng phù hợp kèm ảnh thật.",
  /** Ảnh đại diện: bỏ file vào /public rồi ghi đường dẫn, ví dụ "/avatar.jpg". Để trống = hiện chữ cái đầu */
  avatar: "",

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

  /** Tin nhắn soạn sẵn khi khách mở WhatsApp / Telegram / Messenger */
  defaultMessage: "Chào bạn, mình đang tìm thuê phòng ở Đà Nẵng, bạn tư vấn giúp mình nhé!",
} as const;

/** Chữ cái đầu của tên, dùng khi chưa có avatar (vd "Việt Đức" -> "VĐ") */
export const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .slice(-2)
  .join("")
  .toUpperCase();
