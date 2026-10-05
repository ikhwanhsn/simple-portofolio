import { NextResponse } from "next/server";
import { fetchMeteoraDexTokens } from "@/lib/meteora";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const out = await fetchMeteoraDexTokens();
  if (!out.success) {
    return NextResponse.json(
      { success: false, error: "unavailable" },
      { status: 502 }
    );
  }
  return NextResponse.json(
    {
      success: true,
      data: {
        source: "meteora",
        tokens: out.tokens.map((token) => ({
          mint: token.mint,
          symbol: token.symbol,
          name: token.name,
        })),
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
