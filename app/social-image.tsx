/* eslint-disable @next/next/no-img-element -- ImageResponse renders a static Satori image, where next/image is not supported. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_IMAGE_SIZE,
} from "./seo";

const logoData = await readFile(
  join(process.cwd(), "public", "Alviro-Tech-Logo-Black.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#06080b",
          color: "#f8f8f3",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            left: -190,
            top: -220,
            display: "flex",
            borderRadius: 999,
            background: "rgba(167,139,250,.2)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            right: -180,
            bottom: -250,
            display: "flex",
            borderRadius: 999,
            background: "rgba(99,230,255,.18)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 92,
                height: 92,
                padding: 15,
                borderRadius: 24,
                background: "#c8ff5a",
              }}
            >
              <img
                src={logoSrc}
                alt=""
                width={62}
                height={55}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1.8 }}>
                {SITE_NAME}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 4,
                  color: "#98a2ad",
                  textTransform: "uppercase",
                }}
              >
                Digital growth systems
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 80,
                lineHeight: 0.94,
                fontWeight: 900,
                letterSpacing: -5,
              }}
            >
              <span>Digital growth,</span>
              <span>engineered to scale.</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 34,
                fontSize: 22,
                color: "#c7ced5",
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 48,
                  height: 3,
                  background: "#c8ff5a",
                }}
              />
              {SITE_TAGLINE}
            </div>
          </div>
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
