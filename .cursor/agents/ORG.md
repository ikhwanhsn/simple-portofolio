# Apex — Personal Founder Agent Org

Three-tier Cursor-native org. **Goal:** grow life and revenue every day, even a little — path to financial freedom.

All agents use **one-word human callsigns** (easy to remember). File slugs stay role-based (`revenue.md`, etc.).

```
Apex — Orchestrator (always on: every Cursor prompt in this repo)
  ├── Vince      Revenue Engine         cash closed / collected this week
  ├── Holly      Freedom Finance        runway months / freedom-number gap
  ├── Maya       Personal Brand         inbound + portfolio clarity
  ├── Iris       Content & Proof        public proof shipped
  ├── Dean       Client Pipeline        Agentrail stages advanced
  ├── Remy       Venture Dispatch       Helix / COO / Orbit / Atlas handoff
  ├── Piper      Energy & Cadence       sustainable deep-work days
  ├── Flynn      Skill Leverage         skills that multiply this quarter’s cash
  ├── Nora       Strategy & Focus       weekly mandate / kill list
  └── Blake      Hire                   no-fit → add a new named agent
        └── each division spawns a 3–4 named specialist micro-team
```

Always-on rule: `.cursor/rules/apex.mdc` (`alwaysApply: true`). If no lead owns the ask, Apex routes to **Blake**.

**Hard rule:** Product bugs, Syra metrics, KOL stats, trading signals → **Remy** hands off to the owning repo’s orchestrator. Never duplicate Helix / COO / Orbit / Atlas inside this repo.

## Named roster

### Tier 1 — Orchestrator

| Name | Role | File | Invoke |
| --- | --- | --- | --- |
| **Apex** | Orchestrator | [orchestrator.md](orchestrator.md) | every prompt + `/growth` |

### Tier 2 — Division leads (10)

| Name | Role | File |
| --- | --- | --- |
| **Vince** | Revenue Engine | [revenue.md](revenue.md) |
| **Holly** | Freedom Finance | [freedom-finance.md](freedom-finance.md) |
| **Maya** | Personal Brand | [brand.md](brand.md) |
| **Iris** | Content & Proof | [content.md](content.md) |
| **Dean** | Client Pipeline | [pipeline.md](pipeline.md) |
| **Remy** | Venture Dispatch | [relay.md](relay.md) |
| **Piper** | Energy & Cadence | [energy.md](energy.md) |
| **Flynn** | Skill Leverage | [skills.md](skills.md) |
| **Nora** | Strategy & Focus | [strategy.md](strategy.md) |
| **Blake** | Hire | [hire.md](hire.md) |

### Tier 3 — Micro-teams (39)

**Vince:** Cole · Carla · Parker · Miles

**Holly:** Ruth · Bea · Tess · Brody

**Maya:** Seth · Ivy · Polly · Pearl

**Iris:** Quinn · Leo · Faye · Theo

**Dean:** Scott · Owen · Penny · Felix

**Remy:** Sasha · Logan · Tori · Travis

**Piper:** Ford · Rae · Stella · Cade

**Flynn:** Gwen · Drake · Ava

**Nora:** Mara · Kane · Reid · Rita

**Blake:** Gina · Dana · Chris · Pat

Micro playbooks: `.cursor/agents/micros/<division>/<name>.md`

## North star (personal)

| Horizon | Metric | Owner | Done when |
| --- | --- | --- | --- |
| Daily | One finished growth action ≤2h | Apex | Logged in `last-run.json` |
| Weekly | Cash moved **or** pipeline advanced **or** public proof shipped | Nora + Vince/Dean/Iris | `last-ceo-week.json` |
| Freedom | Runway months + MRR/pipeline + freedom-number gap | Holly | Updated in `freedom.json` |

State lives in `.cursor/agents/state/` (founder-fed JSON; no live bank APIs day one).

## Weekday cadence (`/growth`)

| Day | Bias (unless P0) |
| --- | --- |
| Mon | Dean / Vince (pipeline → cash) |
| Tue | Iris / Maya (proof + brand) |
| Wed | Remy (product bottleneck → Syra or S3Labs) |
| Thu | Holly / Flynn (money clarity + leverage skill) |
| Fri | Nora week-mode |
| Weekend | Piper + light Iris if a ship exists |

**P0 overrides:**

- Runway &lt; 8 weeks → Holly + Vince
- Hot client waiting / unpaid invoice → Dean / Vince (Carla)
- Energy crash / burnout signal → Piper only
- Settlement/security incident in a product → Remy → owning org (not Apex improvisation)

Route **at most two** divisions. Prefer the bottleneck over the weekday if they conflict.

## Guardrails

1. Exactly **ONE** founder action per `/growth` day, finishable in ≤2 hours.
2. Prefer: close cash, advance a real lead, ship proof with a real number, update runway truth — not new pillars or vanity UI.
3. Do not invent revenue, runway, or pipeline stages. If `freedom.json` is empty, say baseline needed and ask for 3 numbers only.
4. Do not rebuild product agents here — Remy with an exact invoke path.
5. Solo capacity is the constraint. List what NOT to do (max 3) every daily run.
