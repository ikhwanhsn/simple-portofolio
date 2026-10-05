"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  fetchInvestSummaries,
  formatPct,
  formatUsd,
  type DeskToken,
  type InvestSummary,
} from "@/lib/syra";

const tabs = [
  { id: "invest", label: "Invest" },
  { id: "dex", label: "DEX" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function parseTab(raw: string | null): TabId {
  return raw === "dex" ? "dex" : "invest";
}

function dexLabel(token: DeskToken & { pair?: string }) {
  if (token.pair?.trim()) return token.pair.trim();
  const symbol = token.symbol?.trim();
  if (symbol && symbol !== "?") return `${symbol}/SOL`;
  const name = token.name?.trim();
  if (name && name !== "?") return `${name}/SOL`;
  return `${token.mint.slice(0, 4)}…${token.mint.slice(-4)}`;
}

const AssetsTabs = () => {
  const baseId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = parseTab(searchParams.get("tab"));

  const [investRows, setInvestRows] = useState<InvestSummary[] | null>(null);
  const [investError, setInvestError] = useState<string | null>(null);
  const [dexTokens, setDexTokens] = useState<
    Array<
      DeskToken & {
        pair?: string;
        quoteSymbol?: string;
      }
    > | null
  >(null);
  const [dexError, setDexError] = useState<string | null>(null);
  const [dexLoading, setDexLoading] = useState(false);

  const loadInvest = useCallback(async () => {
    setInvestError(null);
    const out = await fetchInvestSummaries();
    if (!out.success) {
      setInvestRows(null);
      setInvestError("Couldn’t load prices from Syra.");
      return;
    }
    const anyPrice = out.rows.some((row) => row.priceUsd != null);
    setInvestRows(out.rows);
    setInvestError(
      anyPrice ? null : "Prices from Syra are delayed. Tickers still open."
    );
  }, []);

  const loadDex = useCallback(async () => {
    setDexLoading(true);
    setDexError(null);
    try {
      const res = await fetch("/api/meteora/portfolio", {
        headers: { Accept: "application/json" },
      });
      const body = (await res.json().catch(() => null)) as
        | {
            success: true;
            data: {
              tokens: Array<
                DeskToken & {
                  pair?: string;
                  quoteSymbol?: string;
                }
              >;
            };
          }
        | { success: false; error?: string }
        | null;
      if (!body || !body.success) {
        setDexTokens(null);
        setDexError("Couldn’t load Meteora positions.");
        return;
      }
      setDexTokens(body.data.tokens ?? []);
    } catch {
      setDexTokens(null);
      setDexError("Couldn’t load Meteora positions.");
    } finally {
      setDexLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInvest();
  }, [loadInvest]);

  useEffect(() => {
    if (active === "dex" && dexTokens == null && !dexLoading && !dexError) {
      void loadDex();
    }
  }, [active, dexError, dexLoading, dexTokens, loadDex]);

  const setTab = (id: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "invest") params.delete("tab");
    else params.set("tab", id);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <section className="mt-12">
      <nav
        className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-greyText border-b border-outline pb-3"
        role="tablist"
        aria-label="Asset sections"
      >
        {tabs.map((tab, index) => {
          const selected = active === tab.id;

          return (
            <span key={tab.id} className="inline-flex items-center gap-2">
              <button
                type="button"
                role="tab"
                id={`${baseId}-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                onClick={() => setTab(tab.id)}
                className={`cursor-pointer underline-offset-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text ${
                  selected
                    ? "font-bold text-text border-b border-text"
                    : "hover:text-text hover:border-b hover:border-greyText"
                }`}
              >
                {tab.label}
              </button>
              {index < tabs.length - 1 && <span aria-hidden>/</span>}
            </span>
          );
        })}
      </nav>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-${active}`}
        className="mt-6"
      >
        {active === "invest" ? (
          investRows == null && investError ? (
            <p className="font-medium text-greyText">
              {investError}{" "}
              <button
                type="button"
                onClick={() => void loadInvest()}
                className="text-text hover:border-b hover:border-greyText"
              >
                Retry
              </button>
            </p>
          ) : investRows == null ? (
            <p className="font-mono text-xs text-greyText">Loading prices…</p>
          ) : (
            <>
              {investError ? (
                <p className="mb-4 font-medium text-greyText">
                  {investError}{" "}
                  <button
                    type="button"
                    onClick={() => void loadInvest()}
                    className="text-text hover:border-b hover:border-greyText"
                  >
                    Retry
                  </button>
                </p>
              ) : null}
              <ul>
                {investRows.map((row) => (
                  <li key={row.id} className="border-b border-outline">
                    <Link
                      href={`/assets/invest/${row.id}`}
                      className="flex items-baseline justify-between gap-3 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                    >
                      <span>
                        <span className="font-medium">{row.ticker}</span>
                        <span className="ml-2 font-mono text-[11px] text-greyText">
                          {row.name}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-greyText">
                        {formatUsd(row.priceUsd)}
                        {row.priceChange24hPct != null ? (
                          <span className="ml-2">
                            {formatPct(row.priceChange24hPct)}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )
        ) : dexError ? (
          <p className="font-medium text-greyText">
            {dexError}{" "}
            <button
              type="button"
              onClick={() => {
                setDexError(null);
                void loadDex();
              }}
              className="text-text hover:border-b hover:border-greyText"
            >
              Retry
            </button>
          </p>
        ) : dexLoading || dexTokens == null ? (
          <p className="font-mono text-xs text-greyText">Loading tokens…</p>
        ) : dexTokens.length === 0 ? (
          <p className="font-medium text-greyText">
            No open Meteora DLMM positions right now.
          </p>
        ) : (
          <ul>
            {dexTokens.map((token, index) => (
              <li key={`${token.mint}-${index}`} className="border-b border-outline">
                <Link
                  href={`/assets/dex/${token.mint}`}
                  className="flex items-baseline justify-between gap-3 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                >
                  <span>
                    <span className="font-medium">{dexLabel(token)}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-greyText">
                    {formatUsd(token.priceUsd)}
                    {token.priceChange24hPct != null ? (
                      <span className="ml-2">
                        {formatPct(token.priceChange24hPct)}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AssetsTabs;
