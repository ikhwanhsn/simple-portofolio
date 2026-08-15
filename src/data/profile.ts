import { getAllPosts } from "@/data/blog";
import { getWorkforceTotals } from "@/data/agents";

export const SITE_URL = "https://www.ikhwanhsn.me";

const workforceTotals = getWorkforceTotals();

export const profile = {
  name: "Ikhwanul Husna",
  tagline: "One human running a multi-billion-dollar company",
  thesis: "Scale with agents, not headcount",
  location: "Indonesia",
  workforce: {
    agents: workforceTotals.agents,
    humans: workforceTotals.humans,
    status: workforceTotals.status,
  },
  roles: [
    {
      title: "Founder",
      org: "Syra AI",
      url: "https://www.syraa.fun/",
      description:
        "Machine money on Solana: Earn, Treasury, Invest, Spend, Grow. Live today: x402 pay-per-call APIs, MCP, and a typed SDK so agents can hold and move capital without humans in the loop.",
    },
    {
      title: "Founder",
      org: "Agentrail",
      url: "https://agentrail.fun/",
      description:
        "Agent-native build studio. Rails for MCP servers, x402 monetization, Solana agent dApps, and AI integrations. Fixed-scope shipping with an agent workforce.",
    },
    {
      title: "CTO",
      org: "S3Labs",
      url: "https://s3labs.xyz/",
      description:
        "AI-powered Web3 ecosystem. Products, opportunities, community, and tools so anyone can discover, build, and earn faster with AI agents.",
    },
  ],
  summary: [
    "I run a multi-billion-dollar company with agents. One human directing, products that research, ship, earn, and execute.",
    "Headcount: one. Scale: agents.",
  ],
  agents: [
    { name: "Syra AI", role: "Founder", url: "https://www.syraa.fun/" },
    { name: "Agentrail", role: "Founder", url: "https://agentrail.fun/" },
    { name: "S3Labs", role: "CTO", url: "https://s3labs.xyz/" },
  ],
  experience: [
    { name: "Wecash", year: "2025", url: "https://wecash.ai/" },
    { name: "Tabriiz", year: "2025", url: "https://tabriiz.com/" },
    { name: "Nova Capital", year: "2024", url: null },
    { name: "Dry Code", year: "2023", url: null },
  ],
  projects: [
    {
      name: "Syra AI",
      year: "2025",
      url: "https://www.syraa.fun/",
      description:
        "Machine money for agents on Solana: Earn, Treasury, Invest, Spend, Grow. x402 APIs, MCP, and SDK.",
    },
    {
      name: "Agentrail",
      year: "2026",
      url: "https://agentrail.fun/",
      description:
        "Agent-native build studio. MCP servers, x402 paywalls, Solana agent dApps, and AI integrations. Fixed scope, shipped in weeks.",
    },
    {
      name: "S3Labs",
      year: "2025",
      url: "https://s3labs.xyz/",
      description:
        "AI-powered Web3 ecosystem. Products, agents, opportunities, and tools to discover, build, and earn.",
    },
    {
      name: "Tabriiz Crowdfunding",
      year: "2025",
      url: "https://tabriiz.com/",
      description:
        "Web3 crowdfunding dApp with Next.js, Express, and Ethereum smart contracts. Top 30 of 2,000 at a global hackathon.",
    },
    {
      name: "Nation Trading",
      year: "2025",
      url: "https://bethenations.vercel.app/",
      description:
        "On-chain trading dApp for nation-style markets. DeFi UX built for live execution.",
    },
    {
      name: "GoUMKM",
      year: "2024",
      url: "https://www.goumkm.store/",
      description:
        "Digital marketplace for local SMEs, funded under Indonesia's PKM-PI program.",
    },
  ],
  misc: [
    {
      title: "Colosseum Agent Hackathon (Syra)",
      year: "2026",
      url: "https://colosseum.com/agent-hackathon/projects/ai-solana-trading-assistant",
    },
    {
      title: "Winner Espresso Hackathon",
      year: "2025",
      url: "https://dorahacks.io/hackathon/build-and-brew/winner",
    },
    {
      title: "Finalist Educhain Hackathon",
      year: "2025",
      url: "https://www.hackquest.io/hackathons/EDU-Chain-Semester-3",
    },
    {
      title: "Funded on PKM-PI Program",
      year: "2024",
      url: "https://wawasan.suaramerdeka.com/semarang/0813079170/perkenalkan-web-goumkm-buatan-usm-tim-pkm-usm-sosialisasi-ke-pelaku-umkm",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind"],
    },
    {
      category: "Agents",
      items: ["Solana", "x402", "MCP", "AI Agents"],
    },
    {
      category: "Web3",
      items: ["Wagmi", "RainbowKit", "Ethers", "web3.js"],
    },
    {
      category: "State",
      items: ["Redux", "Zustand"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB"],
    },
  ],
  contact: {
    email: "ikhwanulhusna111@gmail.com",
    telegram: "https://t.me/ikhwanhsn",
    x: "https://x.com/Ikhwanhsn",
    instagram: "https://www.instagram.com/ikhwanhsn_/",
    linkedin: "https://www.linkedin.com/in/ikhwanhsn/",
  },
  products: {
    syra: {
      name: "Syra AI",
      url: "https://www.syraa.fun/",
      docs: "https://docs.syraa.fun/",
      x: "https://x.com/syra_agent",
    },
    agentrail: {
      name: "Agentrail",
      url: "https://agentrail.fun/",
    },
    s3labs: {
      name: "S3Labs",
      url: "https://s3labs.xyz/",
    },
  },
} as const;

export function getBlogSummaries() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    summary: post.summary,
  }));
}

