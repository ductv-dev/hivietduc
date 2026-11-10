import { site } from "@/config/site";

export type Channel = "zalo" | "whatsapp" | "telegram" | "messenger" | "phone";

const enc = encodeURIComponent;
const { contact } = site;

/** Deep link mở thẳng app, kèm tin nhắn soạn sẵn nếu app hỗ trợ */
export function channelHref(channel: Channel, message: string = site.defaultMessage) {
  switch (channel) {
    case "zalo":
      return `https://zalo.me/${contact.zalo}`;
    case "whatsapp":
      return `https://wa.me/${contact.phoneIntl}?text=${enc(message)}`;
    case "telegram":
      return contact.telegram
        ? `https://t.me/${contact.telegram}?text=${enc(message)}`
        : `https://t.me/+${contact.phoneIntl}`;
    case "messenger":
      return `https://m.me/${contact.messenger}`;
    case "phone":
      return `tel:${contact.phone.replace(/\s/g, "")}`;
  }
}

const all: Channel[] = ["zalo", "phone", "whatsapp", "telegram", "messenger"];

export const enabledChannels = all.filter((c) =>
  c === "messenger" ? !!contact.messenger : true,
);

export function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.name} - Thuê phòng Đà Nẵng`,
    `N:;${site.name};;;`,
    `ORG:${site.title}`,
    `TEL;TYPE=CELL:${contact.phone.replace(/\s/g, "")}`,
    `URL:${site.url}`,
    `NOTE:Zalo ${contact.zalo}${contact.telegram ? ` · Telegram @${contact.telegram}` : ` · Telegram ${contact.phone}`}`,
    "END:VCARD",
  ].join("\r\n");
}
