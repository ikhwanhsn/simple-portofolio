import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssetStats from "@/components/AssetStats";
import Sparkline from "@/components/Sparkline";
import { SITE_URL } from "@/data/profile";
import {
  fetchInvestCoin,
  fetchInvestOhlc,
  formatCompactUsd,
  formatPct,
  formatUsd,
  INVEST_ASSETS,
  ohlcCloses,
  resolveInvestAsset,
  type InvestAssetId,
} from "@/lib/syra";

export const revalidate = 60;

type PageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return INVEST_ASSETS.map((asset) => ({ id: asset.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const asset = resolveInvestAsset(params.id);
  if (!asset) {
    return { title: "Asset" };
  }
  return {
    title: `${asset.ticker} · Assets`,
    description: `${asset.name} public market data via Syra.`,
    alternates: { canonical: `${SITE_URL}/assets/invest/${asset.id}` },
  };
}

const InvestAssetPage = async ({ params }: PageProps) => {
  const asset = resolveInvestAsset(params.id);
  if (!asset) notFound();

  const id = asset.id as InvestAssetId;
  const [coin, ohlc] = await Promise.all([
    fetchInvestCoin(id),
    fetchInvestOhlc(id, "30"),
  ]);

  const data = coin.success ? coin.data : null;
  const closes = ohlc.success ? ohlcCloses(ohlc.data.ohlc) : [];
  const price = data?.priceUsd ?? null;

  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">
        <Link href="/assets" className="hover:border-b hover:border-greyText">
          Assets
        </Link>
        <span className="mx-2">/</span>
        Invest
      </p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        {asset.ticker}
      </h1>
      <p className="mt-2 font-medium text-greyText">{asset.name}</p>
      <p className="mt-4 font-medium text-xl tracking-tight">
        {formatUsd(price)}
        {data?.priceChange24hPct != null ? (
          <span className="ml-3 font-mono text-sm text-greyText">
            {formatPct(data.priceChange24hPct)}
          </span>
        ) : null}
      </p>

      {closes.length >= 2 ? (
        <div className="mt-8 border-b border-outline pb-6">
          <p className="font-mono text-[11px] text-greyText mb-3">
            30-day close
          </p>
          <Sparkline
            values={closes}
            label={`${asset.ticker} closing prices, last 30 days`}
          />
        </div>
      ) : (
        <p className="mt-8 font-medium text-greyText">
          Chart candles aren’t available for this coin right now.
        </p>
      )}

      {!coin.success ? (
        <p className="mt-8 font-medium text-greyText">
          Couldn’t load coin stats from Syra.
        </p>
      ) : (
        <AssetStats
          stats={[
            { label: "Price", value: formatUsd(data?.priceUsd) },
            { label: "24h", value: formatPct(data?.priceChange24hPct) },
            { label: "Market cap", value: formatCompactUsd(data?.marketCapUsd) },
            { label: "Volume 24h", value: formatCompactUsd(data?.volume24hUsd) },
            {
              label: "Rank",
              value:
                data?.marketCapRank != null ? `#${data.marketCapRank}` : "—",
            },
            { label: "ATH", value: formatUsd(data?.athUsd) },
          ]}
        />
      )}

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link
          href="/assets"
          className="hover:border-b hover:border-greyText"
        >
          ← Assets
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/assets?tab=dex"
          className="hover:border-b hover:border-greyText"
        >
          DEX
        </Link>
      </p>
    </main>
  );
};

export default InvestAssetPage;
