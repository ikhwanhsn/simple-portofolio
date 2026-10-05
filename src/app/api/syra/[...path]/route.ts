import { NextRequest, NextResponse } from "next/server";
import {
  isAllowedSyraPath,
  SYRA_API_BASE_URL,
} from "@/lib/syra";

export const revalidate = 60;

const FAIL = (status: number, error: string) =>
  NextResponse.json({ success: false, error }, { status });

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const segments = params.path ?? [];
  if (!isAllowedSyraPath(segments)) {
    return FAIL(404, "not_allowed");
  }

  const upstream = new URL(`${SYRA_API_BASE_URL}/${segments.join("/")}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });

  try {
    const res = await fetch(upstream.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    const text = await res.text();
    let body: unknown = { success: false, error: "invalid_response" };
    if (text) {
      try {
        body = JSON.parse(text) as unknown;
      } catch {
        return FAIL(502, "invalid_response");
      }
    }

    const status = res.ok ? 200 : res.status >= 400 && res.status < 600 ? res.status : 502;
    const payload =
      body && typeof body === "object"
        ? body
        : { success: false, error: "invalid_response" };

    if (
      typeof payload === "object" &&
      payload !== null &&
      "success" in payload &&
      (payload as { success?: unknown }).success === false &&
      !("error" in payload)
    ) {
      return NextResponse.json(
        { success: false, error: "upstream_error" },
        { status }
      );
    }

    return NextResponse.json(payload, {
      status: status === 200 ? 200 : Math.min(status, 502),
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return FAIL(502, "upstream_unavailable");
  }
}
