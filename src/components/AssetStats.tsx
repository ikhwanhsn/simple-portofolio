import type { ReactNode } from "react";

type Stat = {
  label: string;
  value: ReactNode;
};

const AssetStats = ({ stats }: { stats: Stat[] }) => {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="font-mono text-[11px] text-greyText">{stat.label}</dt>
          <dd className="mt-1 font-medium">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default AssetStats;
