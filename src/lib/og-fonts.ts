import { readFile } from "node:fs/promises";
import { join } from "node:path";

type OgFont = { name: string; data: ArrayBuffer; weight: 700; style: "normal" };

/** Tải font Google chỉ với các ký tự cần dùng (TTF tĩnh cho Satori) */
async function googleFont(family: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`Không tải được font ${family}`);
  return (await fetch(src)).arrayBuffer();
}

/**
 * Font cho ảnh OG / icon. "use cache" để ảnh được tạo sẵn lúc build.
 * Tiếng Hàn dùng Noto Sans KR, còn lại dùng Inter; lỗi mạng thì rơi về Be Vietnam Pro có sẵn.
 */
export async function loadOgFonts(text: string, korean = false): Promise<OgFont[]> {
  "use cache";
  const fonts: OgFont[] = [];
  try {
    fonts.push({ name: "OG", data: await googleFont("Inter", text), weight: 700, style: "normal" });
    if (korean)
      fonts.push({
        name: "OG",
        data: await googleFont("Noto Sans KR", text),
        weight: 700,
        style: "normal",
      });
  } catch {
    const b = await readFile(join(process.cwd(), "assets", "BeVietnamPro-Bold.ttf"));
    const data = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
    fonts.push({ name: "OG", data, weight: 700, style: "normal" });
  }
  return fonts;
}
