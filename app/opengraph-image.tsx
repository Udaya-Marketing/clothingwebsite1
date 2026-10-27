import { ImageResponse } from "next/og";

export const alt = "Serein Studio — thoughtful clothes for the everyday";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f1eb",
          color: "#1a1714",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#4a423a", fontSize: 18, letterSpacing: 8 }}>S E R E I N</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 100, letterSpacing: -4, lineHeight: 0.95 }}>
            Wear what
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 100, letterSpacing: -4, lineHeight: 0.95 }}>
            feels like you.
          </div>
          <div style={{ color: "#4a423a", fontSize: 19, letterSpacing: 2, marginTop: 32 }}>
            THOUGHTFUL CLOTHES FOR THE EVERYDAY
          </div>
        </div>
        <div style={{ color: "#8d7e6f", fontSize: 16, letterSpacing: 2 }}>SEREINSTUDIO.COM</div>
      </div>
    ),
    { ...size },
  );
}
