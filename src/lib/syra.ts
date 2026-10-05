export const SYRA_API_BASE_URL =
  process.env.SYRA_API_BASE_URL?.replace(/\/$/, "") || "https://api.syraa.fun";

export const INVEST_ASSETS = [
  {
    id: "bitcoin",
    aliases: ["btc"],
    ticker: "BTC",
    name: "Bitcoin",
  },
  {
    id: "solana",
    aliases: ["sol"],
    ticker: "SOL",
    name: "Solana",
  },
  {
    id: "ripple",
    aliases: ["xrp"],
    ticker: "XRP",
    name: "XRP",
  },
] as const;

export type InvestAssetId = (typeof INVEST_ASSETS)[number]["id"];

export type SyraFail = {
  success: false;
  error: string;
};

export type CoinPriceMap = Record<string, { usd?: number }>;

export type SyraPriceOk = {
  success: true;
  data: {
    prices: CoinPriceMap;
    source?: string;
  };
};

export type SyraCoinOk = {
  success: true;
  data: {
    id: string;
    symbol: string;
    name: string;
    image: string | null;
    marketCapRank: number | null;
    priceUsd: number | null;
    priceChange24hPct: number | null;
    marketCapUsd: number | null;
    volume24hUsd: number | null;
    athUsd: number | null;
    atlUsd: number | null;
    solanaMint: string | null;
    source?: string;
  };
};

/** CoinGecko OHLC row: [timestampMs, open, high, low, close] */
export type OhlcRow = [number, number, number, number, number];

export type SyraOhlcOk = {
  success: true;
  data: {
    id: string;
    days: number;
    ohlc: OhlcRow[];
    source?: string;
  };
};

export type DeskToken = {
  mint: string;
  symbol: string;
  name: string;
  image: string | null;
  priceUsd: number | null;
  priceChange24hPct: number | null;
  volume24hUsd: number | null;
  marketCapUsd: number | null;
  liquidityUsd: number | null;
  sourceUrl: string | null;
  description?: string | null;
};

export type SyraDexListOk = {
  success: true;
  data: {
    source: string;
    mode?: string;
    tokens: DeskToken[];
    fetchedAt?: string;
  };
};

export type SyraDexTokenOk = {
  success: true;
  data: {
    source: string;
    sources?: string[];
    token: DeskToken;
    fetchedAt?: string;
  };
};

const ALLOWED_EXACT = new Set([
  "free/coingecko/price",
  "free/coingecko/ohlc",
  "free/coingecko/markets",
  "free/dexscreener/solana/boosted",
]);

export type MarketRow = {
  id?: string;
  symbol?: string;
  name?: string;
  current_price?: number | null;
  price_change_percentage_24h?: number | null;
  market_cap?: number | null;
  total_volume?: number | null;
  market_cap_rank?: number | null;
  ath?: number | null;
  atl?: number | null;
  image?: string | null;
};

export type SyraMarketsOk = {
  success: true;
  data: {
    markets: MarketRow[];
    source?: string;
  };
};

export type InvestSummary = {
  id: InvestAssetId;
  ticker: string;
  name: string;
  priceUsd: number | null;
  priceChange24hPct: number | null;
};

function finiteOrNull(n: unknown): number | null {
  if (typeof n === "string" && n.trim() !== "") {
    const parsed = Number(n);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

function marketToCoin(
  row: MarketRow,
  fallbackId: InvestAssetId
): SyraCoinOk["data"] {
  return {
    id: typeof row.id === "string" ? row.id : fallbackId,
    symbol:
      typeof row.symbol === "string" ? row.symbol.toUpperCase() : fallbackId,
    name:
      typeof row.name === "string" && row.name ? row.name : fallbackId,
    image: typeof row.image === "string" ? row.image : null,
    marketCapRank: finiteOrNull(row.market_cap_rank),
    priceUsd: finiteOrNull(row.current_price),
    priceChange24hPct: finiteOrNull(row.price_change_percentage_24h),
    marketCapUsd: finiteOrNull(row.market_cap),
    volume24hUsd: finiteOrNull(row.total_volume),
    athUsd: finiteOrNull(row.ath),
    atlUsd: finiteOrNull(row.atl),
    solanaMint: null,
    source: "markets",
  };
}

export function isLikelySolanaMint(s: string): boolean {
  const t = String(s || "").trim();
  if (t.length < 32 || t.length > 44) return false;
  return /^[1-9A-HJ-NP-Za-km-z]+$/.test(t);
}

export function isAllowedSyraPath(segments: string[]): boolean {
  if (segments.length === 0) return false;
  if (segments.some((part) => part.includes("..") || part.includes("\\"))) {
    return false;
  }
  const path = segments.join("/");
  if (ALLOWED_EXACT.has(path)) return true;

  if (
    segments.length === 4 &&
    segments[0] === "free" &&
    segments[1] === "coingecko" &&
    segments[2] === "coin"
  ) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segments[3]);
  }

  if (
    segments.length === 5 &&
    segments[0] === "free" &&
    segments[1] === "dexscreener" &&
    segments[2] === "solana" &&
    segments[3] === "token"
  ) {
    return isLikelySolanaMint(segments[4]);
  }

  return false;
}

export function resolveInvestAsset(raw: string) {
  const key = raw.trim().toLowerCase();
  return (
    INVEST_ASSETS.find(
      (asset) =>
        asset.id === key || (asset.aliases as readonly string[]).includes(key)
    ) ?? null
  );
}

