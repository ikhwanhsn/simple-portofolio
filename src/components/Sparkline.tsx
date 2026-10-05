type SparklineProps = {
  values: number[];
  label: string;
  className?: string;
};

const Sparkline = ({ values, label, className }: SparklineProps) => {
  if (values.length < 2) return null;

  const width = 320;
  const height = 120;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const points = values
    .map((value, i) => {
      const x =
        pad + ((width - pad * 2) * i) / Math.max(values.length - 1, 1);
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const up = values[values.length - 1] >= values[0];

  return (
    <figure className={className}>
      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-text"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
          opacity={up ? 1 : 0.7}
        />
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
};

export default Sparkline;
