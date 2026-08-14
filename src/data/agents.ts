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
  name: string;
  orchestrator: string;
  product: string;
  url: string | null;
  thesis: string;
  leads: AgentLead[];
};

/** Public workforce roster — Apex + Helix + COO + Orbit (matches ~179 headcount). */
export const agentOrgs: AgentOrg[] = [
  {
    id: "apex",
    name: "Apex",
    orchestrator: "Apex",
    product: "Founder OS",
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
          { name: "Tori", focus: "Trancepad → Orbit" },
          { name: "Travis", focus: "Trading → Atlas" },
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
    id: "helix",
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
    id: "orbit",
    name: "Orbit",
    orchestrator: "orbit",
    product: "Trancepad",
    url: null,
    thesis:
      "Bonding-curve launchpad growth. One backlog item per day — activation, UX, reliability, fees, distribution.",
    leads: [
      {
        name: "spark",
        role: "Activation",
        micros: [
          { name: "key", focus: "Onboarding" },
          { name: "lift", focus: "Launch wizard" },
          { name: "deal", focus: "First buy UX" },
        ],
      },
      {
        name: "iris",
        role: "Frontend UX",
        micros: [
          { name: "hero", focus: "Landing" },
          { name: "scout", focus: "Discovery" },
          { name: "flash", focus: "Perf feel" },
        ],
      },
      {
        name: "bolt",
        role: "Backend",
        micros: [
          { name: "wire", focus: "HTTP API" },
          { name: "sync", focus: "Indexer" },
          { name: "pulse", focus: "Realtime" },
        ],
      },
      {
        name: "vault",
        role: "Contracts",
        micros: [
          { name: "curve", focus: "Bonding curve" },
          { name: "apex", focus: "Graduation" },
          { name: "toll", focus: "Fees" },
        ],
      },
      {
        name: "echo",
        role: "Growth marketing",
        micros: [
          { name: "ink", focus: "Copy" },
          { name: "buzz", focus: "Campaigns" },
          { name: "ally", focus: "Partnerships" },
        ],
      },
      {
        name: "quill",
        role: "Content & SEO",
        micros: [
          { name: "page", focus: "Blog" },
          { name: "crawl", focus: "Technical SEO" },
          { name: "guide", focus: "In-app docs" },
        ],
      },
      {
        name: "nest",
        role: "Community & DevRel",
        micros: [
          { name: "vibe", focus: "Social" },
          { name: "hook", focus: "Integrator DX" },
          { name: "aid", focus: "Support" },
        ],
      },
      {
        name: "prism",
        role: "Data analytics",
        micros: [
          { name: "trace", focus: "Events" },
          { name: "funnel", focus: "Funnel" },
          { name: "trial", focus: "Experiments" },
        ],
      },
      {
        name: "shield",
        role: "Quality & security",
        micros: [
          { name: "lens", focus: "Verification" },
          { name: "spec", focus: "Tests" },
          { name: "guard", focus: "Security" },
        ],
      },
    ],
  },
];

export function countOrgAgents(org: AgentOrg): number {
  const micros = org.leads.reduce((n, lead) => n + lead.micros.length, 0);
  return 1 + org.leads.length + micros;
}

export function getWorkforceTotals() {
  const byOrg = agentOrgs.map((org) => ({
    id: org.id,
    name: org.name,
    product: org.product,
    count: countOrgAgents(org),
  }));
  const agents = byOrg.reduce((n, o) => n + o.count, 0);
  return {
    agents,
    humans: 1,
    orgs: byOrg,
    status: "online" as const,
  };
}
