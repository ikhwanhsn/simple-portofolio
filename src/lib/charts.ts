import { isLikelySolanaMint, ohlcCloses, type InvestAssetId } from "@/lib/syra";

const DEXSCREENER_TOKENS = "https://api.dexscreener.com/latest/dex/tokens";
const GECKO_POOL_OHLCV =
  "https://api.geckoterminal.com/api/v2/networks/solana/pools";
const BINANCE_KLINES = "https://api.binance.com/api/v3/klines";

const WSOL = "So11111111111111111111111111111111111111112";
const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const USDT = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";

const BINANCE_SYMBOL: Record<InvestAssetId, string> = {
  bitcoin: "BTCUSDT",
  solana: "SOLUSDT",
  ripple: "XRPUSDT",
};

const FETCH_MS = 12_000;
const HEADERS = {
  Accept: "application/json",
  "User-Agent": "ikhwanhsn.site/assets-chart",
};

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(FETCH_MS),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

function finite(n: unknown): number | null {
  const v = typeof n === "number" ? n : Number(n);
  return Number.isFinite(v) ? v : null;
}

function quoteRank(quoteAddress: string | undefined, quoteSymbol: string | undefined) {
  const addr = quoteAddress ?? "";
  const sym = (quoteSymbol ?? "").toUpperCase();
  if (addr === USDC || addr === USDT || ["USDC", "USDT", "USD1"].includes(sym)) {
    return 0;
  }
  if (addr === WSOL || sym === "SOL" || sym === "WSOL") return 1;
  return 2;
}

function bestSolanaPairAddress(body: unknown): string | null {
  const pairs = Array.isArray((body as { pairs?: unknown })?.pairs)
    ? ((body as { pairs: unknown[] }).pairs)
    : Array.isArray(body)
      ? body
      : [];

  let best: { address: string; rank: number; liq: number } | null = null;
  for (const pair of pairs) {
    if (!pair || typeof pair !== "object") continue;
    const p = pair as Record<string, unknown>;
    if (p.chainId !== "solana") continue;
    const address = typeof p.pairAddress === "string" ? p.pairAddress : "";
    if (!address) continue;
    const quote =
      p.quoteToken && typeof p.quoteToken === "object"
        ? (p.quoteToken as Record<string, unknown>)
        : {};
    const liqObj =
      p.liquidity && typeof p.liquidity === "object"
        ? (p.liquidity as Record<string, unknown>)
        : {};
    const liq = finite(liqObj.usd) ?? 0;
    const rank = quoteRank(
      typeof quote.address === "string" ? quote.address : undefined,
      typeof quote.symbol === "string" ? quote.symbol : undefined
    );
    if (
      !best ||
      rank < best.rank ||
      (rank === best.rank && liq > best.liq)
    ) {
      best = { address, rank, liq };
    }
  }
  return best?.address ?? null;
}

function closesFromGeckoList(list: unknown): number[] {
  if (!Array.isArray(list)) return [];
  const closes: number[] = [];
  for (const row of list) {
    if (!Array.isArray(row) || row.length < 5) continue;
    const close = finite(row[4]);
    if (close != null && close > 0) closes.push(close);
  }
  return closes;
}

export async function fetchDexUsdCloses(mint: string): Promise<number[]> {
  if (!isLikelySolanaMint(mint)) return [];
  const dex = await fetchJson(`${DEXSCREENER_TOKENS}/${encodeURIComponent(mint)}`);
  const pool = bestSolanaPairAddress(dex);
  if (!pool) return [];

  const usd = await fetchJson(
    `${GECKO_POOL_OHLCV}/${encodeURIComponent(pool)}/ohlcv/hour?aggregate=1&limit=168&currency=usd`
  );
  const usdAttrs =
    usd && typeof usd === "object"
      ? ((usd as { data?: { attributes?: { ohlcv_list?: unknown } } }).data
          ?.attributes?.ohlcv_list)
      : null;
  const usdCloses = closesFromGeckoList(usdAttrs);
  if (usdCloses.length >= 2) return usdCloses;

  const quote = await fetchJson(
    `${GECKO_POOL_OHLCV}/${encodeURIComponent(pool)}/ohlcv/hour?aggregate=1&limit=168`
  );
  const quoteAttrs =
    quote && typeof quote === "object"
      ? ((quote as { data?: { attributes?: { ohlcv_list?: unknown } } }).data
          ?.attributes?.ohlcv_list)
      : null;
  return closesFromGeckoList(quoteAttrs);
}

export async function fetchInvestUsdCloses(
  id: InvestAssetId,
  syraOhlc: unknown
): Promise<number[]> {
  const fromSyra = ohlcCloses(syraOhlc);
  if (fromSyra.length >= 2) return fromSyra;

  const symbol = BINANCE_SYMBOL[id];
  const body = await fetchJson(
    `${BINANCE_KLINES}?symbol=${symbol}&interval=1d&limit=30`
  );
  if (!Array.isArray(body)) return [];
  return body
    .map((row) => {
      if (!Array.isArray(row) || row.length < 5) return null;
      return finite(row[4]);
    })
    .filter((n): n is number => n != null && n > 0);
}
