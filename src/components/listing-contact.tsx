"use client";

import { channelMeta } from "@/components/brand-icons";
import { channelValue, isEnabled } from "@/lib/contact";
import { contactLinkProps } from "@/lib/use-contact";
import type { ClientDictionary as Dictionary } from "@/i18n/dictionaries";

/** Nút hỏi căn — tin nhắn soạn sẵn có mã căn (WhatsApp / Telegram) */
export function ListingContact({ t, message }: { t: Dictionary; message: string }) {
  const channels = t.channelOrder.filter(isEnabled);
  const intl = t.phoneFormat === "intl";
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {channels.map((c) => {
        const m = channelMeta[c];
        return (
          <a
            key={c}
            {...contactLinkProps(c, message)}
            className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 pr-3 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: m.color }}
            >
              <m.Icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{t.channels[c]}</span>
              <span className="block truncate text-xs text-gray-500">{channelValue(c, intl)}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
