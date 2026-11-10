import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Font Be Vietnam Pro (đủ dấu tiếng Việt) cho ảnh OG / icon.
 * "use cache" để ảnh được tạo sẵn lúc build thay vì mỗi request.
 */
export async function loadOgFonts() {
  "use cache";
  const b = await readFile(join(process.cwd(), "assets", "BeVietnamPro-Bold.ttf"));
  const data = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
  return [{ name: "BVP", data, weight: 700 as const, style: "normal" as const }];
}
