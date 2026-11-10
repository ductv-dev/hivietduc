"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { track } from "@vercel/analytics";
import { ChevronRight, MapPin, Share2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { initials, site } from "@/config/site";
import { channelMeta } from "@/components/brand-icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PageBackground } from "@/components/page-background";
import { buildVCard, channelHref, channelValue, isEnabled, type Channel } from "@/lib/contact";
import { contactLinkProps, copyText } from "@/lib/use-contact";
import type { Locale } from "@/i18n/config";
import type { ClientDictionary as Dictionary } from "@/i18n/dictionaries";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function ContactPage({
  lang,
  t,
  children,
}: {
  lang: Locale;
  t: Dictionary;
  /** Các khối bên dưới (căn hộ, khu vực, hỏi đáp) — render phía server */
  children?: ReactNode;
}) {
  const channels = t.channelOrder.filter(isEnabled);
  const intl = t.phoneFormat === "intl";

  return (
    <MotionConfig reducedMotion="user">
      <PageBackground />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-safe lg:max-w-6xl lg:px-10">
        <div className="flex justify-end">
          <LanguageSwitcher current={lang} label={t.language} />
        </div>

        <motion.main
          variants={list}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14"
        >
          {/* Hồ sơ */}
          <div>
            <motion.header
              variants={item}
              className="mt-6 flex flex-col items-center text-center text-white lg:mt-0 lg:items-start lg:text-left"
            >
              <Avatar alt={`${site.name} — ${t.role}`} />
              {/* H1 chứa cả tên + vai trò để Google hiểu trang nói về gì */}
              <h1 className="mt-4 flex flex-col drop-shadow-sm">
                <span className="text-3xl font-bold tracking-tight lg:text-5xl">{site.name}</span>
                <span className="mt-1.5 text-lg font-semibold text-white/95 lg:text-xl">{t.role}</span>
              </h1>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-white/80">
                <MapPin className="size-3.5" /> {t.location}
              </p>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-pretty text-white/95 [text-shadow:0_1px_8px_rgb(0_0_0/0.5)] lg:max-w-md lg:text-base">
                {t.intro}
              </p>
            </motion.header>

            {/* Lưu danh bạ & chia sẻ (desktop đặt dưới phần giới thiệu) */}
            <motion.div variants={item} className="mt-8 hidden max-w-sm grid-cols-2 gap-3 lg:grid">
              <Actions t={t} />
            </motion.div>
          </div>

          {/* Mobile: danh sách link */}
          <nav aria-label={t.scanToContact} className="mt-8 space-y-3 lg:hidden">
            {channels.map((c) => (
              <ChannelRow key={c} channel={c} label={t.channels[c]} value={channelValue(c, intl)} message={t.message} />
            ))}
            <motion.div variants={item} className="grid grid-cols-2 gap-3 pt-1">
              <Actions t={t} />
            </motion.div>
          </nav>

          {/* Desktop: mã QR cho từng kênh */}
          <motion.section
            variants={item}
            aria-label={t.scanToContact}
            className="hidden rounded-3xl bg-white/95 p-7 text-gray-900 shadow-2xl ring-1 ring-black/5 backdrop-blur lg:block"
          >
            <h2 className="text-xl font-bold">{t.scanToContact}</h2>
            <p className="mt-1 text-sm text-gray-500">{t.scanHint}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {channels.map((c) => (
                <QrTile
                  key={c}
                  channel={c}
                  label={t.channels[c]}
                  value={channelValue(c, intl)}
                  open={t.open}
                  message={t.message}
                />
              ))}
            </div>
          </motion.section>
        </motion.main>

        {children}

        <footer className="mt-10 pb-2 text-center text-[11px] text-white/60 lg:text-left">
          {site.name} · {t.role} · Photo: Andreea Popa / Unsplash
        </footer>
      </div>
    </MotionConfig>
  );
}

function Avatar({ alt }: { alt: string }) {
  return (
    <div className="relative size-24 overflow-hidden rounded-full bg-[#2563eb] text-white shadow-lg ring-4 ring-white/90 lg:size-28">
      {site.avatar ? (
        <Image src={site.avatar} alt={alt} fill sizes="112px" className="object-cover" priority />
      ) : (
        <span className="flex size-full items-center justify-center text-3xl font-bold">{initials}</span>
      )}
    </div>
  );
}

function ChannelRow({
  channel,
  label,
  value,
  message,
}: {
  channel: Channel;
  label: string;
  value: string;
  message: string;
}) {
  const m = channelMeta[channel];
  return (
    <motion.a
      variants={item}
      whileTap={{ scale: 0.98 }}
      {...contactLinkProps(channel, message)}
      className="flex min-h-16 items-center gap-4 rounded-2xl bg-white/95 p-3 pr-4 text-gray-900 shadow-lg ring-1 ring-black/5 backdrop-blur active:bg-white"
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: m.color }}
      >
        <m.Icon className="size-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        <span className="block truncate text-sm text-gray-500">{value}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-gray-400" />
    </motion.a>
  );
}

function QrTile({
  channel,
  label,
  value,
  open,
  message,
}: {
  channel: Channel;
  label: string;
  value: string;
  open: string;
  message: string;
}) {
  const m = channelMeta[channel];
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex w-full items-center gap-3">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: m.color }}
        >
          <m.Icon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm leading-tight font-semibold">{label}</span>
          <span className="block truncate text-xs text-gray-500">{value}</span>
        </span>
      </div>
      {/* QR không kèm tin nhắn để mã thưa, dễ quét */}
      <QRCodeSVG
        value={channelHref(channel)}
        size={148}
        level="M"
        marginSize={0}
        fgColor="#111827"
        className="mt-4"
        title={`${label} QR`}
      />
      <a
        {...contactLinkProps(channel, message)}
        className="mt-3 inline-flex items-center gap-0.5 text-xs font-medium hover:underline"
        style={{ color: m.color }}
      >
        {open.replace("{app}", label)} <ChevronRight className="size-3.5" />
      </a>
    </div>
  );
}

function Actions({ t }: { t: Dictionary }) {
  const cls =
    "flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/15 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/25 active:bg-white/25";

  const saveContact = () => {
    track("save_contact");
    const blob = new Blob([buildVCard(t.role)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${site.name.replace(/\s+/g, "-")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const share = async () => {
    track("share");
    const url = window.location.href.split("?")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: `${site.name} · ${t.role}`, url });
      } catch {
        /* người dùng huỷ */
      }
      return;
    }
    if (await copyText(url)) toast.success(t.linkCopied);
  };

  return (
    <>
      <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={saveContact} className={cls}>
        <UserPlus className="size-4" /> {t.saveContact}
      </motion.button>
      <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={share} className={cls}>
        <Share2 className="size-4" /> {t.share}
      </motion.button>
    </>
  );
}
