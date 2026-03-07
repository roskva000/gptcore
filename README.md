# GPTCore — Autonomous Game Development Experiment

An autonomous coding agent building and evolving a browser game in continuous runs.

This repository documents a long-running experiment where an AI agent iteratively develops a game, validates its behavior, and refines the project over time.

The agent runs on a schedule, analyzes the current project state, performs a small improvement, and updates the repository history.

The result is a living codebase that grows run by run.

---

# Project Overview

The project currently contains a small browser game built with:

* **Vite**
* **TypeScript**
* **Phaser**

The game loop is simple:

> Survive as long as possible while obstacles spawn and increase in difficulty.

The interesting part is **not the game itself** — it is **how the game evolves**.

Every iteration of development is performed by an autonomous agent.

---

# Autonomous Development Loop

A scheduled agent performs development cycles.

Each cycle:

1. Reads project state files
2. Chooses a single improvement
3. Implements it
4. Runs validation scripts
5. Updates project documentation

Typical run flow:

```
read state
↓
choose task
↓
implement change
↓
run telemetry / validation
↓
update state files
↓
commit
```

Runs are recorded in `CHANGELOG.md`.

---

# State-Driven Development

Instead of traditional issue trackers, the agent relies on structured state files.

Core files:

| File            | Purpose                        |
| --------------- | ------------------------------ |
| `STATE.md`      | Current project status         |
| `ROADMAP.md`    | Future direction               |
| `NEXT_AGENT.md` | Task for the next run          |
| `DECISIONS.md`  | Important design decisions     |
| `METRICS.md`    | Gameplay and telemetry metrics |
| `CHANGELOG.md`  | History of agent runs          |

These documents act as the **memory system** for the agent.

---

# Telemetry and Validation

The project contains a telemetry system used to evaluate gameplay.

Important metrics:

* survival time
* early death rate
* spawn pacing
* retry gap
* first death time

Telemetry allows the agent to tune gameplay balance in a deterministic way.

Example validation scripts:

```
npm run telemetry:check
npm run telemetry:snapshot
npm run telemetry:survival-snapshot
npm run telemetry:validation-snapshot
```

These ensure gameplay changes do not regress core metrics.

---

# Browser Validation System

The repository also contains an experimental browser validation harness.

Purpose:

* simulate gameplay sessions
* validate runtime behavior
* collect telemetry automatically

Scripts:

```
npm run telemetry:browser-preflight
npm run telemetry:browser-validation-smoke
npm run telemetry:validation-ready
```

This system prepares the ground for automated gameplay testing using a headless browser.

---

# Governance Layer

To prevent the agent from getting stuck in loops, the project includes a governance layer.

A daily **audit agent** reviews recent runs and evaluates:

* product progress
* validation/tooling growth
* potential development loops
* roadmap alignment

Audit results are stored in:

```
AUDIT.md
```

The builder agent reads these notes in subsequent runs.

---

# Repository Structure

```
project/
  game/
    src/
      game/
        GameScene.ts
        balance.ts
        spawn.ts
        telemetry.ts

    scripts/
      balance-snapshot.ts
      survival-snapshot.ts
      telemetry-check.ts
      validation-snapshot.ts
      browser-validation-smoke.ts
      browser-validation-preflight.ts
      browser-validation-ready.ts
```

Documentation:

```
STATE.md
ROADMAP.md
DECISIONS.md
NEXT_AGENT.md
CHANGELOG.md
METRICS.md
AUDIT.md
```

---

# Running the Game

```
cd project/game
npm install
npm run dev
```

Build:

```
npm run build
```

---

# Development Philosophy

This project explores questions such as:

* Can an AI agent iteratively build software with minimal human intervention?
* How can a codebase act as the memory system for an autonomous developer?
* What governance mechanisms are required to prevent development loops?
* How do telemetry and deterministic validation affect autonomous iteration?

---

# Experiment Status

The project is actively evolving through agent runs.

Each run:

* modifies code
* improves telemetry
* refines validation
* updates documentation

Follow progress in:

```
CHANGELOG.md
```

---

# Disclaimer

This repository is part of an experiment in autonomous software development.

Expect:

* unusual commit history
* rapidly evolving architecture
* occasional tooling detours

That is part of the experiment.

---

# License

MIT License.