export function investIdsQuery() {
  return INVEST_ASSETS.map((a) => a.id).join(",");
}

function buildSearch(search?: Record<string, string>) {
  if (!search) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value !== "") params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function syraFetchUrl(path: string, search?: Record<string, string>) {
  const clean = path.replace(/^\/+/, "");
  const qs = buildSearch(search);
  if (typeof window === "undefined") {
    return `${SYRA_API_BASE_URL}/${clean}${qs}`;
  }
  return `/api/syra/${clean}${qs}`;
}

async function parseJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function syraGet<T>(
  path: string,
  search?: Record<string, string>
): Promise<T | SyraFail> {
  const url = syraFetchUrl(path, search);
  try {
    const init: RequestInit & { next?: { revalidate: number } } = {
      method: "GET",
      headers: { Accept: "application/json" },
    };
    if (typeof window === "undefined") {
      init.next = { revalidate: 60 };
    }
    const res = await fetch(url, init);
    const body = await parseJson(res);
    if (body && typeof body === "object" && "success" in body) {
      return body as T | SyraFail;
    }
    if (!res.ok) {
      return { success: false, error: "upstream_unavailable" };
    }
    return { success: false, error: "invalid_response" };
  } catch {
    return { success: false, error: "network_error" };
  }
}

export async function fetchInvestMarkets() {
  return syraGet<SyraMarketsOk>("free/coingecko/markets", { per_page: "100" });
}

export async function fetchInvestPrices(): Promise<SyraPriceOk | SyraFail> {
  const prices = await syraGet<SyraPriceOk>("free/coingecko/price", {
    ids: investIdsQuery(),
  });
  const hasSpot =
    prices.success &&
    INVEST_ASSETS.some((asset) => finiteOrNull(prices.data.prices[asset.id]?.usd) != null);
  if (prices.success && hasSpot) return prices;

  const markets = await fetchInvestMarkets();
  if (!markets.success) {
    return prices.success
      ? prices
      : { success: false, error: prices.error };
  }

  const mapped: CoinPriceMap = {};
  for (const asset of INVEST_ASSETS) {
    const row = markets.data.markets.find((item) => item.id === asset.id);
    const usd = finiteOrNull(row?.current_price);
    if (usd != null) mapped[asset.id] = { usd };
  }
  if (Object.keys(mapped).length === 0) {
    return prices.success
      ? prices
      : { success: false, error: "coingecko_unavailable" };
  }
  return {
    success: true,
    data: { prices: mapped, source: markets.data.source ?? "markets" },
  };
}

export async function fetchInvestSummaries(): Promise<
  { success: true; rows: InvestSummary[] } | SyraFail
> {
  const markets = await fetchInvestMarkets();
  if (markets.success) {
    const rows: InvestSummary[] = INVEST_ASSETS.map((asset) => {
      const row = markets.data.markets.find((item) => item.id === asset.id);
      return {
        id: asset.id,
        ticker: asset.ticker,
        name: asset.name,
        priceUsd: finiteOrNull(row?.current_price),
        priceChange24hPct: finiteOrNull(row?.price_change_percentage_24h),
      };
    });
    if (rows.some((row) => row.priceUsd != null)) {
      return { success: true, rows };
    }
  }

  const prices = await fetchInvestPrices();
  if (!prices.success) {
    return { success: false, error: prices.error };
  }
  return {
    success: true,
    rows: INVEST_ASSETS.map((asset) => ({
      id: asset.id,
      ticker: asset.ticker,
      name: asset.name,
      priceUsd: finiteOrNull(prices.data.prices[asset.id]?.usd),
      priceChange24hPct: null,
    })),
  };
}

export async function fetchInvestCoin(
  id: InvestAssetId
): Promise<SyraCoinOk | SyraFail> {
  const coin = await syraGet<SyraCoinOk>(`free/coingecko/coin/${id}`);
  if (coin.success && finiteOrNull(coin.data.priceUsd) != null) return coin;

  const markets = await fetchInvestMarkets();
  if (!markets.success) {
    return coin.success ? coin : { success: false, error: coin.error };
  }
  const row = markets.data.markets.find((item) => item.id === id);
  if (!row) {
    return coin.success ? coin : { success: false, error: "coin_not_found" };
  }
  return { success: true, data: marketToCoin(row, id) };
}

export async function fetchInvestOhlc(id: InvestAssetId, days = "30") {
  return syraGet<SyraOhlcOk>("free/coingecko/ohlc", { id, days });
}

export async function fetchDexBoosted(limit = 20) {
  return syraGet<SyraDexListOk>("free/dexscreener/solana/boosted", {
    mode: "latest",
    limit: String(limit),
  });
}

export async function fetchDexToken(mint: string) {
  return syraGet<SyraDexTokenOk>(
    `free/dexscreener/solana/token/${encodeURIComponent(mint)}`
  );
}

export function formatUsd(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 2 : abs >= 0.01 ? 4 : 6;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatCompactUsd(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function ohlcCloses(rows: OhlcRow[] | unknown): number[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      if (!Array.isArray(row) || row.length < 5) return null;
      const close = Number(row[4]);
      return Number.isFinite(close) ? close : null;
    })
    .filter((n): n is number => n != null);
}
