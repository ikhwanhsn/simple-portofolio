import { profile } from "@/data/profile";

type SkillsProps = {
  embedded?: boolean;
};

const skillLinks: Record<string, string> = {
  "Next.js": "https://nextjs.org/",
  React: "https://react.dev/",
  TypeScript: "https://www.typescriptlang.org/",
  Tailwind: "https://tailwindcss.com/",
  Solana: "https://solana.com/",
  x402: "https://www.x402.org/",
  MCP: "https://modelcontextprotocol.io/",
  "AI Agents": "https://www.syraa.fun/",
  Wagmi: "https://wagmi.sh/",
  RainbowKit: "https://www.rainbowkit.com/",
  Ethers: "https://docs.ethers.org/",
  "web3.js": "https://solana.com/docs/clients/javascript",
  Redux: "https://redux.js.org/",
  Zustand: "https://zustand-demo.pmnd.rs/",
  "Node.js": "https://nodejs.org/",
  Express: "https://expressjs.com/",
  MongoDB: "https://www.mongodb.com/",
};

const Skills = ({ embedded = false }: SkillsProps) => {
  return (
    <div className={embedded ? undefined : "mt-14"}>
      {!embedded && (
        <h2 className="font-mono text-xs text-greyText">Tech Stack</h2>
      )}

      <div className={embedded ? "mt-0" : "mt-4"}>
        <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
          <p className="font-mono text-xs text-greyText">Stack</p>
          <p className="font-mono text-[11px] text-greyText">
            {profile.skills.length} groups
          </p>
        </div>

        <ul>
          {profile.skills.map((group, index) => (
            <li key={group.category} className="border-b border-outline py-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="inline-flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-greyText">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-medium">{group.category}</h3>
                </span>
                <span className="font-mono text-[11px] text-greyText">
                  {group.items.length} tools
                </span>
              </div>
              <ul className="mt-3 pl-8 flex flex-wrap gap-x-3 gap-y-2">
                {group.items.map((item) => {
                  const href = skillLinks[item];
                  const className =
                    "font-mono text-xs text-greyText underline-offset-4 hover:text-text hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text";

                  return (
                    <li key={item}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          {item}
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-greyText">
                          {item}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
