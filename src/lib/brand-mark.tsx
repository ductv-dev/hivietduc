export const BRAND = {
  navy: "#0f2747",
  gold: "#f5c04e",
  white: "#ffffff",
  mist: "#9db4d3",
};

/**
 * Logo: toà căn hộ trắng có mái vàng + toà thấp bên cạnh, nền navy.
 * Vẽ hoàn toàn bằng hình khối (không chữ) để rõ cả ở 16px.
 * Dùng cho favicon, apple-icon, icon PWA (render bằng next/og).
 * @param rounded bo góc — tắt cho apple-icon vì iOS tự bo.
 */
export function BrandMark({ size, rounded = true }: { size: number; rounded?: boolean }) {
  const { navy, gold, white, mist } = BRAND;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: navy,
        borderRadius: rounded ? size * 0.22 : 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64">
        {/* toà thấp phía sau */}
        <rect x="38" y="29" width="12" height="23" rx="1.5" fill={mist} />
        <rect x="41.5" y="33" width="5" height="4" rx="0.8" fill={navy} />
        <rect x="41.5" y="40" width="5" height="4" rx="0.8" fill={navy} />

        {/* toà căn hộ chính */}
        <rect x="16" y="19" width="24" height="33" rx="2" fill={white} />
        {/* mái vàng */}
        <rect x="14" y="13.5" width="28" height="6" rx="2" fill={gold} />
        {/* cửa sổ 2 x 3 */}
        {[23, 30.5, 38].map((y) =>
          [20, 30].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="6" height="4.5" rx="0.8" fill={navy} />
          )),
        )}
        {/* cửa ra vào */}
        <rect x="25" y="45" width="6" height="7" rx="1" fill={gold} />
      </svg>
    </div>
  );
}
