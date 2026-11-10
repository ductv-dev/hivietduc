import type { Channel } from "@/lib/contact";
import type { AreaKey, Feature, ListingType } from "@/data/listings";
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
  /** Tiêu đề tab / Google — nên chứa từ khoá khách hay tìm */
  metaTitle: string;
  metaDescription: string;
  areasTitle: string;
  areas: Record<AreaKey, string>;
  faqTitle: string;
  /** Hỏi đáp — vừa giúp khách, vừa giúp Google hiểu nội dung trang */
  faq: { q: string; a: string }[];
  types: Record<ListingType, string>;
  featureLabels: Record<Feature, string>;
  listing: {
    title: string;
    subtitle: string;
    rent: string;
    sale: string;
    rented: string;
    sold: string;
    bedrooms: string;
    bathrooms: string;
    size: string;
    floor: string;
    project: string;
    area: string;
    type: string;
    features: string;
    details: string;
    view: string;
    ask: string;
    back: string;
    updated: string;
    /** Tin nhắn hỏi căn — {code}, {title} được thay tự động */
    message: string;
  };
};

const vi: Dictionary = {
  role: "Sale căn hộ NM Home Đà Nẵng",
  intro:
    "Xin chào, mình là Viết Đức — sale căn hộ của hệ thống NM Home tại Đà Nẵng. Mình hỗ trợ thuê căn hộ, studio NM Home ở Sơn Trà, Ngũ Hành Sơn và An Hải. Nhắn mình thời gian ở và ngân sách, mình gửi căn phù hợp kèm ảnh thật.",
  location: "Đà Nẵng, Việt Nam",
  message: "Chào bạn, mình đang tìm thuê căn hộ NM Home ở Đà Nẵng, bạn tư vấn giúp mình nhé!",
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
  metaTitle: "Thuê căn hộ NM Home Đà Nẵng – Sơn Trà, Ngũ Hành Sơn, An Hải | Viết Đức",
  metaDescription:
    "Cho thuê căn hộ, studio NM Home tại Đà Nẵng: Sơn Trà, Ngũ Hành Sơn, An Hải. Ảnh thật, tư vấn nhanh qua Zalo 0866 791 931.",
  areasTitle: "Khu vực căn hộ NM Home",
  areas: {
    "son-tra": "Sơn Trà",
    "ngu-hanh-son": "Ngũ Hành Sơn",
    "an-hai": "An Hải",
  },
  faqTitle: "Câu hỏi thường gặp",
  faq: [
    {
      q: "NM Home là gì?",
      a: "NM Home là hệ thống căn hộ, studio cho thuê tại Đà Nẵng, tập trung ở khu Sơn Trà, Ngũ Hành Sơn và An Hải.",
    },
    {
      q: "Thuê căn hộ có mất phí tư vấn không?",
      a: "Không. Mình tư vấn và hẹn lịch xem căn miễn phí cho khách.",
    },
    {
      q: "Người nước ngoài có thuê được không?",
      a: "Được. Mình thường xuyên hỗ trợ khách nước ngoài và có thể tư vấn bằng tiếng Anh qua WhatsApp, Telegram.",
    },
    {
      q: "Làm sao để xem căn hộ?",
      a: "Nhắn mình qua Zalo, WhatsApp hoặc Telegram thời gian ở và ngân sách. Mình gửi ảnh, video thật rồi hẹn lịch xem trực tiếp.",
    },
  ],
  types: {
    studio: "Studio",
    "1br": "1 phòng ngủ",
    "2br": "2 phòng ngủ",
    "3br": "3 phòng ngủ",
    duplex: "Duplex",
    penthouse: "Penthouse",
  },
  featureLabels: {
    furnished: "Full nội thất",
    seaView: "View biển",
    cityView: "View thành phố",
    riverView: "View sông Hàn",
    balcony: "Ban công",
    pool: "Hồ bơi",
    gym: "Phòng gym",
    parking: "Chỗ đậu xe",
    petFriendly: "Cho nuôi thú cưng",
    washer: "Máy giặt riêng",
    security: "Bảo vệ 24/7",
  },
  listing: {
    title: "Căn hộ NM Home đang trống",
    subtitle: "Cập nhật thường xuyên — nhắn mình để xem thêm ảnh, video",
    rent: "Cho thuê",
    sale: "Bán",
    rented: "Đã cho thuê",
    sold: "Đã bán",
    bedrooms: "Phòng ngủ",
    bathrooms: "Phòng tắm",
    size: "Diện tích",
    floor: "Tầng",
    project: "Dự án",
    area: "Khu vực",
    type: "Loại căn",
    features: "Tiện ích",
    details: "Thông tin căn hộ",
    view: "Xem chi tiết",
    ask: "Hỏi căn này",
    back: "Quay lại",
    updated: "Cập nhật",
    message: "Chào bạn, mình quan tâm căn {code} — {title}. Căn này còn trống không bạn?",
  },
};

