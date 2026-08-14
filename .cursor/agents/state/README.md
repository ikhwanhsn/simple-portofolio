# Apex agent state (auto)

The Agent reads and updates these files so **you never paste yesterday’s context**.

## Files

### `last-run.json` — Orchestrator (every `/growth`)

```json
{
  "date": "2026-08-15",
  "updatedAt": "2026-08-15T00:00:00.000Z",
  "mode": "daily",
  "weekday": "Sat",
  "routedAgents": ["pipeline"],
  "bottleneck": "pipeline|cash|proof|brand|runway|energy|skill|focus|venture|hire",
  "oneAction": "short description of the action chosen that day",
  "notToday": ["thing 1", "thing 2"],
  "freedomHint": "optional one-line from freedom.json"
}
```

### `last-ceo-week.json` — Friday board review

```json
{
  "weekEnding": "2026-08-15",
  "updatedAt": "2026-08-15T00:00:00.000Z",
  "outcomes": ["outcome 1", "outcome 2", "outcome 3"],
  "scorecard": {
    "cashMoved": false,
    "pipelineAdvanced": false,
    "proofShipped": false
  },
  "killList": [],
  "mandate": "one sentence weekly mandate"
}
```

### `freedom.json` — Holly (founder-fed)

```json
{
  "updatedAt": "2026-08-15T00:00:00.000Z",
  "currency": "USD",
  "runwayMonths": null,
  "monthlyBurn": null,
  "cashOnHand": null,
  "mrr": null,
  "pipelineWeighted": null,
  "freedomNumber": null,
  "freedomGap": null,
  "notes": "Founder fills real numbers. Agent never invents them."
}
```

### `growth-log.jsonl` — Append-only daily lines

Each line:

```json
{"date":"2026-08-15","bottleneck":"pipeline","oneAction":"…","agentsDispatched":["pipeline","revenue"],"mode":"daily"}
```

### Per-division snapshots

| File | Written by |
| --- | --- |
| `last-revenue.json` | Vince |
| `last-freedom.json` | Holly |
| `last-brand.json` | Maya |
| `last-content.json` | Iris |
| `last-pipeline.json` | Dean |
| `last-relay.json` | Remy |
| `last-energy.json` | Piper |
| `last-skills.json` | Flynn |
| `last-strategy.json` | Nora |
| `last-hire.json` | Blake |

Minimum shape:

```json
{
  "date": "2026-08-15",
  "updatedAt": "2026-08-15T00:00:00.000Z",
  "oneAction": "…",
  "notes": "optional short diagnosis"
}
```

## Rules for the Agent

1. If a file is missing → create after the run; say “baseline established.”
2. Never invent metric numbers. Quote `freedom.json` or say `null` / unknown.
3. Diff today’s bottleneck/oneAction vs `last-run.json` when present.
4. Honor `last-ceo-week.json` outcomes as the weekly mandate unless a P0 runway/energy issue appears.
