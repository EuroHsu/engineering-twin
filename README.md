# Engineering Twin

A personal engineering context layer for AI coding agents.

Engineering Twin preserves an engineer's identity, principles, decisions, and project context in portable, human-readable data.

## Core Model

```text
AI Agent
    |
    v
Engineering Twin Skills
    |
    v
Engineering Twin Data
```

```text
AI Agent
= reasoning, coding, problem solving

Engineering Twin Skills
= setup, activation, context usage, historical extraction

Engineering Twin Data
= user-owned engineering knowledge
```

## Skills

- `engineering-twin` — activate and use Twin context during the current session
- `setup-engineering-twin` — create or import Twin Data and configure its location
- `extract-engineering-twin` — analyze historical engineering activity and propose knowledge candidates

## Quick Start

Install the Skills with your AI agent's supported Skill ecosystem.

Run `setup-engineering-twin` to create or import Twin Data.

Run `/engineering-twin` when you want to use the Twin in the current session.

Run `extract-engineering-twin` when you want to analyze historical engineering activity.

## Twin Data

```text
engineering-twin-data/
├── README.md
├── twin.yaml
├── identity/
├── principles/
├── decisions/
└── projects/
```

Twin Data is separate from this repository and is primarily Markdown with YAML metadata.

## Documentation

`docs/` contains only lightweight human-facing project notes. Operational rules belong to the corresponding Skill package.

- `docs/architecture.md` — core architecture and responsibility boundaries
- `docs/data-schema.md` — minimal Data structure and schema summary
- `docs/lifecycle.md` — minimal lifecycle overview

The Skills are self-contained after installation and must not depend on repository-level `docs/` files for normal operation.

## Design Principles

- Human First
- Markdown Native
- Git Native
- Explicit Over Automatic
- Context Over History

Engineering Twin preserves engineering judgment; it does not replace AI reasoning or define the agent's own behavior.