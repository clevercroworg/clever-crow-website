# Lead heat (Hot / Warm / Cold)

Every **answered** AI call gets a heat score from −100 to 100, so the team knows who to call first.
Code: `lib/calling/heat.ts` (weights in one place). Unanswered calls get no heat.

| Signal | Points |
|---|---|
| Outcome: interested | +40 |
| Outcome: wants a person to call | +30 |
| Outcome: wants more info | +25 |
| Outcome: follow up | +15 |
| Outcome: not interested | −40 |
| Outcome: wrong number / asked not to be called | −100 |
| Agent's read of interest (`interest_level`): hot / warm / cold | +30 / +10 / −20 |
| Talk time: 90 s or more / 45–89 s / under 20 s | +20 / +10 / −10 |
| Shared a timeline / a budget / named a service | +10 / +10 / +5 |

**Hot** = 60 or more · **Warm** = 30–59 · **Cold** = below 30. Hot calls are also flagged "follow-up needed".

Where it shows:
- **AI calls page:** Hot / Warm / Cold counts for the month. Click one to list those calls, hottest first.
- **Call page:** the badge, the score, the AI's one-line reason and every point added.
- **Lead page:** the latest heat in the AI callback panel.

Tuning: change the numbers in `lib/calling/heat.ts`, run `npm test`. New scores apply to new calls; old calls keep
the score they were given.
