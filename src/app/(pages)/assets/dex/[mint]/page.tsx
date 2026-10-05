import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssetStats from "@/components/AssetStats";
import { SITE_URL } from "@/data/profile";
import {
  fetchDexToken,
  formatCompactUsd,
  formatPct,
  formatUsd,
  isLikelySolanaMint,
} from "@/lib/syra";

export const revalidate = 60;

type PageProps = {
  params: { mint: string };
};

function truncateMint(mint: string) {
  return `${mint.slice(0, 6)}…${mint.slice(-6)}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const mint = params.mint?.trim() ?? "";
  if (!isLikelySolanaMint(mint)) {
    return { title: "DEX token" };
  }
  const out = await fetchDexToken(mint);
  const ticker =
    out.success && out.data.token.symbol && out.data.token.symbol !== "?"
      ? out.data.token.symbol
      : "DEX";
  return {
    title: `${ticker} · Assets`,
    description: `${ticker} Solana DEX token via Syra.`,
    alternates: { canonical: `${SITE_URL}/assets/dex/${mint}` },
  };
}

const DexTokenPage = async ({ params }: PageProps) => {
  const mint = params.mint?.trim() ?? "";
  if (!isLikelySolanaMint(mint)) notFound();

  const out = await fetchDexToken(mint);
  if (!out.success) {
    return (
      <main className="mt-12 min-h-screen mb-4">
        <p className="font-mono text-xs text-greyText">
          <Link href="/assets?tab=dex" className="hover:border-b hover:border-greyText">
            Assets
          </Link>
          <span className="mx-2">/</span>
          DEX
        </p>
        <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
          Token
        </h1>
        <p className="mt-4 font-medium text-greyText leading-relaxed">
          Couldn’t load this mint from Syra. It may be new, or the desk is
          briefly down.
        </p>
        <p className="mt-12 font-mono text-xs text-greyText">
          <Link
            href="/assets?tab=dex"
            className="hover:border-b hover:border-greyText"
          >
            ← DEX
          </Link>
        </p>
      </main>
    );
  }

  const token = out.data.token;
  const ticker =
    token.symbol && token.symbol !== "?"
      ? token.symbol
      : token.name && token.name !== "?"
        ? token.name
        : truncateMint(mint);

  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">
        <Link
          href="/assets?tab=dex"
          className="hover:border-b hover:border-greyText"
        >
          Assets
        </Link>
        <span className="mx-2">/</span>
        DEX
      </p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        {ticker}
      </h1>
      {token.name && token.name !== "?" && token.name !== ticker ? (
        <p className="mt-2 font-medium text-greyText">{token.name}</p>
      ) : null}
      <p className="mt-4 font-medium text-xl tracking-tight">
        {formatUsd(token.priceUsd)}
        {token.priceChange24hPct != null ? (
          <span className="ml-3 font-mono text-sm text-greyText">
            {formatPct(token.priceChange24hPct)}
          </span>
        ) : null}
      </p>

      <p className="mt-8 font-medium text-greyText leading-relaxed">
        Chart candles aren’t on the free Syra desk for most Solana tokens.
        Stats below are the live snapshot.
      </p>

      <AssetStats
        stats={[
          { label: "Price", value: formatUsd(token.priceUsd) },
          { label: "24h", value: formatPct(token.priceChange24hPct) },
          { label: "Market cap", value: formatCompactUsd(token.marketCapUsd) },
          { label: "Liquidity", value: formatCompactUsd(token.liquidityUsd) },
          { label: "Volume 24h", value: formatCompactUsd(token.volume24hUsd) },
          { label: "Mint", value: truncateMint(mint) },
        ]}
      />

      {token.description ? (
        <p className="mt-8 font-medium text-greyText leading-relaxed">
          {token.description}
        </p>
      ) : null}

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link
          href="/assets?tab=dex"
          className="hover:border-b hover:border-greyText"
        >
          ← DEX
        </Link>
        <span className="mx-2">/</span>
        <Link href="/assets" className="hover:border-b hover:border-greyText">
          Invest
        </Link>
      </p>
    </main>
  );
};

export default DexTokenPage;