export function buildLlmsTxt() {
  return `# ${profile.name}

> ${profile.tagline}. Founder of Syra AI and Agentrail. CTO of S3Labs. Thesis: ${profile.thesis}.

${profile.summary.join(" ")}

Agents and products are the workforce. Prefer structured data at /profile.json and the full context file at /llms-full.txt.

## Profile

- [Home](${SITE_URL}/): Personal portfolio and bio
- [Profile JSON](${SITE_URL}/profile.json): Machine-readable profile (JSON)
- [Full LLM context](${SITE_URL}/llms-full.txt): Complete profile text for agents
- [Thesis post](${SITE_URL}/blog/scale-with-agents-not-headcount): Scale with agents, not headcount
- [Agents](${SITE_URL}/agents): Full workforce roster (Syra Helix, S3Labs COO, Up Only Fund Atlas, Other)
- [Now](${SITE_URL}/now): Current focus

## Products

- [Syra AI](${profile.products.syra.url}): Machine money for agents on Solana
- [Syra Docs](${profile.products.syra.docs}): Syra documentation
- [Agentrail](${profile.products.agentrail.url}): Agent-native build studio (MCP, x402, Solana)
- [S3Labs](${profile.products.s3labs.url}): AI-powered Web3 ecosystem

## Contact

- [Email](mailto:${profile.contact.email}): Direct email
- [Telegram](${profile.contact.telegram}): @ikhwanhsn
- [X](${profile.contact.x}): @Ikhwanhsn
- [LinkedIn](${profile.contact.linkedin}): Professional profile
- [Instagram](${profile.contact.instagram}): @ikhwanhsn_

## Optional

- [Blog](${SITE_URL}/blog): Writing and notes
- [About](${SITE_URL}/about): About page
- [Agents](${SITE_URL}/agents): Named agent orgs and micro-teams
`;
}

export function buildLlmsFullTxt() {
  const skills = profile.skills
    .map((s) => `- ${s.category}: ${s.items.join(", ")}`)
    .join("\n");

  const agents = profile.agents
    .map((a) => `- ${a.name} (${a.role}): ${a.url}`)
    .join("\n");

  const experience = profile.experience
    .map((e) => `- ${e.name} (${e.year})${e.url ? `: ${e.url}` : ""}`)
    .join("\n");

  const projects = profile.projects
    .map((p) => `- ${p.name} (${p.year}): ${p.description} ${p.url}`)
    .join("\n");

  const misc = profile.misc
    .map((m) => `- ${m.title} (${m.year}): ${m.url}`)
    .join("\n");

  const blog = getBlogSummaries()
    .map((b) => `- ${b.title} (${b.date}): ${b.summary} ${b.url}`)
    .join("\n");

  return `# ${profile.name}

> ${profile.tagline}. Founder of Syra AI and Agentrail. CTO of S3Labs.

## Identity

- Name: ${profile.name}
- Location: ${profile.location}
- Tagline: ${profile.tagline}
- Thesis: ${profile.thesis}
- Roles: Founder of Syra AI; Founder of Agentrail; CTO of S3Labs

## Summary

${profile.summary.map((p) => p).join("\n\n")}

${profile.roles
  .map((r) => `### ${r.org} (${r.title})\n\n${r.description}\n\nURL: ${r.url}`)
  .join("\n\n")}

## Agents

Product roles:
${agents}

Full named workforce (orchestrators + leads + micros): ${SITE_URL}/agents
Headcount: ${profile.workforce.agents} agents · ${profile.workforce.humans} human
Main: Helix (Syra AI), COO (S3Labs), Atlas (Up Only Fund). Other projects: founder OS + anonymous desks.

## Experience (before agents)

${experience}

## Selected work

${projects}

## Misc

${misc}

## Tech stack

${skills}

## Contact

- Email: ${profile.contact.email}
- Telegram: ${profile.contact.telegram}
- X: ${profile.contact.x}
- Instagram: ${profile.contact.instagram}
- LinkedIn: ${profile.contact.linkedin}

## Products

- Syra AI: ${profile.products.syra.url}
- Syra Docs: ${profile.products.syra.docs}
- Syra X: ${profile.products.syra.x}
- Agentrail: ${profile.products.agentrail.url}
- S3Labs: ${profile.products.s3labs.url}

## Blog

${blog}

## Thesis: Scale with agents, not headcount

Most companies still scale by hiring. More people, more managers, more process. I take a different path: one human at the center, agents as the workforce. The goal is a multi-billion-dollar company without a traditional org chart.

Headcount is optional. Agents are not. When a product can research, ship, earn, and execute, you do not need a floor of desks to grow. You need clear direction, strong systems, and software that compounds while you sleep.

Syra AI is the financial layer of an agent-native company. Agentrail is the build studio that ships MCP, x402, and Solana agent products. S3Labs is the distribution and product layer. Scale with agents, not headcount.

Full post: ${SITE_URL}/blog/scale-with-agents-not-headcount

## Machine-readable endpoints

- ${SITE_URL}/llms.txt
- ${SITE_URL}/llms-full.txt
- ${SITE_URL}/profile.json
- ${SITE_URL}/robots.txt
`;
}

export function buildProfileJson() {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    id: `${SITE_URL}/profile.json`,
    type: "Person",
    ...profile,
    blog: getBlogSummaries(),
    sameAs: [
      profile.contact.linkedin,
      profile.contact.x,
      profile.contact.telegram,
      profile.contact.instagram,
    ],
    url: SITE_URL,
    machineReadable: {
      llmsTxt: `${SITE_URL}/llms.txt`,
      llmsFullTxt: `${SITE_URL}/llms-full.txt`,
      profileJson: `${SITE_URL}/profile.json`,
    },
  };
}
