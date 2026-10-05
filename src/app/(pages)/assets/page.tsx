import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AssetsTabs from "@/components/AssetsTabs";
import { SITE_URL, profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Assets",
  description: `BTC, SOL, XRP plus live Meteora LP tokens — from ${profile.name}.`,
  alternates: { canonical: `${SITE_URL}/assets` },
  openGraph: {
    title: "Assets",
    description: `BTC, SOL, XRP plus live Meteora LP tokens — from ${profile.name}.`,
    url: `${SITE_URL}/assets`,
  },
};

const AssetsPage = () => {
  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">Assets</p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        Invest / DEX
      </h1>
      <p className="mt-3 font-medium text-greyText leading-relaxed">
        Invest coins via Syra. DEX is open Meteora DLMM positions.
      </p>

      <Suspense
        fallback={
          <p className="mt-12 font-mono text-xs text-greyText">Loading…</p>
        }
      >
        <AssetsTabs />
      </Suspense>

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link href="/" className="hover:border-b hover:border-greyText">
          ← Work
        </Link>
        <span className="mx-2">/</span>
        <Link href="/now" className="hover:border-b hover:border-greyText">
          Now
        </Link>
      </p>
    </main>
  );
};

export default AssetsPage;
