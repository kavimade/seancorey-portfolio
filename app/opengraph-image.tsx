import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sean Corey — Web Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#253631",
          padding: "72px 80px",
        }}
      >
        {/* Subtle grid accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(213,227,222,0.07) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(213,227,222,0.45)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Sean Corey
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#D5E3DE",
            lineHeight: 1.1,
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
          }}
        >
          Web Designer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(213,227,222,0.55)",
            lineHeight: 1.5,
            maxWidth: 640,
            display: "flex",
          }}
        >
          Web Design for brands making a difference.
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "rgba(213,227,222,0.15)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
