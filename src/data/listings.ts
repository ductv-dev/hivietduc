/**
 * ============================================================
 *  DANH SÁCH CĂN HỘ — thêm / sửa căn ở đây
 * ============================================================
 *
 * Chỉ gồm căn hộ trong hệ thống NM Home (Sơn Trà, Ngũ Hành Sơn, An Hải).
 *
 * Mỗi căn tự có trang riêng: /vi/can-ho/<slug> (và /en, /ru, /ko),
 * tự vào sitemap cho Google, tự hiện ở trang chủ (khi status = "available").
 *
 * Ảnh: tạo thư mục public/listings/<slug>/ rồi bỏ ảnh vào,
 *      ghi đường dẫn như "/listings/<slug>/1.jpg". Ảnh đầu tiên là ảnh bìa.
 *      Nên dùng ảnh ngang, ~1600px, < 500KB.
 *
 * Bản dịch: chỉ bắt buộc tiếng Việt (vi). Thiếu ngôn ngữ nào thì trang
 *           ngôn ngữ đó dùng tiếng Anh, thiếu tiếng Anh thì dùng tiếng Việt.
 */

export const areaKeys = ["son-tra", "ngu-hanh-son", "an-hai"] as const;
export type AreaKey = (typeof areaKeys)[number];

export const listingTypes = ["studio", "1br", "2br", "3br", "duplex", "penthouse"] as const;
export type ListingType = (typeof listingTypes)[number];

export const featureKeys = [
  "furnished",
  "seaView",
  "cityView",
  "riverView",
  "balcony",
  "pool",
  "gym",
  "parking",
  "petFriendly",
  "washer",
  "security",
] as const;
export type Feature = (typeof featureKeys)[number];

type Localized = { vi: string; en?: string; ru?: string; ko?: string };

export type Listing = {
  /** Đường dẫn, viết thường không dấu, nối bằng "-" (vd "studio-view-bien-my-khe") */
  slug: string;
  /** Mã căn để khách nhắn hỏi (vd "MK01") */
  code: string;
  /**
   * available = đang trống (hiện trên web)
   * rented / sold = đã chốt (vẫn giữ trang nhưng ghi "Đã cho thuê/Đã bán", ẩn khỏi trang chủ)
   * draft = nháp, chưa hiện ở đâu cả
   */
  status: "available" | "rented" | "sold" | "draft";
  /** rent = cho thuê (giá theo tháng), sale = bán */
  deal: "rent" | "sale";
  type: ListingType;
  area: AreaKey;
  /** Tên dự án / toà nhà (không bắt buộc) */
  project?: string;
  /** Giá VND: thuê = giá/tháng, bán = tổng giá */
  price: number;
  /** Diện tích m² */
  size: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  features: Feature[];
  images: string[];
  title: Localized;
  description?: Localized;
  /** Ngày cập nhật (YYYY-MM-DD) — Google dùng để biết tin còn mới */
  updatedAt: string;
};

export const listings: Listing[] = [
  // ─── VÍ DỤ (đang là nháp nên KHÔNG hiện trên web) ───
  // Copy khối này, sửa thông tin và đổi status thành "available".
  {
    slug: "vi-du-studio-view-bien-my-khe",
    code: "MK01",
    status: "draft",
    deal: "rent",
    type: "studio",
    area: "son-tra",
    project: "NM Home",
    price: 8_500_000,
    size: 40,
    bedrooms: 1,
    bathrooms: 1,
    floor: 18,
    features: ["furnished", "seaView", "balcony", "pool", "gym", "security"],
    images: ["/bg/golden-bridge.jpg"],
    title: {
      vi: "Studio view biển Mỹ Khê, full nội thất",
      en: "Sea-view studio near My Khe Beach, fully furnished",
      ru: "Студия с видом на море у пляжа Микхе, с мебелью",
      ko: "미케 비치 오션뷰 스튜디오, 풀옵션",
    },
    description: {
      vi: "Căn studio tầng cao, ban công nhìn thẳng biển Mỹ Khê. Đầy đủ nội thất, có hồ bơi và phòng gym trong toà nhà. Cách biển 3 phút đi bộ.",
      en: "High-floor studio with a balcony facing My Khe Beach. Fully furnished, with pool and gym in the building. 3 minutes' walk to the beach.",
    },
    updatedAt: "2026-11-10",
  },
];
