import { profile } from "@/data/profile";

type MiscProps = {
  embedded?: boolean;
};

const Misc = ({ embedded = false }: MiscProps) => {
  return (
    <div className={embedded ? undefined : "mt-12"}>
      {!embedded && <h2 className="font-mono text-xs text-greyText">Misc.</h2>}

      <div className={embedded ? "mt-0" : "mt-4"}>
        <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
          <p className="font-mono text-xs text-greyText">Milestones</p>
          <p className="font-mono text-[11px] text-greyText">
            {profile.misc.length} entries
          </p>
        </div>

        <ul>
          {profile.misc.map((item, index) => (
            <li key={item.title} className="border-b border-outline">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              >
                <span className="inline-flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-[11px] text-greyText shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium leading-snug group-hover:text-greyText group-hover:underline group-hover:underline-offset-4 group-hover:decoration-outline">
                    {item.title}
                  </span>
                  <span
                    className="shrink-0 text-greyText opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden
                  >
                    ↗
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[11px] text-greyText">
                  {item.year}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Misc;
