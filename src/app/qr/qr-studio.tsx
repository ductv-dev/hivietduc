"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Download, ImageDown } from "lucide-react";
import { toast } from "sonner";
import { initials, site } from "@/config/site";
import { copyText } from "@/lib/use-contact";

/** Gắn nguồn để biết khách quét từ đâu (utm_source) */
const sources = [
  { id: "", label: "Không gắn" },
  { id: "facebook", label: "Facebook" },
  { id: "zalo", label: "Zalo" },
  { id: "print", label: "In ấn" },
];

const noopSubscribe = () => () => {};
const BLUE = "#2563eb";
const INK = "#111827";

export function QrStudio() {
  // Nếu chưa cấu hình domain thì dùng domain đang mở trang
  const origin = useSyncExternalStore(noopSubscribe, () => window.location.origin, () => site.url);
  const [custom, setBase] = useState<string | null>(null);
  const base = custom ?? (site.url.includes("localhost") ? origin : site.url);
  const [source, setSource] = useState("facebook");
  const qrRef = useRef<HTMLCanvasElement>(null);

  const link = useMemo(() => {
    const clean = base.replace(/\/+$/, "");
    return source ? `${clean}/?utm_source=${source}&utm_medium=qr` : clean;
  }, [base, source]);

  const download = async (kind: "poster" | "plain") => {
    const qr = qrRef.current;
    if (!qr) return;
    await document.fonts.ready;
    const avatar = site.avatar ? await loadImage(site.avatar).catch(() => null) : null;
    const canvas = kind === "poster" ? drawPoster(qr, avatar) : drawPlain(qr, avatar);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${kind === "poster" ? "poster" : "qr"}-${source || "link"}.png`;
    a.click();
  };

  return (
    <div className="space-y-5">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" /> Trang chính
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Tạo mã QR</h1>

      {/* Xem trước */}
      <div className="mx-auto w-full max-w-[320px] rounded-3xl border bg-white p-6 text-center text-[#111827] shadow-sm">
        <p className="text-sm font-semibold">Quét mã để liên hệ · Sale căn hộ Đà Nẵng</p>
        <div className="relative mx-auto mt-4 w-[78%]">
          <QRCodeSVG value={link} level="H" marginSize={0} fgColor={INK} className="h-auto w-full" />
          {site.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.avatar}
              alt=""
              className="absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <span className="absolute top-1/2 left-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#2563eb] text-xs font-bold text-white">
              {initials}
            </span>
          )}
        </div>
        <p className="mt-4 text-lg font-bold">{site.name}</p>
        <p className="text-sm text-gray-500">Zalo · {site.contact.phone}</p>
      </div>
      <QRCodeCanvas
        ref={qrRef}
        value={link}
        size={1024}
        level="H"
        marginSize={0}
        fgColor={INK}
        className="hidden"
      />

      <div className="space-y-4 rounded-2xl border bg-card p-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Link trang</span>
          <input
            value={base}
            onChange={(e) => setBase(e.target.value)}
            inputMode="url"
            className="h-11 w-full rounded-xl border bg-background px-3 text-base outline-none focus:border-primary"
          />
        </label>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">Nơi đăng</legend>
          <div className="grid grid-cols-4 gap-1 rounded-xl bg-secondary p-1">
            {sources.map((s) => (
              <button
                key={s.id || "none"}
                type="button"
                aria-pressed={s.id === source}
                onClick={() => setSource(s.id)}
                className="h-9 rounded-lg text-sm font-medium text-muted-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-xs"
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={async () => (await copyText(link)) && toast.success("Đã copy link")}
          className="flex w-full items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-left"
        >
          <code className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{link}</code>
          <Copy className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => download("poster")}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary font-semibold text-primary-foreground active:opacity-90"
        >
          <ImageDown className="size-5" /> Tải poster
        </button>
        <button
          type="button"
          onClick={() => download("plain")}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border bg-card font-semibold active:bg-secondary"
        >
          <Download className="size-5" /> QR trơn
        </button>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Mẹo: đăng ảnh poster kèm một câu ngắn khi comment. Nhiều nhóm tự ẩn comment có link,
        còn ảnh QR thì không bị ẩn.
      </p>
    </div>
  );
}

/* ---------------- Vẽ ảnh xuất ra ---------------- */

const font = () => getComputedStyle(document.body).fontFamily;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  d: number,
  avatar: HTMLImageElement | null,
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, d / 2 + d * 0.1, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  if (avatar) {
    ctx.beginPath();
    ctx.arc(cx, cy, d / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(avatar, cx - d / 2, cy - d / 2, d, d);
    ctx.restore();
    return;
  }
  ctx.beginPath();
  ctx.arc(cx, cy, d / 2, 0, Math.PI * 2);
  ctx.fillStyle = BLUE;
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = `700 ${d * 0.4}px ${font()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, cx, cy + d * 0.02);
  ctx.restore();
}

function drawPlain(qr: HTMLCanvasElement, avatar: HTMLImageElement | null) {
  const pad = 64;
  const c = document.createElement("canvas");
  c.width = c.height = qr.width + pad * 2;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(qr, pad, pad);
  drawLogo(ctx, c.width / 2, c.height / 2, qr.width * 0.2, avatar);
  return c;
}

function drawPoster(qr: HTMLCanvasElement, avatar: HTMLImageElement | null) {
  const W = 1080;
  const H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const ff = font();

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";

  ctx.fillStyle = BLUE;
  ctx.font = `600 36px ${ff}`;
  ctx.fillText("SALE CĂN HỘ ĐÀ NẴNG", W / 2, 140);
  ctx.fillStyle = INK;
  ctx.font = `700 64px ${ff}`;
  ctx.fillText("Quét mã để liên hệ", W / 2, 225);

  const size = 680;
  const x = (W - size) / 2;
  const y = 300;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qr, x, y, size, size);
  drawLogo(ctx, W / 2, y + size / 2, size * 0.2, avatar);

  ctx.fillStyle = INK;
  ctx.font = `700 60px ${ff}`;
  ctx.fillText(site.name, W / 2, y + size + 120);
  ctx.fillStyle = "#6b7280";
  ctx.font = `500 40px ${ff}`;
  ctx.fillText(`Zalo · ${site.contact.phone}`, W / 2, y + size + 185);

  return c;
}
