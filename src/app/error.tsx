"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mt-16 mb-20">
      <div className="flex items-center gap-2 text-greyText">
        <BrandMark className="size-5" />
        <p className="font-mono text-xs">500 · something broke</p>
      </div>

      <h1 className="mt-4 font-medium text-2xl tracking-tight">
        Agent hit an unexpected error.
      </h1>
      <p className="mt-3 font-medium text-greyText leading-relaxed">
        The request failed mid-run. Retry the surface, or head back to a known
        route while the agents regroup.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-greyText">
        <button
          type="button"
          onClick={reset}
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Try again
        </button>
        <Link
          href="/"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          About
        </Link>
        <Link
          href="/blog"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Blog
        </Link>
      </div>
    </main>
  );
}
