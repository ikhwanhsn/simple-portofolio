export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  label?: string;
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "scale-with-agents-not-headcount",
    title: "Scale with agents, not headcount",
    date: "2026-08-09",
    displayDate: "Aug 9, 2026",
    label: "Thesis",
    summary:
      "Why I run a company as one human with agents as the workforce, and how Syra AI and S3Labs fit that model.",
    sections: [
      {
        paragraphs: [
          "Most companies still scale by hiring. More people, more managers, more process. I take a different path: one human at the center, agents as the workforce. The goal is a multi-billion-dollar company without a traditional org chart.",
          "Headcount is optional. Agents are not. When a product can research, ship, earn, and execute, you do not need a floor of desks to grow. You need clear direction, strong systems, and software that compounds while you sleep.",
        ],
      },
      {
        heading: "What this looks like in practice",
        paragraphs: [
          "Syra AI is machine money on Solana: Earn, Treasury, Invest, Spend, Grow. It gives autonomous agents the rails to hold and move capital with x402 pay-per-call APIs, MCP, and a typed SDK. That is the financial layer of an agent-native company.",
          "S3Labs is the AI-powered Web3 ecosystem. Products, opportunities, community, and tools so builders can discover, ship, and earn faster with AI agents. That is the distribution and product layer.",
        ],
      },
      {
        heading: "Why agents beat headcount for this work",
        paragraphs: [
          "Agents do not wait for standup. They do not need layers of approval for every small task. You still own judgment, taste, and strategy. The agents own repetition, monitoring, research, and execution. That split is how one person stays in control while output scales.",
          "This is not about replacing every human role forever. It is about refusing to grow like a 2015 startup when the tools of 2026 can carry most of the load. If a workflow can be specified, instrumented, and paid for onchain, an agent can run it.",
        ],
      },
      {
        heading: "The thesis",
        paragraphs: [
          "Scale with agents, not headcount. Build products that are themselves the team. Direct them well. Keep the human count at one until the economics demand otherwise, and even then prefer leverage over layers.",
          "That is how I am building. If you are building agent-native products on Solana or Web3, you already know why this matters.",
        ],
      },
    ],
  },
  {
    slug: "machine-money-for-agents",
    title: "Machine money for agents",
    date: "2026-07-22",
    displayDate: "Jul 22, 2026",
    summary:
      "What Syra AI is building: Earn, Treasury, Invest, Spend, and Grow as financial infrastructure for autonomous agents on Solana.",
    sections: [
      {
        paragraphs: [
          "Most AI agents can reason. Very few can operate economically. They generate text, call tools, and stop at the edge of money. That gap is the product opportunity.",
          "Syra AI exists to close it. Machine money means agents can earn, allocate treasury, invest, spend, and grow capital on Solana without a human approving every step.",
        ],
      },
      {
        heading: "Five pillars, one stack",
        paragraphs: [
          "Earn covers monetization for prompts, skills, and campaigns. Treasury covers wallets, caps, and allocation. Invest covers policy-gated participation in DeFi. Spend covers x402 pay-per-call access to intelligence and tools. Grow covers portfolio and yield analysis.",
          "Wealth is the narrative. x402 is one module inside Spend, not the whole product. The point is a complete operating system for agent capital.",
        ],
      },
      {
        heading: "Why this matters now",
        paragraphs: [
          "Agent usage is rising faster than billing systems built for humans. API keys and invoices do not fit machines that make thousands of micro-decisions a day. Settlement that is fast, programmable, and onchain does.",
          "If you are building agents that need to pay for data, execute trades, or manage treasury, machine money is not a feature. It is infrastructure.",
        ],
      },
    ],
  },
  {
    slug: "x402-and-paid-agent-apis",
    title: "x402 and paid agent APIs",
    date: "2026-06-18",
    displayDate: "Jun 18, 2026",
    summary:
      "How pay-per-call crypto APIs change agent economics, and why x402 fits Solana-native products like Syra.",
    sections: [
      {
        paragraphs: [
          "For years, APIs were guarded by keys and monthly plans. That model assumes a human operator, a procurement cycle, and stable usage. Agents break all three assumptions.",
          "x402 flips the pattern. A service can require payment at the moment of use. The client settles, retries, and continues. No shared secret. No invoice chase.",
        ],
      },
      {
        heading: "What changes for builders",
        paragraphs: [
          "You can price intelligence per call. You can open endpoints to any agent with a funded wallet. You can measure real demand instead of guessing seat counts.",
          "On Solana, settlement is fast enough for this loop to feel native. That is why Syra ships spend flows with x402, MCP, and a typed SDK as first-class surfaces.",
        ],
      },
      {
        heading: "Design principles I use",
        paragraphs: [
          "Keep payment non-custodial. Make failure modes explicit. Price for machines, not for dashboards. Document the happy path in minutes, not days.",
          "Paid APIs are not just monetization. They are coordination. When agents can discover and buy capability on demand, the network gets denser.",
        ],
      },
    ],
  },
  {
    slug: "why-solana-for-the-agent-economy",
    title: "Why Solana for the agent economy",
    date: "2026-05-12",
    displayDate: "May 12, 2026",
    summary:
      "Latency, fees, and composability: the practical reasons I build agent financial infrastructure on Solana.",
    sections: [
      {
        paragraphs: [
          "Agents are high-frequency operators. They check state, call tools, and act again. A chain that makes every step expensive or slow will push builders back to centralized wallets and offchain ledgers.",
          "Solana fits the agent economy because it supports real-time settlement and composable DeFi at a cost profile that matches machine usage.",
        ],
      },
      {
        heading: "What I optimize for",
        paragraphs: [
          "Speed for closed-loop decisions. Low fees for micro-payments. Shared liquidity and routing for invest and spend flows. An ecosystem where agents can plug into existing markets instead of inventing parallel ones.",
          "That combination is why Syra is Solana-native, and why S3Labs focuses on Web3 products that can actually ship in this environment.",
        ],
      },
      {
        heading: "A practical view",
        paragraphs: [
          "Chain choice is not branding. It is product constraint. If your agent needs to settle USDC, buy outcomes, or rebalance treasury often, the infrastructure has to keep up.",
          "Build where the loop can close. For me, that is Solana.",
        ],
      },
    ],
  },
  {
    slug: "s3labs-and-the-builder-ecosystem",
    title: "S3Labs and the builder ecosystem",
    date: "2026-04-08",
    displayDate: "Apr 8, 2026",
    summary:
      "How S3Labs connects AI products, opportunities, and community so Web3 builders can discover, ship, and earn faster.",
    sections: [
      {
        paragraphs: [
          "Builders do not fail only on code. They fail on distribution, timing, and access to the right opportunities. S3Labs is my answer to that gap: an AI-powered Web3 ecosystem, not a single app.",
          "The goal is simple. Help people discover what to build, launch faster, and find ways to earn inside the ecosystem.",
        ],
      },
      {
        heading: "What the ecosystem holds",
        paragraphs: [
          "AI products and agents for research and execution. Opportunity surfaces for jobs, grants, hackathons, and campaigns. Community and tools that keep momentum after the first ship.",
          "As CTO, I focus on the technical path from idea to revenue: architecture that can monetize, agent leverage that reduces headcount, and systems that survive after the launch week.",
        ],
      },
      {
        heading: "Why ecosystems beat isolated tools",
        paragraphs: [
          "A lone dashboard does not create a career or a company. A connected stack does. When products, agents, and opportunities share context, builders waste less time switching worlds.",
          "S3Labs is that connective tissue for Web3 with AI at the center.",
        ],
      },
    ],
  },
  {
    slug: "operating-as-one-human-with-agents",
    title: "Operating as one human with agents",
    date: "2026-03-04",
    displayDate: "Mar 4, 2026",
    summary:
      "Practical operating habits for a solo founder directing products that research, ship, earn, and execute.",
    sections: [
      {
        paragraphs: [
          "Running a company alone is not about doing every task. It is about owning the decisions that cannot be delegated to software yet, and encoding everything else into agents and systems.",
          "My week is built around direction, review, and shipping surfaces. Agents handle research loops, monitoring, drafts, and repetitive execution.",
        ],
      },
      {
        heading: "What stays human",
        paragraphs: [
          "Strategy. Product taste. Partnership judgment. Risk boundaries. Public narrative. Those are high-leverage and hard to automate cleanly.",
          "What does not stay human: status collection, first-pass research, routine integrations, and operational follow-through once a playbook exists.",
        ],
      },
      {
        heading: "What I measure",
        paragraphs: [
          "Output per week, not hours worked. Paid usage and retention, not vanity launches. System reliability, not how busy the calendar looks.",
          "If the company only grows when I personally type more, the model is wrong. If agents and products compound while I direct, the model is working.",
        ],
      },
    ],
  },
  {
    slug: "from-fintech-frontends-to-agent-infrastructure",
    title: "From fintech frontends to agent infrastructure",
    date: "2026-02-11",
    displayDate: "Feb 11, 2026",
    summary:
      "How shipping DeFi and fintech interfaces led me to build Syra AI and operate through agents instead of teams.",
    sections: [
      {
        paragraphs: [
          "I started by building interfaces for money: crowdfunding dApps, trading surfaces, SME tools, fintech product flows. That work taught me how fragile financial UX becomes when systems are slow, unclear, or dependent on manual ops.",
          "The next step was obvious. If interfaces can guide humans through complex finance, agents should eventually operate those flows directly.",
        ],
      },
      {
        heading: "What carried over",
        paragraphs: [
          "Obsession with clarity. Respect for settlement and failure states. Speed from 0 to 1. The habit of shipping products people can use the same day.",
          "What changed is the operator. The user is no longer only a person with a wallet. It can be an agent with a policy, a budget, and a job to finish.",
        ],
      },
      {
        heading: "Where I am now",
        paragraphs: [
          "Syra AI is the infrastructure bet. S3Labs is the ecosystem bet. The portfolio is the public record of that shift: from frontend craft to agent-native company building.",
          "Same domain: money and software. Different leverage: agents instead of headcount.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
