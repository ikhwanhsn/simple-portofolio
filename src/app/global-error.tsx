"use client";

import { GeistSans } from "geist/font/sans";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased min-h-screen bg-[#fafafa] text-[#111113]`}
      >
        <main className="mx-auto max-w-lg px-5 pt-24 sm:px-0">
          <p className="font-mono text-xs text-[#6b6b70]">500 · root failure</p>
          <h1 className="mt-4 text-2xl font-medium tracking-tight">
            Something went wrong at the root.
          </h1>
          <p className="mt-3 font-medium leading-relaxed text-[#6b6b70]">
            A critical render failed before the app shell loaded. Retry, or
            reload the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 font-mono text-xs text-[#6b6b70] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111113]"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
