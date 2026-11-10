"use client";

import Image from "next/image";
import { MotionConfig, motion, type Variants } from "motion/react";
import { track } from "@vercel/analytics";
import { ChevronRight, MapPin, Share2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { initials, site } from "@/config/site";
import { channelMeta } from "@/components/brand-icons";
import { buildVCard, enabledChannels } from "@/lib/contact";
import { contactLinkProps, copyText } from "@/lib/use-contact";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function ContactPage() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        variants={list}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-[max(2.5rem,env(safe-area-inset-top))] pb-safe"
      >
        {/* Hồ sơ */}
        <motion.header variants={item} className="flex flex-col items-center text-center">
          <div className="relative size-24 overflow-hidden rounded-full bg-primary text-primary-foreground ring-4 ring-card shadow-sm">
            {site.avatar ? (
              <Image src={site.avatar} alt={site.name} fill sizes="96px" className="object-cover" priority />
            ) : (
              <span className="flex size-full items-center justify-center text-3xl font-bold">
                {initials}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">{site.name}</h1>
          <p className="mt-1 font-medium">{site.title}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> Đà Nẵng
          </p>
          {site.bio && (
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-pretty text-muted-foreground">
              {site.bio}
            </p>
          )}
        </motion.header>

        {/* Các kênh liên hệ */}
        <nav aria-label="Liên hệ" className="mt-8 space-y-3">
          {enabledChannels.map((c) => {
            const m = channelMeta[c];
            return (
              <motion.a
                key={c}
                variants={item}
                whileTap={{ scale: 0.98 }}
                {...contactLinkProps(c)}
                className="flex min-h-16 items-center gap-4 rounded-2xl border bg-card p-3 pr-4 shadow-xs transition-colors hover:bg-secondary active:bg-secondary"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: m.color }}
                >
                  <m.Icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{m.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">{m.value}</span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </motion.a>
            );
          })}
        </nav>

        {/* Lưu danh bạ & chia sẻ */}
        <motion.div variants={item} className="mt-3 grid grid-cols-2 gap-3">
          <ActionButton onClick={saveContact} icon={<UserPlus className="size-4" />}>
            Lưu danh bạ
          </ActionButton>
          <ActionButton onClick={share} icon={<Share2 className="size-4" />}>
            Chia sẻ
          </ActionButton>
        </motion.div>

        <motion.footer
          variants={item}
          className="mt-auto pt-10 text-center text-xs text-muted-foreground"
        >
          {site.name} · {site.title}
        </motion.footer>
      </motion.main>
    </MotionConfig>
  );
}

function ActionButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex h-12 items-center justify-center gap-2 rounded-2xl border bg-card text-sm font-medium shadow-xs transition-colors hover:bg-secondary"
    >
      {icon}
      {children}
    </motion.button>
  );
}

function saveContact() {
  track("save_contact");
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${site.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function share() {
  track("share");
  const url = window.location.origin;
  if (navigator.share) {
    try {
      await navigator.share({ title: `${site.name} · ${site.title}`, url });
    } catch {
      /* người dùng huỷ */
    }
    return;
  }
  if (await copyText(url)) toast.success("Đã copy link");
}
