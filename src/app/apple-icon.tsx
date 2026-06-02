import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#9a3412",
          color: "#fff7ed",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 8,
            background: "#c2410c",
            borderRadius: 32,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 20,
            border: "1.5px solid rgba(255, 247, 237, 0.3)",
            borderRadius: 24,
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 0.86,
            color: "#fff7ed",
          }}
        >
          KW
        </span>
      </div>
    ),
    size,
  );
}
