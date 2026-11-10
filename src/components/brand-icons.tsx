import type { SVGProps } from "react";
import { Phone } from "lucide-react";
import type { Channel } from "@/lib/contact";
import { site } from "@/config/site";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ZaloIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3C6.5 3 2 6.7 2 11.3c0 2.4 1.2 4.6 3.2 6.1L4.5 21l4-1.9c1.1.3 2.3.5 3.5.5 5.5 0 10-3.7 10-8.3S17.5 3 12 3Z" />
      <text
        x="12"
        y="13.6"
        textAnchor="middle"
        fontSize="6.4"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
        fontFamily="system-ui, sans-serif"
      >
        Zalo
      </text>
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Z" />
      <g transform="translate(7 7) scale(0.42)" strokeWidth={4.4}>
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
      </g>
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21.2 3.6 2.9 10.7c-1 .4-1 1.8 0 2.1l4.6 1.5 1.8 5.5c.3.9 1.4 1.1 2 .4l2.6-2.6 4.8 3.5c.8.6 2 .1 2.2-.9l3-14.9c.2-1.1-.8-2-1.7-1.7Z" />
      <path d="m7.6 14.3 9.6-6.5-6.4 7.3" />
    </svg>
  );
}

export function MessengerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.2 7.1V22l3-1.7c1.2.3 2.5.5 3.8.5 5.6 0 10-4.1 10-9.6S17.6 2 12 2Z" />
      <path d="m7 14 4-4.2 2.6 2.4L17 10l-4 4.2-2.6-2.4Z" fill="currentColor" />
    </svg>
  );
}

export const channelMeta: Record<
  Channel,
  { label: string; value: string; Icon: (p: IconProps) => React.ReactNode; color: string }
> = {
  zalo: { label: "Zalo", value: site.contact.phone, Icon: ZaloIcon, color: "#0068ff" },
  phone: {
    label: "Gọi điện",
    value: site.contact.phone,
    Icon: (p) => <Phone {...(p as object)} />,
    color: "#16a34a",
  },
  whatsapp: { label: "WhatsApp", value: site.contact.phone, Icon: WhatsAppIcon, color: "#25d366" },
  telegram: {
    label: "Telegram",
    value: site.contact.telegram ? `@${site.contact.telegram}` : site.contact.phone,
    Icon: TelegramIcon,
    color: "#229ed9",
  },
  messenger: { label: "Messenger", value: "Facebook", Icon: MessengerIcon, color: "#0a7cff" },
};
