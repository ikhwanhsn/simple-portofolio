import { isLikelySolanaMint, type DeskToken } from "@/lib/syra";

const METEORA_BASE = "https://dlmm.datapi.meteora.ag";
const DEXSCREENER_TOKENS = "https://api.dexscreener.com/latest/dex/tokens";
const WSOL = "So11111111111111111111111111111111111111112";

export type MeteoraDeskToken = DeskToken & {
  pair: string;
  quoteSymbol: string;
};

type MeteoraPool = {
  poolAddress?: string;
  tokenXMint?: string;
  tokenYMint?: string;
  tokenX?: unknown;
  tokenY?: unknown;
  balances?: string | number;
  pnl?: string | number;
  pnlPctChange?: string | number;
};

type MeteoraOpenBody = {
  hasNext?: boolean;
  pools?: MeteoraPool[];
};

function ownerWallet(): string | null {
  const value = process.env.METEORA_OWNER_WALLET?.trim() ?? "";
  if (!isLikelySolanaMint(value)) return null;
  return value;
}

function finite(n: unknown): number | null {
  const v = typeof n === "number" ? n : Number(n);
  return Number.isFinite(v) ? v : null;
}

function tokenSymbol(raw: unknown): string {
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (raw && typeof raw === "object") {
    const o = raw as { symbol?: unknown; name?: unknown };
    if (typeof o.symbol === "string" && o.symbol.trim()) return o.symbol.trim();
    if (typeof o.name === "string" && o.name.trim()) return o.name.trim();
  }
  return "";
}

function pickPair(pool: MeteoraPool): {
  mint: string;
  symbol: string;
  quoteSymbol: string;
} | null {
  const xMint = String(pool.tokenXMint || "").trim();
  const yMint = String(pool.tokenYMint || "").trim();
  const xSym = tokenSymbol(pool.tokenX);
  const ySym = tokenSymbol(pool.tokenY);
  const xIsSol = xMint === WSOL || xSym.toUpperCase() === "SOL";
  const mint = xIsSol ? yMint : xMint;
  const symbol = xIsSol ? ySym : xSym;
  const quoteSymbol = xIsSol ? xSym || "SOL" : ySym || "SOL";
  if (!isLikelySolanaMint(mint)) return null;
  return {
    mint,
    symbol: symbol || mint.slice(0, 4),
    quoteSymbol: quoteSymbol || "SOL",
  };
}

async function fetchOpenPage(
  wallet: string,
  page: number
): Promise<MeteoraOpenBody | null> {
  const q = new URLSearchParams({
    user: wallet,
    page: String(page),
    page_size: "50",
  });
  try {
    const res = await fetch(`${METEORA_BASE}/portfolio/open?${q.toString()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ikhwanhsn.site/assets",
      },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as MeteoraOpenBody;
  } catch {
    return null;
  }
}

async function enrichPrices(
  tokens: MeteoraDeskToken[]
): Promise<MeteoraDeskToken[]> {
  if (tokens.length === 0) return tokens;
  const byMint = new Map(
    tokens.map((token) => [
      token.mint,
      {
        priceUsd: null as number | null,
        priceChange24hPct: null as number | null,
      },
    ])
  );

  for (let i = 0; i < tokens.length; i += 25) {
    const batch = tokens.slice(i, i + 25).map((t) => t.mint);
    try {
      const res = await fetch(
        `${DEXSCREENER_TOKENS}/${batch.map(encodeURIComponent).join(",")}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "ikhwanhsn.site/assets",
          },
          signal: AbortSignal.timeout(12_000),
          next: { revalidate: 60 },
        }
      );
      if (!res.ok) continue;
      const body = (await res.json()) as { pairs?: unknown };
      const pairs = Array.isArray(body?.pairs) ? body.pairs : [];
      const best = new Map<
        string,
        { liq: number; priceUsd: number | null; change: number | null }
      >();

      for (const pair of pairs) {
        if (!pair || typeof pair !== "object") continue;
        const p = pair as Record<string, unknown>;
        if (p.chainId !== "solana") continue;
        const base =
          p.baseToken && typeof p.baseToken === "object"
            ? (p.baseToken as Record<string, unknown>)
            : null;
        const mint = typeof base?.address === "string" ? base.address : "";
        if (!byMint.has(mint)) continue;
        const liqObj =
          p.liquidity && typeof p.liquidity === "object"
            ? (p.liquidity as Record<string, unknown>)
            : {};
        const changeObj =
          p.priceChange && typeof p.priceChange === "object"
            ? (p.priceChange as Record<string, unknown>)
            : {};
        const liq = finite(liqObj.usd) ?? 0;
        const prev = best.get(mint);
        if (prev && prev.liq >= liq) continue;
        best.set(mint, {
          liq,
          priceUsd: finite(p.priceUsd),
          change: finite(changeObj.h24),
        });
      }

      for (const [mint, hit] of Array.from(best.entries())) {
        byMint.set(mint, {
          priceUsd: hit.priceUsd,
          priceChange24hPct: hit.change,
        });
      }
    } catch {
      /* best-effort enrichment */
    }
  }

  return tokens.map((token) => {
    const hit = byMint.get(token.mint);
    return {
      ...token,
      priceUsd: hit?.priceUsd ?? token.priceUsd,
      priceChange24hPct: hit?.priceChange24hPct ?? token.priceChange24hPct,
    };
  });
}

export async function fetchMeteoraDexTokens(): Promise<
  | { success: true; tokens: MeteoraDeskToken[] }
  | { success: false; error: string }
> {
  const wallet = ownerWallet();
  if (!wallet) return { success: false, error: "meteora_unconfigured" };

  const byMint = new Map<string, MeteoraDeskToken & { _bal: number }>();

  for (let page = 1; page <= 4; page += 1) {
    const body = await fetchOpenPage(wallet, page);
    if (!body) {
      if (page === 1) return { success: false, error: "meteora_unavailable" };
      break;
    }
    for (const pool of body.pools ?? []) {
      const pair = pickPair(pool);
      if (!pair) continue;
      const bal = finite(pool.balances) ?? 0;
      const existing = byMint.get(pair.mint);
      if (existing) {
        existing._bal += bal;
        continue;
      }
      byMint.set(pair.mint, {
        mint: pair.mint,
        symbol: pair.symbol,
        name: pair.symbol,
        pair: `${pair.symbol}/${pair.quoteSymbol}`,
        quoteSymbol: pair.quoteSymbol,
        image: null,
        priceUsd: null,
        priceChange24hPct: null,
        volume24hUsd: null,
        marketCapUsd: null,
        liquidityUsd: finite(pool.balances),
        sourceUrl: pool.poolAddress
          ? `https://app.meteora.ag/dlmm/${pool.poolAddress}`
          : null,
        _bal: bal,
      });
    }
    if (!body.hasNext) break;
  }

  const baseTokens: MeteoraDeskToken[] = Array.from(byMint.values())
    .sort((a, b) => b._bal - a._bal)
    .map((row) => ({
      mint: row.mint,
      symbol: row.symbol,
      name: row.name,
      pair: row.pair,
      quoteSymbol: row.quoteSymbol,
      image: row.image,
      priceUsd: row.priceUsd,
      priceChange24hPct: row.priceChange24hPct,
      volume24hUsd: row.volume24hUsd,
      marketCapUsd: row.marketCapUsd,
      liquidityUsd: row.liquidityUsd,
      sourceUrl: row.sourceUrl,
    }));

  return { success: true, tokens: await enrichPrices(baseTokens) };
}
