import { isLikelySolanaMint, type DeskToken } from "@/lib/syra";

const METEORA_BASE = "https://dlmm.datapi.meteora.ag";
const WSOL = "So11111111111111111111111111111111111111112";

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

function pickBase(pool: MeteoraPool): { mint: string; symbol: string } | null {
  const xMint = String(pool.tokenXMint || "").trim();
  const yMint = String(pool.tokenYMint || "").trim();
  const xSym = tokenSymbol(pool.tokenX);
  const ySym = tokenSymbol(pool.tokenY);
  const xIsSol = xMint === WSOL || xSym.toUpperCase() === "SOL";
  const mint = xIsSol ? yMint : xMint;
  const symbol = xIsSol ? ySym : xSym;
  if (!isLikelySolanaMint(mint)) return null;
  return { mint, symbol: symbol || mint.slice(0, 4) };
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

export async function fetchMeteoraDexTokens(): Promise<
  { success: true; tokens: DeskToken[] } | { success: false; error: string }
> {
  const wallet = ownerWallet();
  if (!wallet) return { success: false, error: "meteora_unconfigured" };

  const byMint = new Map<string, DeskToken & { _bal: number }>();

  for (let page = 1; page <= 4; page += 1) {
    const body = await fetchOpenPage(wallet, page);
    if (!body) {
      if (page === 1) return { success: false, error: "meteora_unavailable" };
      break;
    }
    for (const pool of body.pools ?? []) {
      const base = pickBase(pool);
      if (!base) continue;
      const bal = finite(pool.balances) ?? 0;
      const existing = byMint.get(base.mint);
      if (existing) {
        existing._bal += bal;
        continue;
      }
      byMint.set(base.mint, {
        mint: base.mint,
        symbol: base.symbol,
        name: base.symbol,
        image: null,
        priceUsd: null,
        priceChange24hPct: finite(pool.pnlPctChange),
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

  const tokens: DeskToken[] = Array.from(byMint.values())
    .sort((a, b) => b._bal - a._bal)
    .map((row) => ({
      mint: row.mint,
      symbol: row.symbol,
      name: row.name,
      image: row.image,
      priceUsd: row.priceUsd,
      priceChange24hPct: row.priceChange24hPct,
      volume24hUsd: row.volume24hUsd,
      marketCapUsd: row.marketCapUsd,
      liquidityUsd: row.liquidityUsd,
      sourceUrl: row.sourceUrl,
    }));

  return { success: true, tokens };
}
