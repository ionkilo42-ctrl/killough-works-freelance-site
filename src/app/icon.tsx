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
          background: "#081a2a",
          color: "#f2e7d4",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "2px solid rgba(223, 204, 170, 0.34)",
            borderRadius: 36,
          }}
        />
        <div
          style={{
            width: 392,
            height: 392,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            border: "4px solid #dfccaa",
            borderRadius: 999,
            boxShadow: "inset 0 0 0 2px rgba(223, 204, 170, 0.24)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              width: 2,
              height: 44,
              background: "#dfccaa",
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              width: 30,
              height: 30,
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 2,
                height: 26,
                background: "#f2e7d4",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 26,
                height: 2,
                background: "#f2e7d4",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 30,
              top: "50%",
              width: 40,
              height: 2,
              background: "#dfccaa",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 30,
              top: "50%",
              width: 40,
              height: 2,
              background: "#dfccaa",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 74,
              width: 300,
              height: 300,
              border: "1px dashed rgba(156, 205, 196, 0.24)",
              borderRadius: 999,
              transform: "translateX(-50%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 96,
              top: 82,
              fontSize: 228,
              fontWeight: 700,
              lineHeight: 0.86,
            }}
          >
            K
          </span>
          <span
            style={{
              position: "absolute",
              left: 182,
              top: 192,
              fontSize: 170,
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
