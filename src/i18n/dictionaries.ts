import type { Channel } from "@/lib/contact";
import type { Locale } from "./config";

/**
 * ============================================================
 *  NỘI DUNG CHỮ THEO TỪNG NGÔN NGỮ — sửa câu chữ ở đây
 * ============================================================
 */

export type Dictionary = {
  /** Vai trò, hiện dưới tên */
  role: string;
  /** Lời giới thiệu */
  intro: string;
  location: string;
  /** Tin nhắn soạn sẵn khi khách mở WhatsApp / Telegram */
  message: string;
  /** Thứ tự kênh liên hệ ưu tiên cho khách nói ngôn ngữ này */
  channelOrder: Channel[];
  /** Hiển thị SĐT dạng trong nước hay quốc tế */
  phoneFormat: "local" | "intl";
  channels: Record<Channel, string>;
  scanToContact: string;
  scanHint: string;
  /** Nút mở app trên desktop, {app} = tên kênh */
  open: string;
  saveContact: string;
  share: string;
  linkCopied: string;
  language: string;
  metaTitle: string;
  metaDescription: string;
};

const vi: Dictionary = {
  role: "Sale căn hộ tại Đà Nẵng",
  intro:
    "Xin chào, mình là Viết Đức — sale căn hộ tại Đà Nẵng. Mình hỗ trợ mua bán và cho thuê căn hộ, studio, căn view biển. Nhắn mình nhu cầu và ngân sách, mình tư vấn miễn phí.",
  location: "Đà Nẵng, Việt Nam",
  message: "Chào bạn, mình đang quan tâm căn hộ ở Đà Nẵng, bạn tư vấn giúp mình nhé!",
  channelOrder: ["zalo", "phone", "whatsapp", "telegram", "messenger"],
  phoneFormat: "local",
  channels: {
    zalo: "Zalo",
    phone: "Gọi điện",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    messenger: "Messenger",
  },
  scanToContact: "Quét mã để liên hệ",
  scanHint: "Mở camera điện thoại và quét mã của ứng dụng bạn dùng",
  open: "Mở {app}",
  saveContact: "Lưu danh bạ",
  share: "Chia sẻ",
  linkCopied: "Đã copy link",
  language: "Ngôn ngữ",
  metaTitle: "Viết Đức · Sale căn hộ Đà Nẵng",
  metaDescription:
    "Viết Đức — sale căn hộ tại Đà Nẵng. Mua bán, cho thuê căn hộ, studio, căn view biển. Liên hệ Zalo, WhatsApp, Telegram.",
};

const en: Dictionary = {
  role: "Apartment Sales Agent in Da Nang",
  intro:
    "Hi, I'm Viet Duc — an apartment sales agent in Da Nang. I help you buy or rent apartments, studios and sea-view condos. Tell me what you need and your budget — the consultation is free.",
  location: "Da Nang, Vietnam",
  message: "Hi Duc, I'm interested in apartments in Da Nang. Could you help me?",
  channelOrder: ["whatsapp", "telegram", "zalo", "phone", "messenger"],
  phoneFormat: "intl",
  channels: {
    zalo: "Zalo",
    phone: "Call",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    messenger: "Messenger",
  },
  scanToContact: "Scan to contact me",
  scanHint: "Open your phone camera and scan the code of the app you use",
  open: "Open {app}",
  saveContact: "Save contact",
  share: "Share",
  linkCopied: "Link copied",
  language: "Language",
  metaTitle: "Viet Duc · Apartment Sales in Da Nang",
  metaDescription:
    "Viet Duc — apartment sales agent in Da Nang, Vietnam. Buy or rent apartments, studios and sea-view condos. Contact via WhatsApp, Telegram or Zalo.",
};

const ru: Dictionary = {
  role: "Агент по продаже квартир в Дананге",
  intro:
    "Здравствуйте! Меня зовут Вьет Дык, я агент по продаже квартир в Дананге. Помогу купить или арендовать квартиру, студию или апартаменты с видом на море. Напишите ваши пожелания и бюджет — консультация бесплатная.",
  location: "Дананг, Вьетнам",
  message: "Здравствуйте! Меня интересуют квартиры в Дананге. Можете проконсультировать?",
  channelOrder: ["telegram", "whatsapp", "zalo", "phone", "messenger"],
  phoneFormat: "intl",
  channels: {
    zalo: "Zalo",
    phone: "Позвонить",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    messenger: "Messenger",
  },
  scanToContact: "Отсканируйте, чтобы связаться",
  scanHint: "Откройте камеру телефона и отсканируйте код нужного приложения",
  open: "Открыть {app}",
  saveContact: "Сохранить контакт",
  share: "Поделиться",
  linkCopied: "Ссылка скопирована",
  language: "Язык",
  metaTitle: "Вьет Дык · Квартиры в Дананге",
  metaDescription:
    "Вьет Дык — агент по продаже квартир в Дананге, Вьетнам. Покупка и аренда квартир, студий и апартаментов с видом на море. Telegram, WhatsApp, Zalo.",
};

const ko: Dictionary = {
  role: "다낭 아파트 전문 세일즈",
  intro:
    "안녕하세요, 다낭 아파트 전문 세일즈 비엣 득입니다. 아파트, 스튜디오, 오션뷰 콘도의 매매와 임대를 도와드립니다. 원하시는 조건과 예산을 알려주시면 무료로 상담해 드립니다.",
  location: "베트남 다낭",
  message: "안녕하세요, 다낭 아파트에 관심이 있어 연락드립니다. 상담 부탁드립니다.",
  channelOrder: ["zalo", "whatsapp", "telegram", "phone", "messenger"],
  phoneFormat: "intl",
  channels: {
    zalo: "Zalo",
    phone: "전화하기",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    messenger: "Messenger",
  },
  scanToContact: "스캔하여 연락하기",
  scanHint: "휴대폰 카메라로 사용하시는 앱의 코드를 스캔하세요",
  open: "{app} 열기",
  saveContact: "연락처 저장",
  share: "공유하기",
  linkCopied: "링크가 복사되었습니다",
  language: "언어",
  metaTitle: "비엣 득 · 다낭 아파트 매매·임대",
  metaDescription:
    "다낭 아파트 전문 세일즈 비엣 득. 아파트, 스튜디오, 오션뷰 콘도 매매 및 임대 상담. Zalo, WhatsApp, Telegram으로 연락하세요.",
};

export const dictionaries: Record<Locale, Dictionary> = { vi, en, ru, ko };
export const getDictionary = (locale: Locale) => dictionaries[locale];
