import { profile } from "@/data/profile";

type ExperienceProps = {
  embedded?: boolean;
};

const proofForOrg = (org: string) => {
  const { syra, agentrail, s3labs } = profile.products;
  if (org === syra.name) {
    return [
      { label: "Site", href: syra.url },
      { label: "Docs", href: syra.docs },
      { label: "X", href: syra.x },
      { label: "GitHub", href: syra.github },
    ];
  }
  if (org === agentrail.name) {
    return [
      { label: "Site", href: agentrail.url },
      { label: "GitHub", href: agentrail.github },
    ];
  }
  if (org === s3labs.name) {
    return [{ label: "Site", href: s3labs.url }];
  }
  return [];
};

const Experience = ({ embedded = false }: ExperienceProps) => {
  return (
    <div className={embedded ? undefined : "mt-12"}>
      {!embedded && (
        <h2 className="font-mono text-xs text-greyText">Agents</h2>
      )}

      <div className={embedded ? "mt-0" : "mt-4"}>
        <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
          <p className="font-mono text-xs text-greyText">Now</p>
          <p className="font-mono text-[11px] text-greyText">
            {profile.workforce.agents} agents · {profile.workforce.humans}{" "}
            human
          </p>
        </div>

        <ul>
          {profile.roles.map((role) => {
            const proof = proofForOrg(role.org);

            return (
              <li key={role.org} className="border-b border-outline py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium leading-snug">
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-greyText hover:underline hover:underline-offset-4 hover:decoration-outline"
                    >
                      {role.org}
                      <span className="ml-1.5 text-greyText" aria-hidden>
                        ↗
                      </span>
                    </a>
                  </h3>
                  <p className="shrink-0 font-mono text-[11px] text-greyText">
                    {role.title}
                  </p>
                </div>
                <p className="mt-2 font-medium text-greyText leading-relaxed">
                  {role.description}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-greyText">
                  {proof.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text hover:underline hover:underline-offset-4"
                    >
                      {item.label}
                    </a>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
          <p className="font-mono text-xs text-greyText">Before agents</p>
          <p className="font-mono text-[11px] text-greyText">
            {profile.experience.length} stops
          </p>
        </div>

        <ul>
          {profile.experience.map((item, index) => {
            const content = (
              <div className="flex items-baseline justify-between gap-3">
                <span className="inline-flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-greyText">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium group-hover:text-greyText">
                    {item.name}
                  </span>
                  {item.url ? (
                    <span className="text-greyText opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      ↗
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-greyText">
                  {item.year}
                </span>
              </div>
            );

            return (
              <li key={item.name} className="border-b border-outline">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="py-4">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
