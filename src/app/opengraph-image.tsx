import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/profile";

export const alt = `${profile.name} · ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/img/brand-mark-light-sm.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111113",
          color: "#f2f2f3",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires raw img */}
          <img
            src={logoSrc}
            width={64}
            height={64}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 22,
              color: "rgba(242,242,243,0.55)",
              letterSpacing: "0.04em",
            }}
          >
            ikhwanhsn.me
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(242,242,243,0.72)",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(242,242,243,0.55)",
          }}
        >
          <div style={{ display: "flex", gap: 18 }}>
            <span>Founder of Syra AI</span>
            <span>·</span>
            <span>CTO of S3Labs</span>
          </div>
          <div style={{ color: "#c0f27f" }}>{profile.thesis}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
