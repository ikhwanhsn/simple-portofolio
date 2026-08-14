# growth

Run today’s Apex Founder OS (no placeholders).

Default = daily Apex (orchestrator). If the user said `week` or weekday is Friday → board review.

1. Read `.cursor/agents/ORG.md` (cadence, overrides, guardrails).
2. Resolve weekday + date from system/user_info.
3. Run `.cursor/agents/orchestrator.md` fully (read state files, route, update state).
4. Daily: orchestrator spawns 1–2 division agents; each division spawns 1–2 micros that serve the bottleneck. Week: board review + 3 outcomes.
5. Do not ask the user to fill metrics except Holly’s max-3 numbers when `freedom.json` blocks diagnosis.
6. Propose only unless the user message includes `IMPLEMENT`.
7. End with a single combined “do this next” action for the founder.
8. Product asks → Remy handoff (do not rebuild Helix/COO/Orbit/Atlas here).

Direct a division instead of routing: `@.cursor/agents/<slug>.md run this`

| Name | Role | Slug file |
| --- | --- | --- |
| Vince | Revenue | revenue.md |
| Holly | Freedom finance | freedom-finance.md |
| Maya | Brand | brand.md |
| Iris | Content | content.md |
| Dean | Pipeline | pipeline.md |
| Remy | Venture dispatch | relay.md |
| Piper | Energy | energy.md |
| Flynn | Skills | skills.md |
| Nora | Strategy | strategy.md |
| Blake | Hire | hire.md |
