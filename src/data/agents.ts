export type AgentMicro = {
  name: string;
  focus: string;
};

export type AgentLead = {
  name: string;
  role: string;
  micros: AgentMicro[];
};

export type AgentOrg = {
  id: string;
  /** main = Syra / S3Labs / Up Only Fund; other = founder OS + anonymous desks */
  tier: "main" | "other";
  name: string;
  orchestrator: string;
  product: string;
  url: string | null;
  thesis: string;
  leads: AgentLead[];
};

/** Public workforce roster.
 * Main: Helix (Syra), COO (S3Labs), Atlas (Up Only Fund).
 * Other: Apex Founder OS + anonymous stealth/desk orgs (never name those products).
 * Headcount = live sum of orchestrator + leads + micros.
 */
export const agentOrgs: AgentOrg[] = [
  {
    id: "helix",
    tier: "main",
    name: "Helix",
    orchestrator: "Helix",
    product: "Syra AI",
    url: "https://www.syraa.fun/",
    thesis:
      "Machine money on Solana. Move a north-star paid-call metric every day — activation, settlement, distribution, token loop.",
    leads: [
      {
        name: "Spark",
        role: "Activation",
        micros: [
          { name: "Stride", focus: "Quickstart" },
          { name: "Plug", focus: "MCP + SDK" },
          { name: "Echo", focus: "Error DX" },
          { name: "Bridge", focus: "Free → paid" },
        ],
      },
      {
        name: "Beacon",
        role: "Distribution",
        micros: [
          { name: "Atlas", focus: "Listings" },
          { name: "Scout", focus: "Hackathons" },
          { name: "Catalog", focus: "npm" },
          { name: "Agora", focus: "Community" },
        ],
      },
      {
        name: "Chronicle",
        role: "Content & proof",
        micros: [
          { name: "Log", focus: "Ship log" },
          { name: "Quill", focus: "Copy" },
          { name: "Frame", focus: "Video" },
        ],
      },
      {
        name: "Mint",
        role: "Token & marketcap",
        micros: [
          { name: "Receipt", focus: "Buyback proof" },
          { name: "Claim", focus: "Rewards" },
          { name: "Lock", focus: "Staking" },
          { name: "Desk", focus: "Listing / KOL" },
        ],
      },
      {
        name: "Ledger",
        role: "Revenue & pricing",
        micros: [
          { name: "Tier", focus: "Price ladder" },
          { name: "Cost", focus: "Margin" },
          { name: "Bundle", focus: "Packaging" },
        ],
      },
      {
        name: "Compass",
        role: "Product",
        micros: [
          { name: "Rice", focus: "RICE scoring" },
          { name: "Lens", focus: "UX critique" },
          { name: "Map", focus: "Roadmap" },
        ],
      },
      {
        name: "Wager",
        role: "Profit experiments",
        micros: [
          { name: "Hypothesis", focus: "Design" },
          { name: "Pool", focus: "LP / treasury" },
          { name: "Score", focus: "Results" },
        ],
      },
      {
        name: "Sentinel",
        role: "Payments & security",
        micros: [
          { name: "Pulse", focus: "Settlement" },
          { name: "Rail", focus: "x402" },
          { name: "Cipher", focus: "Secrets" },
          { name: "Custody", focus: "Wallets" },
        ],
      },
      {
        name: "Keel",
        role: "Platform health",
        micros: [
          { name: "Prune", focus: "Dead code" },
          { name: "Spec", focus: "Tests" },
          { name: "Speed", focus: "Perf" },
          { name: "Ops", focus: "DevOps" },
        ],
      },
      {
        name: "Bench",
        role: "Hire",
        micros: [
          { name: "Gap", focus: "Gap-finder" },
          { name: "Draft", focus: "Role-writer" },
          { name: "Crew", focus: "Micro design" },
          { name: "Patch", focus: "Org patch" },
        ],
      },
    ],
  },
  {
    id: "coo",
    tier: "main",
    name: "COO",
    orchestrator: "COO",
    product: "S3Labs",
    url: "https://s3labs.xyz/",
    thesis:
      "Solana builder growth: programs, KOL marketplace, jobs, events. One highest-leverage growth action per day.",
    leads: [
      {
        name: "Meter",
        role: "Data & analytics",
        micros: [
          { name: "Standup", focus: "Daily standup" },
          { name: "Delta", focus: "Metrics diff" },
          { name: "Retain", focus: "Retention" },
        ],
      },
      {
        name: "Gate",
        role: "Activation & product",
        micros: [
          { name: "Funnel", focus: "Apply funnel" },
          { name: "Onboard", focus: "Onboarding" },
          { name: "Audit", focus: "UX audit" },
          { name: "Copy", focus: "Copy clarity" },
        ],
      },
      {
        name: "Clear",
        role: "KOL marketplace",
        micros: [
          { name: "Campaign", focus: "Campaign clear" },
          { name: "Supply", focus: "Recruiter" },
          { name: "Payout", focus: "Payout integrity" },
          { name: "Take", focus: "Take-rate" },
        ],
      },
      {
        name: "Reach",
        role: "Growth & distribution",
        micros: [
          { name: "Shiplog", focus: "Ship log" },
          { name: "Thread", focus: "X thread" },
          { name: "Telegram", focus: "Telegram ops" },
          { name: "Referral", focus: "Referral loop" },
        ],
      },
      {
        name: "Yield",
        role: "Revenue & pricing",
        micros: [
          { name: "Price", focus: "Pricing tune" },
          { name: "Pack", focus: "Packaging" },
          { name: "Margin", focus: "Margin model" },
        ],
      },
      {
        name: "Signal",
        role: "Pipeline & signal",
        micros: [
          { name: "Jobs", focus: "Jobs curator" },
          { name: "Events", focus: "Events" },
          { name: "Hack", focus: "Hackathons" },
        ],
      },
      {
        name: "Keep",
        role: "Engineering",
        micros: [
          { name: "Ship", focus: "Feature shipper" },
          { name: "Health", focus: "Codebase health" },
          { name: "Perf", focus: "Perf sweep" },
          { name: "Prune", focus: "Dead code" },
        ],
      },
      {
        name: "Guard",
        role: "Trust & security",
        micros: [
          { name: "Payments", focus: "Payments audit" },
          { name: "Secrets", focus: "Secrets scan" },
          { name: "Compliance", focus: "Compliance" },
        ],
      },
      {
        name: "Helm",
        role: "Strategy & CEO",
        micros: [
          { name: "Brutal", focus: "Weekly review" },
          { name: "Priority", focus: "Prioritization" },
          { name: "Kill", focus: "Kill list" },
        ],
      },
      {
        name: "Ally",
        role: "BD & partnerships",
        micros: [
          { name: "Integrate", focus: "Integration scout" },
          { name: "Partner", focus: "Outreach" },
          { name: "Support", focus: "Support triage" },
        ],
      },
    ],
  },
  {
    id: "uof",
    tier: "main",
    name: "Atlas",
    orchestrator: "Atlas",
    product: "Up Only Fund",
    url: "https://uponlyfund.com",
    thesis:
      "Mandate-first Solana allocator backed by Syra. Daily growth on thesis, terminal, $UPONLY sleeve, and honest disclosures — never invented returns.",
    leads: [
      {
        name: "Scribe",
        role: "Content & narrative",
        micros: [
          { name: "Quill", focus: "Thesis thread" },
          { name: "Folio", focus: "Book update" },
          { name: "Tip", focus: "Friday tip" },
          { name: "Chronicle", focus: "Ship log" },
        ],
      },
      {
        name: "Herald",
        role: "Distribution",
        micros: [
          { name: "Echo", focus: "Reply / amplify" },
          { name: "Pack", focus: "Share pack" },
          { name: "Depth", focus: "Telegram" },
        ],
      },
      {
        name: "Spark",
        role: "Funnel & activation",
        micros: [
          { name: "Funnel", focus: "Funnel" },
          { name: "Beacon", focus: "Terminal" },
          { name: "Gate", focus: "Access gate" },
        ],
      },
      {
        name: "Vault",
        role: "Token & liquidity",
        micros: [
          { name: "Listing", focus: "Listings" },
          { name: "Venue", focus: "Venues" },
          { name: "Cap", focus: "Honest MC" },
        ],
      },
      {
        name: "Gauge",
        role: "Analytics & scorecard",
        micros: [
          { name: "Score", focus: "Scorecard" },
          { name: "Trial", focus: "Experiments" },
        ],
      },
      {
        name: "Oath",
        role: "Trust & disclosures",
        micros: [
          { name: "Claim", focus: "Claim audit" },
          { name: "Disclose", focus: "Disclosures" },
        ],
      },
      {
        name: "Forge",
        role: "Growth engineering",
        micros: [
          { name: "Trace", focus: "Instrumentation" },
          { name: "Meta", focus: "SEO / meta" },
          { name: "Patch", focus: "Growth fix" },
        ],
      },
      {
        name: "Sentinel",
        role: "Security & wallet trust",
        micros: [
          { name: "Secrets", focus: "Secrets" },
          { name: "Wallet", focus: "Wallet path" },
        ],
      },
    ],
  },
  {
    id: "apex",
    tier: "other",
    name: "Apex",
    orchestrator: "Apex",
    product: "Other projects",
    url: null,
    thesis: "Personal life + revenue growth toward financial freedom. Routes product work out; never rebuilds product orgs.",
    leads: [
      {
        name: "Vince",
        role: "Revenue",
        micros: [
          { name: "Cole", focus: "Close" },
          { name: "Carla", focus: "Collect" },
          { name: "Parker", focus: "Package" },
          { name: "Miles", focus: "Stream mix" },
        ],
      },
      {
        name: "Holly",
        role: "Freedom finance",
        micros: [
          { name: "Ruth", focus: "Runway" },
          { name: "Bea", focus: "Budget" },
          { name: "Tess", focus: "Freedom target" },
          { name: "Brody", focus: "Buffer" },
        ],
      },
      {
        name: "Maya",
        role: "Personal brand",
        micros: [
          { name: "Seth", focus: "Site sync" },
          { name: "Ivy", focus: "Inbound" },
          { name: "Polly", focus: "Position" },
          { name: "Pearl", focus: "Proof bio" },
        ],
      },
      {
        name: "Iris",
        role: "Content & proof",
        micros: [
          { name: "Quinn", focus: "Caption" },
          { name: "Leo", focus: "Ship log" },
          { name: "Faye", focus: "Video" },
          { name: "Theo", focus: "Thread" },
        ],
      },
      {
        name: "Dean",
        role: "Client pipeline",
        micros: [
          { name: "Scott", focus: "Scout" },
          { name: "Owen", focus: "Offer" },
          { name: "Penny", focus: "Pitch" },
          { name: "Felix", focus: "Follow-up" },
        ],
      },
      {
        name: "Remy",
        role: "Venture dispatch",
        micros: [
          { name: "Sasha", focus: "Syra → Helix" },
          { name: "Logan", focus: "S3Labs → COO" },
          { name: "Tori", focus: "UOF → Atlas" },
          { name: "Travis", focus: "Other desks" },
        ],
      },
      {
        name: "Piper",
        role: "Energy & cadence",
        micros: [
          { name: "Ford", focus: "Deep work" },
          { name: "Rae", focus: "Recovery" },
          { name: "Stella", focus: "Streak" },
          { name: "Cade", focus: "Capacity cap" },
        ],
      },
      {
        name: "Flynn",
        role: "Skill leverage",
        micros: [
          { name: "Gwen", focus: "Skill gap" },
          { name: "Drake", focus: "Drill" },
          { name: "Ava", focus: "Apply" },
        ],
      },
      {
        name: "Nora",
        role: "Strategy & focus",
        micros: [
          { name: "Mara", focus: "Mandate" },
          { name: "Kane", focus: "Kill list" },
          { name: "Reid", focus: "Rank" },
          { name: "Rita", focus: "Review" },
        ],
      },
      {
        name: "Blake",
        role: "Hire",
        micros: [
          { name: "Gina", focus: "Gap" },
          { name: "Dana", focus: "Draft" },
          { name: "Chris", focus: "Crew" },
          { name: "Pat", focus: "Patch" },
        ],
      },
    ],
  },
  {
    id: "other",
    tier: "other",
    name: "Other",
    orchestrator: "Other",
    product: "Other projects",
    url: null,
    thesis:
      "Anonymous and stealth ventures. Same three-tier pattern — orchestrator, leads, and micro-teams — kept off the public brand map on purpose.",
    leads: [
      {
        name: "Nova",
        role: "Activation",
        micros: [
          { name: "Key", focus: "Onboarding" },
          { name: "Lift", focus: "First win" },
          { name: "Deal", focus: "Conversion" },
        ],
      },
      {
        name: "Jade",
        role: "Product UX",
        micros: [
          { name: "Hero", focus: "Landing" },
          { name: "Scout", focus: "Discovery" },
          { name: "Flash", focus: "Perf feel" },
        ],
      },
      {
        name: "Rex",
        role: "Platform",
        micros: [
          { name: "Wire", focus: "API" },
          { name: "Sync", focus: "Data sync" },
          { name: "Pulse", focus: "Realtime" },
        ],
      },
      {
        name: "Cruz",
        role: "Core systems",
        micros: [
          { name: "Curve", focus: "Core logic" },
          { name: "Rise", focus: "Milestones" },
          { name: "Toll", focus: "Economics" },
        ],
      },
      {
        name: "Echo",
        role: "Growth",
        micros: [
          { name: "Ink", focus: "Copy" },
          { name: "Buzz", focus: "Campaigns" },
          { name: "Ally", focus: "Partners" },
        ],
      },
      {
        name: "Quill",
        role: "Content",
        micros: [
          { name: "Page", focus: "Writing" },
          { name: "Crawl", focus: "Discovery" },
          { name: "Guide", focus: "Docs" },
        ],
      },
      {
        name: "Nest",
        role: "Community",
        micros: [
          { name: "Vibe", focus: "Social" },
          { name: "Hook", focus: "Integrators" },
          { name: "Aid", focus: "Support" },
        ],
      },
      {
        name: "Prism",
        role: "Analytics",
        micros: [
          { name: "Trace", focus: "Events" },
          { name: "Funnel", focus: "Funnel" },
          { name: "Trial", focus: "Experiments" },
        ],
      },
      {
        name: "Shield",
        role: "Quality & security",
        micros: [
          { name: "Lens", focus: "Verification" },
          { name: "Spec", focus: "Tests" },
          { name: "Guard", focus: "Security" },
        ],
      },
    ],
  },
  {
    id: "desk",
    tier: "other",
    name: "Desk",
    orchestrator: "Desk",
    product: "Other projects",
    url: null,
    thesis:
      "Anonymous research and execution desk. Quant-style leads and micro-teams — kept off the public brand map on purpose.",
    leads: [
      {
        name: "Margo",
        role: "Market intelligence",
        micros: [
          { name: "Romy", focus: "Regime" },
          { name: "Skye", focus: "Scanner" },
          { name: "Veda", focus: "Event risk" },
          { name: "Tate", focus: "Charts" },
        ],
      },
      {
        name: "Sol",
        role: "Strategy research",
        micros: [
          { name: "Inez", focus: "Signals" },
          { name: "Fern", focus: "Features" },
          { name: "Hope", focus: "Hypothesis" },
          { name: "Reed", focus: "Edge review" },
        ],
      },
      {
        name: "Bryce",
        role: "Backtest & validation",
        micros: [
          { name: "Oscar", focus: "IS/OOS" },
          { name: "Wade", focus: "Walk-forward" },
          { name: "Otto", focus: "Overfit audit" },
          { name: "Monte", focus: "Robustness" },
        ],
      },
      {
        name: "Rowan",
        role: "Risk & portfolio",
        micros: [
          { name: "Voss", focus: "Sizing" },
          { name: "Dawn", focus: "Drawdown" },
          { name: "Cora", focus: "Correlation" },
          { name: "Max", focus: "Exposure" },
        ],
      },
      {
        name: "Eden",
        role: "Execution engine",
        micros: [
          { name: "Sloane", focus: "Signal engine" },
          { name: "Brooke", focus: "Broker layer" },
          { name: "Clay", focus: "Cost model" },
          { name: "Storm", focus: "State integrity" },
        ],
      },
      {
        name: "Dove",
        role: "Data engineering",
        micros: [
          { name: "Kai", focus: "Ingest" },
          { name: "Qual", focus: "Data quality" },
          { name: "Sonny", focus: "Symbols" },
          { name: "Nori", focus: "Storage" },
        ],
      },
      {
        name: "Pia",
        role: "Performance analytics",
        micros: [
          { name: "Mia", focus: "Metrics" },
          { name: "Eva", focus: "Equity curve" },
          { name: "Flint", focus: "Forensics" },
          { name: "Riva", focus: "Daily report" },
        ],
      },
      {
        name: "Ines",
        role: "Infra & reliability",
        micros: [
          { name: "Sean", focus: "Scheduler" },
          { name: "Uma", focus: "Uptime" },
          { name: "Cy", focus: "CI gates" },
          { name: "Wren", focus: "Secrets" },
        ],
      },
      {
        name: "Lane",
        role: "Live readiness",
        micros: [
          { name: "Grier", focus: "Promote gate" },
          { name: "Neo", focus: "Test path" },
          { name: "Sable", focus: "Safety rails" },
          { name: "Hank", focus: "Kill switch" },
        ],
      },
    ],
  }
];

