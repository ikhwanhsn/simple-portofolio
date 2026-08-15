import type { Metadata } from "next";
import Link from "next/link";
import {
  agentOrgs,
  countOrgAgents,
  getWorkforceTotals,
} from "@/data/agents";
import { SITE_URL, profile } from "@/data/profile";

const totals = getWorkforceTotals();

export const metadata: Metadata = {
  title: "Agents",
  description: `${totals.agents} agents · ${totals.humans} human. The workforce behind ${profile.name}'s companies — Apex, Helix (Syra), COO (S3Labs), and other projects.`,
  alternates: { canonical: `${SITE_URL}/agents` },
  openGraph: {
    title: "Agents",
    description: `${totals.agents} agents · ${totals.humans} human. Scale with agents, not headcount.`,
    url: `${SITE_URL}/agents`,
  },
};

const AgentsPage = () => {
  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">Agents</p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        The workforce
      </h1>
      <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] text-greyText">
        <span
          className="inline-block size-1.5 rounded-full bg-highlight animate-status-pulse"
          aria-hidden
        />
        {totals.status} · {totals.agents} agents · {totals.humans} human
      </p>
      <p className="mt-5 font-medium text-greyText leading-relaxed">
        {profile.thesis}. One human directing named agent orgs across founder
        ops, Syra, S3Labs, and other projects — each lead runs a micro-team for
        one narrow job.
      </p>

      <section className="mt-12" aria-label="Org headcount">
        <p className="font-mono text-xs text-greyText">Orgs</p>
        <ul className="mt-4 space-y-2">
          {totals.orgs.map((org) => (
            <li
              key={org.id}
              className="flex justify-between gap-4 font-medium text-greyText"
            >
              <span>
                <span className="text-text">{org.name}</span>
                <span className="font-mono text-[11px] text-greyText">
                  {" "}
                  · {org.product}
                </span>
              </span>
              <span className="font-mono text-xs shrink-0">{org.count}</span>
            </li>
          ))}
        </ul>
      </section>

      {agentOrgs.map((org, orgIndex) => {
        const count = countOrgAgents(org);
        const index = String(orgIndex + 1).padStart(2, "0");

        return (
          <section key={org.id} className="mt-14" id={org.id}>
            <p className="font-mono text-xs text-greyText">
              {index} / {org.name}
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-medium text-xl tracking-tight">
                {org.orchestrator}
              </h2>
              <span className="font-mono text-[11px] text-greyText">
                orchestrator · {count} agents
              </span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-greyText">
              {org.product}
              {org.url ? (
                <>
                  {" · "}
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-b hover:border-greyText hover:text-text"
                  >
                    {org.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </>
              ) : null}
            </p>
            <p className="mt-4 font-medium text-greyText leading-relaxed">
              {org.thesis}
            </p>

            <ul className="mt-8 space-y-7">
              {org.leads.map((lead) => (
                <li key={`${org.id}-${lead.name}`}>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium text-text">{lead.name}</span>
                    <span className="font-mono text-[11px] text-greyText">
                      {lead.role}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-greyText leading-relaxed">
                    {lead.micros.map((micro, i) => (
                      <span key={micro.name}>
                        {i > 0 ? (
                          <span className="text-outline mx-1.5" aria-hidden>
                            ·
                          </span>
                        ) : null}
                        <span className="text-text/80">{micro.name}</span>
                        <span className="text-greyText"> {micro.focus}</span>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-14 font-medium text-greyText leading-relaxed">
        Product work stays in its own org. Apex routes through Remy → Helix,
        COO, other projects, or trading desks — scale without duplicating teams.
      </p>

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link href="/" className="hover:border-b hover:border-greyText">
          ← Work
        </Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:border-b hover:border-greyText">
          About
        </Link>
        <span className="mx-2">/</span>
        <Link href="/now" className="hover:border-b hover:border-greyText">
          Now
        </Link>
      </p>
    </main>
  );
};

export default AgentsPage;
