import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
            inset: 24,
            background: "#c2410c",
            borderRadius: 96,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 56,
            border: "4px solid rgba(255, 247, 237, 0.28)",
            borderRadius: 72,
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: 244,
            fontWeight: 700,
            letterSpacing: -8,
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