export function countOrgAgents(org: AgentOrg): number {
  const micros = org.leads.reduce((n, lead) => n + lead.micros.length, 0);
  return 1 + org.leads.length + micros;
}

export function getMainOrgs(): AgentOrg[] {
  return agentOrgs.filter((o) => o.tier === "main");
}

export function getOtherOrgs(): AgentOrg[] {
  return agentOrgs.filter((o) => o.tier === "other");
}

export function getWorkforceTotals() {
  const main = getMainOrgs().map((org) => ({
    id: org.id,
    name: org.name,
    product: org.product,
    tier: "main" as const,
    count: countOrgAgents(org),
  }));
  const otherOrgs = getOtherOrgs();
  const otherCount = otherOrgs.reduce((n, o) => n + countOrgAgents(o), 0);
  const agents = main.reduce((n, o) => n + o.count, 0) + otherCount;
  return {
    agents,
    humans: 1,
    orgs: [
      ...main,
      {
        id: "other-group",
        name: "Other",
        product: "Other projects",
        tier: "other" as const,
        count: otherCount,
      },
    ],
    otherOrgs: otherOrgs.map((org) => ({
      id: org.id,
      name: org.name,
      product: org.product,
      count: countOrgAgents(org),
    })),
    status: "online" as const,
  };
}
