"use client";

import { track } from "@vercel/analytics";
import { channelHref, type Channel } from "@/lib/contact";

/** Copy text — có fallback cho trình duyệt in-app (Facebook, Zalo) chặn clipboard API */
export function copyText(text: string): Promise<boolean> {
  const legacy = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  };
  if (!navigator.clipboard?.writeText) return Promise.resolve(legacy());
  return navigator.clipboard.writeText(text).then(
    () => true,
    () => legacy(),
  );
}

/** Props cho thẻ <a> liên hệ — dùng link thật để iOS / in-app browser mở đúng app */
export function contactLinkProps(channel: Channel, message?: string) {
  return {
    href: channelHref(channel, message),
    ...(channel === "phone" ? {} : { target: "_blank", rel: "noopener noreferrer" }),
    onClick: () => track("contact_click", { channel }),
  };
}
