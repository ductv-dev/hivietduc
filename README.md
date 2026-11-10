# hivietduc — Viết Đức · Sale căn hộ Đà Nẵng

Trang danh thiếp (Zalo, Gọi điện, WhatsApp, Telegram, Messenger) để khách quét QR và liên hệ.
4 ngôn ngữ: Tiếng Việt, English, Русский, 한국어. Nền ảnh Cầu Vàng.

**Stack:** Next.js 16 · Tailwind v4 · shadcn/ui · Motion · qrcode.react · Vercel Analytics

## Sửa thông tin

- **`src/config/site.ts`**: tên, số điện thoại, Zalo, Telegram, Messenger, ảnh đại diện, ảnh nền.
- **`src/i18n/dictionaries.ts`**: câu chữ từng ngôn ngữ (vai trò, lời giới thiệu, tin nhắn soạn sẵn, thứ tự kênh ưu tiên).
- Ảnh đại diện: bỏ file vào `public/avatar.jpg` rồi đặt `avatar: "/avatar.jpg"`.
- `telegram: ""` → nút Telegram mở bằng số điện thoại (cần bật *Settings → Privacy → Phone number → Who can find me: Everybody*). Có username thì điền vào sẽ chắc hơn.
- `messenger: ""` → ẩn nút Messenger.

## Đa ngôn ngữ

- Đường dẫn: `/vi`, `/en`, `/ru`, `/ko`. Link gốc `/` (link trong mã QR) tự chuyển theo ngôn ngữ máy khách:
  máy có tiếng Việt → `/vi`; Nga → `/ru`; Hàn → `/ko`; ngôn ngữ khác → `/en`. Giữ nguyên `utm_source`.
- Khách bấm đổi ngôn ngữ thì được ghi nhớ (cookie) cho lần sau.
- Trên máy tính: mỗi kênh có mã QR riêng để quét bằng điện thoại. Trên điện thoại: danh sách link.
- Ảnh nền: Andreea Popa / Unsplash (Unsplash License). Thay ảnh: bỏ vào `public/bg/` và sửa `background`.

## Thêm căn hộ trống

Sửa **`src/data/listings.ts`** (có sẵn 1 căn ví dụ ở trạng thái nháp để copy):

1. Bỏ ảnh vào `public/listings/<slug>/` (ảnh ngang ~1600px, < 500KB; ảnh đầu là ảnh bìa).
2. Copy khối ví dụ, sửa thông tin, đặt `status: "available"`.
3. Commit + push → Vercel tự deploy.

Mỗi căn tự có trang riêng `/vi/can-ho/<slug>` (+ en/ru/ko), tự vào sitemap, tự hiện ở trang chủ.
Chốt căn thì đổi `status` thành `"rented"` / `"sold"` (giữ trang, ẩn khỏi trang chủ). Chỉ bắt buộc tiếng Việt;
thiếu bản dịch thì trang nước ngoài dùng tiếng Anh, rồi tới tiếng Việt.

## SEO / Google

Đã có: title + H1 có từ khoá, mô tả, `hreflang` 4 ngôn ngữ, canonical, sitemap (kèm ảnh căn hộ), robots,
dữ liệu có cấu trúc (RealEstateAgent, FAQPage, RealEstateListing, Breadcrumb), ảnh chia sẻ theo ngôn ngữ, 404 chuẩn.

Việc cần làm sau khi deploy:

1. **Google Search Console** → thêm trang → chọn xác minh "Thẻ HTML" → copy mã trong `content="..."` →
   đặt biến môi trường `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` trên Vercel → Redeploy → bấm Xác minh.
2. Trong Search Console gửi sitemap: `https://<domain>/sitemap.xml`.
3. **Google Business Profile** (Google Maps) cho "Sale căn hộ Đà Nẵng", gắn link trang — kênh hiệu quả nhất
   cho tìm kiếm địa phương.
4. Nên dùng domain riêng (vd `vietduc.vn`) thay vì `*.vercel.app`, rồi đặt `NEXT_PUBLIC_SITE_URL`.
5. Cập nhật căn hộ đều đặn (`updatedAt`) — Google ưu tiên trang có nội dung mới.

## Chạy local

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Deploy Vercel

1. Vào [vercel.com/new](https://vercel.com/new) → Import repo `ductv-dev/hivietduc` → Deploy (không cần cấu hình gì).
2. (Tuỳ chọn) Gắn domain riêng thì thêm biến môi trường `NEXT_PUBLIC_SITE_URL=https://domain-cua-ban.com`.
3. Bật **Analytics** trong tab Analytics của project để xem lượt truy cập.

## Tạo mã QR

Mở `https://<domain>/qr` trên trang đã deploy:

- Chọn nơi đăng (Facebook / Zalo / In ấn) để gắn `utm_source` vào link.
- **Tải poster**: ảnh 1080×1350 có QR, tên, SĐT — dùng để đăng vào comment.
- **QR trơn**: chỉ có mã QR, dùng để in.

> Tạo QR **sau khi** đã có domain chính thức. Đổi domain thì phải tạo lại QR.
