import { site } from "@/config/site";

export type Channel = "zalo" | "whatsapp" | "telegram" | "messenger" | "phone";

const enc = encodeURIComponent;
const { contact } = site;

/** SĐT dạng quốc tế để hiển thị: +84 866 791 931 */
export const phoneIntlDisplay = `+${contact.phoneIntl.slice(0, 2)} ${contact.phone.replace(/^0/, "")}`;

/** Deep link mở thẳng app, kèm tin nhắn soạn sẵn nếu app hỗ trợ */
export function channelHref(channel: Channel, message = "") {
  const text = message ? `?text=${enc(message)}` : "";
  switch (channel) {
    case "zalo":
      return `https://zalo.me/${contact.zalo}`;
    case "whatsapp":
      return `https://wa.me/${contact.phoneIntl}${text}`;
    case "telegram":
      return contact.telegram
        ? `https://t.me/${contact.telegram}${text}`
        : `https://t.me/+${contact.phoneIntl}`;
    case "messenger":
      return `https://m.me/${contact.messenger}`;
    case "phone":
      return `tel:+${contact.phoneIntl}`;
  }
}

/** Giá trị hiển thị dưới tên kênh */
export function channelValue(channel: Channel, intl: boolean) {
  const phone = intl ? phoneIntlDisplay : contact.phone;
  if (channel === "telegram" && contact.telegram) return `@${contact.telegram}`;
  if (channel === "messenger") return "Facebook";
  return phone;
}

export const isEnabled = (c: Channel) => (c === "messenger" ? !!contact.messenger : true);

export function buildVCard(role: string) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.name}`,
    `N:;${site.name};;;`,
    `TITLE:${role}`,
    `TEL;TYPE=CELL:+${contact.phoneIntl}`,
    `URL:${site.url}`,
    `NOTE:Zalo / WhatsApp / Telegram: ${phoneIntlDisplay}`,
    "END:VCARD",
  ].join("\r\n");
}
