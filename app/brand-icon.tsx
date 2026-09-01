/* eslint-disable @next/next/no-img-element -- ImageResponse requires a native image element for embedded assets. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const logoData = await readFile(
  join(process.cwd(), "public", "Alviro-Tech-Logo-Black.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

export function createBrandIcon(size: number) {
  const markSize = Math.round(size * 0.7);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Math.round(size * 0.3),
          background: "#c8ff5a",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={markSize}
          height={markSize}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
