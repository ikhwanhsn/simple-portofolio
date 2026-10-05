"use client";

import { useState } from "react";

type TokenMintActionsProps = {
  mint: string;
  label: string;
};

function truncateMint(mint: string) {
  return `${mint.slice(0, 6)}…${mint.slice(-6)}`;
}

const TokenMintActions = ({ mint, label }: TokenMintActionsProps) => {
  const [copied, setCopied] = useState(false);
  const gmgn = `https://gmgn.ai/sol/token/${encodeURIComponent(mint)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mint);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      <button
        type="button"
        onClick={() => void copy()}
        className="font-medium text-left min-h-10 hover:text-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        aria-label={copied ? `${label} copied` : `Copy ${label} mint`}
      >
        {copied ? "Copied" : truncateMint(mint)}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Mint copied" : ""}
      </span>
      <a
        href={gmgn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${label} on GMGN`}
        className="inline-flex items-center justify-center min-h-10 min-w-10 text-greyText hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
      >
        <span aria-hidden>↗</span>
      </a>
    </span>
  );
};

export default TokenMintActions;