const en: Dictionary = {
  role: "Apartment Rentals · NM Home Da Nang",
  intro:
    "Hi, I'm Viet Duc — sales agent for NM Home apartments in Da Nang. I help you rent NM Home apartments and studios in Son Tra, Ngu Hanh Son and An Hai. Tell me your dates and budget, and I'll send matching units with real photos.",
  location: "Da Nang, Vietnam",
  message: "Hi Duc, I'm looking to rent an NM Home apartment in Da Nang. Could you help me?",
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
  metaTitle: "NM Home Apartments for Rent in Da Nang – Son Tra, Ngu Hanh Son, An Hai | Viet Duc",
  metaDescription:
    "Rent NM Home apartments and studios in Da Nang: Son Tra, Ngu Hanh Son and An Hai. Real photos, quick replies on WhatsApp +84 866 791 931.",
  areasTitle: "NM Home areas",
  areas: {
    "son-tra": "Son Tra",
    "ngu-hanh-son": "Ngu Hanh Son",
    "an-hai": "An Hai",
  },
  faqTitle: "FAQ",
  faq: [
    {
      q: "What is NM Home?",
      a: "NM Home is a network of rental apartments and studios in Da Nang, located in Son Tra, Ngu Hanh Son and An Hai.",
    },
    {
      q: "Is there a consultation fee?",
      a: "No. Consultation and viewings are free for tenants.",
    },
    {
      q: "Can foreigners rent?",
      a: "Yes. I regularly work with foreign tenants and can help you in English via WhatsApp or Telegram.",
    },
    {
      q: "How can I view an apartment?",
      a: "Message me on WhatsApp, Telegram or Zalo with your dates and budget. I'll send real photos and videos, then arrange a viewing.",
    },
  ],
  types: {
    studio: "Studio",
    "1br": "1 bedroom",
    "2br": "2 bedrooms",
    "3br": "3 bedrooms",
    duplex: "Duplex",
    penthouse: "Penthouse",
  },
  featureLabels: {
    furnished: "Fully furnished",
    seaView: "Sea view",
    cityView: "City view",
    riverView: "Han River view",
    balcony: "Balcony",
    pool: "Swimming pool",
    gym: "Gym",
    parking: "Parking",
    petFriendly: "Pet friendly",
    washer: "Private washer",
    security: "24/7 security",
  },
  listing: {
    title: "Available NM Home apartments",
    subtitle: "Updated regularly — message me for more photos and videos",
    rent: "For rent",
    sale: "For sale",
    rented: "Rented",
    sold: "Sold",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    size: "Size",
    floor: "Floor",
    project: "Project",
    area: "Area",
    type: "Type",
    features: "Amenities",
    details: "Apartment details",
    view: "View details",
    ask: "Ask about this apartment",
    back: "Back",
    updated: "Updated",
    message: "Hi Duc, I'm interested in apartment {code} — {title}. Is it still available?",
  },
};

const ru: Dictionary = {
  role: "Аренда апартаментов NM Home в Дананге",
  intro:
    "Здравствуйте! Меня зовут Вьет Дык, я менеджер по аренде апартаментов NM Home в Дананге. Помогу снять апартаменты или студию NM Home в районах Сон Тра, Нгу Хань Шон и Ан Хай. Напишите даты и бюджет — пришлю подходящие варианты с реальными фото.",
  location: "Дананг, Вьетнам",
  message: "Здравствуйте! Хочу снять апартаменты NM Home в Дананге. Можете помочь?",
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
  metaTitle: "Аренда апартаментов NM Home в Дананге – Сон Тра, Нгу Хань Шон, Ан Хай | Вьет Дык",
  metaDescription:
    "Аренда апартаментов и студий NM Home в Дананге: Сон Тра, Нгу Хань Шон, Ан Хай. Реальные фото, быстрый ответ в Telegram и WhatsApp +84 866 791 931.",
  areasTitle: "Районы NM Home",
  areas: {
    "son-tra": "Сон Тра",
    "ngu-hanh-son": "Нгу Хань Шон",
    "an-hai": "Ан Хай",
  },
  faqTitle: "Частые вопросы",
  faq: [
    {
      q: "Что такое NM Home?",
      a: "NM Home — сеть апартаментов и студий для аренды в Дананге, в районах Сон Тра, Нгу Хань Шон и Ан Хай.",
    },
    {
      q: "Консультация платная?",
      a: "Нет. Консультация и просмотры для арендаторов бесплатные.",
    },
    {
      q: "Может ли иностранец снять квартиру?",
      a: "Да. Я постоянно работаю с иностранными арендаторами и общаюсь через Telegram и WhatsApp.",
    },
    {
      q: "Как посмотреть квартиру?",
      a: "Напишите в Telegram, WhatsApp или Zalo даты и бюджет. Я пришлю реальные фото и видео и договорюсь о просмотре.",
    },
  ],
  types: {
    studio: "Студия",
    "1br": "1 спальня",
    "2br": "2 спальни",
    "3br": "3 спальни",
    duplex: "Дуплекс",
    penthouse: "Пентхаус",
  },
  featureLabels: {
    furnished: "С мебелью",
    seaView: "Вид на море",
    cityView: "Вид на город",
    riverView: "Вид на реку Хан",
    balcony: "Балкон",
    pool: "Бассейн",
    gym: "Спортзал",
    parking: "Парковка",
    petFriendly: "Можно с животными",
    washer: "Своя стиральная машина",
    security: "Охрана 24/7",
  },
  listing: {
    title: "Свободные апартаменты NM Home",
    subtitle: "Обновляется регулярно — напишите, пришлю больше фото и видео",
    rent: "Аренда",
    sale: "Продажа",
    rented: "Сдана",
    sold: "Продана",
    bedrooms: "Спальни",
    bathrooms: "Санузлы",
    size: "Площадь",
    floor: "Этаж",
    project: "Комплекс",
    area: "Район",
    type: "Тип",
    features: "Удобства",
    details: "О квартире",
    view: "Подробнее",
    ask: "Спросить об этой квартире",
    back: "Назад",
    updated: "Обновлено",
    message: "Здравствуйте! Меня интересует квартира {code} — {title}. Она ещё свободна?",
  },
};

