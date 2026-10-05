"use client";

import { useMemo, useState } from "react";
import { formatUsd } from "@/lib/syra";

type SparklineProps = {
  values: number[];
  label: string;
  className?: string;
};

const WIDTH = 320;
const HEIGHT = 120;
const PAD = 8;

const Sparkline = ({ values, label, className }: SparklineProps) => {
  const [active, setActive] = useState<number | null>(null);

  const chart = useMemo(() => {
    if (values.length < 2) return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const last = values.length - 1;
    const points = values.map((value, i) => {
      const x = PAD + ((WIDTH - PAD * 2) * i) / last;
      const y = HEIGHT - PAD - ((value - min) / span) * (HEIGHT - PAD * 2);
      return { x, y, value };
    });
    return {
      points,
      path: points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "),
      up: values[last] >= values[0],
    };
  }, [values]);

  if (!chart) return null;

  const nearestIndex = (clientX: number, svg: SVGSVGElement) => {
    const rect = svg.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    const x = ((clientX - rect.left) / rect.width) * WIDTH;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < chart.points.length; i += 1) {
      const dist = Math.abs(chart.points[i].x - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  };

  const hover = active != null ? chart.points[active] : null;
  const tipLeft =
    hover == null
      ? "0%"
      : `${Math.min(88, Math.max(12, (hover.x / WIDTH) * 100))}%`;

  return (
    <figure className={`relative pt-8 ${className ?? ""}`}>
      <p
        className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-backgroundCard px-2 py-1 font-mono text-[11px] text-text ring-1 ring-outline transition-opacity duration-100"
        style={{
          left: tipLeft,
          opacity: hover ? 1 : 0,
        }}
        aria-live="polite"
      >
        {hover ? formatUsd(hover.value) : "—"}
      </p>

      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto text-text touch-pan-y cursor-crosshair"
        onPointerMove={(event) => {
          setActive(nearestIndex(event.clientX, event.currentTarget));
        }}
        onPointerLeave={() => setActive(null)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setActive(nearestIndex(event.clientX, event.currentTarget));
        }}
        onPointerUp={(event) => {
          try {
            event.currentTarget.releasePointerCapture(event.pointerId);
          } catch {
            /* ignore */
          }
        }}
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={chart.path}
          opacity={chart.up ? 1 : 0.75}
        />

        {hover ? (
          <>
            <line
              x1={hover.x}
              x2={hover.x}
              y1={PAD}
              y2={HEIGHT - PAD}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity={0.35}
            />
            <circle
              cx={hover.x}
              cy={hover.y}
              r="4"
              fill="rgb(var(--background))"
              stroke="currentColor"
              strokeWidth="2"
            />
          </>
        ) : null}

        {/* Wider hit area for easy hover on mobile/desktop */}
        <rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="transparent"
          aria-hidden
        />
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
};

export default Sparkline;
