import { ImageResponse } from "next/og"

export const alt = "Keshav Garg — AI engineer for regulated industries"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "72px 80px",
          borderBottom: "16px solid #111111",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Keshav Garg</div>
          <div style={{ fontSize: 28, color: "#696969", marginTop: 8 }}>Security · Banking · Government contracting · Defense</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          AI engineer for regulated industries.
        </div>
      </div>
    ),
    size
  )
}
