import Image from "next/image";
import { site } from "@/config/site";

/** Nền ảnh Cầu Vàng cố định + lớp phủ tối để chữ dễ đọc */
export function PageBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-[#1f2a2e]">
      <Image
        src={site.background}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-black/80 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/45 lg:to-black/30" />
    </div>
  );
}