const ko: Dictionary = {
  role: "다낭 NM Home 아파트 임대 상담",
  intro:
    "안녕하세요, 다낭 NM Home 아파트 세일즈 비엣 득입니다. 선짜, 응우한선, 안하이 지역의 NM Home 아파트와 스튜디오 임대를 도와드립니다. 체류 기간과 예산을 알려주시면 실제 사진과 함께 맞는 매물을 보내드립니다.",
  location: "베트남 다낭",
  message: "안녕하세요, 다낭 NM Home 아파트 임대를 알아보고 있습니다. 상담 부탁드립니다.",
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
  metaTitle: "다낭 NM Home 아파트 임대 – 선짜, 응우한선, 안하이 | 비엣 득",
  metaDescription:
    "다낭 NM Home 아파트·스튜디오 임대: 선짜, 응우한선, 안하이. 실제 사진, WhatsApp·Zalo +84 866 791 931 빠른 상담.",
  areasTitle: "NM Home 지역",
  areas: {
    "son-tra": "선짜",
    "ngu-hanh-son": "응우한선",
    "an-hai": "안하이",
  },
  faqTitle: "자주 묻는 질문",
  faq: [
    {
      q: "NM Home은 무엇인가요?",
      a: "NM Home은 다낭 선짜, 응우한선, 안하이 지역의 임대 아파트·스튜디오 브랜드입니다.",
    },
    {
      q: "상담 비용이 있나요?",
      a: "없습니다. 상담과 방문 안내는 무료입니다.",
    },
    {
      q: "외국인도 임대할 수 있나요?",
      a: "네, 가능합니다. 외국인 고객을 자주 도와드리고 있으며 WhatsApp, Telegram으로 상담해 드립니다.",
    },
    {
      q: "아파트는 어떻게 보러 가나요?",
      a: "Zalo, WhatsApp 또는 Telegram으로 체류 기간과 예산을 보내주세요. 실제 사진과 영상을 보내드리고 방문 일정을 잡아드립니다.",
    },
  ],
  types: {
    studio: "스튜디오",
    "1br": "방 1개",
    "2br": "방 2개",
    "3br": "방 3개",
    duplex: "복층",
    penthouse: "펜트하우스",
  },
  featureLabels: {
    furnished: "풀옵션",
    seaView: "오션뷰",
    cityView: "시티뷰",
    riverView: "한강뷰",
    balcony: "발코니",
    pool: "수영장",
    gym: "헬스장",
    parking: "주차",
    petFriendly: "반려동물 가능",
    washer: "개별 세탁기",
    security: "24시간 경비",
  },
  listing: {
    title: "현재 임대 가능한 NM Home 아파트",
    subtitle: "수시로 업데이트됩니다 — 더 많은 사진과 영상은 메시지로 요청하세요",
    rent: "임대",
    sale: "매매",
    rented: "임대 완료",
    sold: "매매 완료",
    bedrooms: "침실",
    bathrooms: "욕실",
    size: "면적",
    floor: "층",
    project: "단지",
    area: "지역",
    type: "유형",
    features: "편의시설",
    details: "매물 정보",
    view: "자세히 보기",
    ask: "이 매물 문의하기",
    back: "뒤로",
    updated: "업데이트",
    message: "안녕하세요, {code} 매물({title})에 관심이 있습니다. 아직 가능한가요?",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { vi, en, ru, ko };

/** Phần chữ cần cho các component chạy phía trình duyệt (giữ HTML nhẹ) */
const clientKeys = [
  "role",
  "intro",
  "location",
  "message",
  "channelOrder",
  "phoneFormat",
  "channels",
  "scanToContact",
  "scanHint",
  "open",
  "saveContact",
  "share",
  "linkCopied",
  "language",
] as const;
export type ClientDictionary = Pick<Dictionary, (typeof clientKeys)[number]>;
export const toClient = (t: Dictionary): ClientDictionary =>
  Object.fromEntries(clientKeys.map((k) => [k, t[k]])) as ClientDictionary;
export const getDictionary = (locale: Locale) => dictionaries[locale];
