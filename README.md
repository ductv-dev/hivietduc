# hivietduc — Trang liên hệ cho thuê phòng Đà Nẵng

Trang danh thiếp đơn giản (Zalo, Gọi điện, WhatsApp, Telegram, Messenger) để khách quét QR và liên hệ.

**Stack:** Next.js 16 · Tailwind v4 · shadcn/ui · Motion · qrcode.react · Vercel Analytics

## Sửa thông tin

Mọi thông tin nằm trong **`src/config/site.ts`**: tên, giới thiệu, số điện thoại, Zalo, Telegram, Messenger, ảnh đại diện.

- Ảnh đại diện: bỏ file vào `public/avatar.jpg` rồi đặt `avatar: "/avatar.jpg"`.
- `telegram: ""` → nút Telegram mở bằng số điện thoại (cần bật *Settings → Privacy → Phone number → Who can find me: Everybody*). Có username thì điền vào sẽ chắc hơn.
- `messenger: ""` → ẩn nút Messenger.

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
