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
          background: "#081a2a",
          color: "#f2e7d4",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div
          style={{
            width: 142,
            height: 142,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            border: "2px solid #dfccaa",
            borderRadius: 999,
            boxShadow: "inset 0 0 0 1px rgba(223, 204, 170, 0.24)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 6,
              left: "50%",
              width: 14,
              height: 14,
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 1.5,
                height: 12,
                background: "#f2e7d4",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 12,
                height: 1.5,
                background: "#f2e7d4",
              }}
            />
          </div>
          <span
            style={{
              position: "absolute",
              left: 30,
              top: 20,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 0.86,
            }}
          >
            K
          </span>
          <span
            style={{
              position: "absolute",
              left: 62,
              top: 62,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 0.86,
            }}
          >
            W
          </span>
        </div>
      </div>
    ),
    size,
  );
}
