# Engineering Twin

A personal engineering context layer for AI coding agents.

Engineering Twin helps AI coding agents understand an engineer's:

- identity
- engineering principles
- architectural principles
- technical decisions
- project context

It does not train or replace an AI model. It provides portable engineering context that existing AI agents can use during reasoning and implementation.

## Core Concept

```text
AI Agent
    |
    | uses
    v
Engineering Twin Skills
    |
    | read and operate on
    v
Engineering Twin Data
```

```text
AI Agent
= reasoning, coding, problem solving

Engineering Twin Skills
= instructions for discovering, using, setting up, and evolving Twin context

Engineering Twin Data
= user-owned engineering knowledge
```

## Skills

The repository provides three complementary Skills:

### `engineering-twin`

Applies relevant personal engineering context during normal AI-assisted work.

### `setup-engineering-twin`

Creates or imports Twin Data, validates it, and configures its location.

### `extract-engineering-twin`

Analyzes historical engineering activity and proposes evidence-backed knowledge candidates for human review.

The Skills are intentionally independent from the user's personal Twin Data.

## Quick Start

Install the Skills using a Skill ecosystem supported by your AI agent.

Then run `setup-engineering-twin` to create or import Engineering Twin Data.

After setup, `engineering-twin` can use the configured Twin Data during normal work. Run `extract-engineering-twin` when historical engineering activity should be analyzed for potential new knowledge.

## Twin Data

A typical user-owned Twin Data repository is:

```text
engineering-twin-data/
├── README.md
├── twin.yaml
├── identity/
├── principles/
├── decisions/
└── projects/
```

Twin Data is stored separately from this Skill repository and is primarily Markdown with YAML metadata.

## Documentation

`docs/` contains the canonical Engineering Twin project specification. These files explain the architecture, data schema, configuration, lifecycle, and historical extraction model.

The `docs/` directory is human-facing documentation and is not an installed Skill dependency.

- `docs/architecture.md` — overall architecture and responsibility boundaries
- `docs/data-schema.md` — Engineering Twin Data structure and schema
- `docs/configuration.md` — local configuration model and discovery precedence
- `docs/lifecycle.md` — installation, setup, usage, extraction, and evolution
- `docs/extraction.md` — historical knowledge extraction model
- `docs/extraction-sources.md` — historical evidence source and access model

## Design Principles

### Human First

Engineering knowledge should remain understandable by humans.

### Markdown Native

Engineering knowledge should primarily be represented as Markdown, with YAML used only for structured metadata.

### Git Native

Engineering knowledge should evolve through normal Git workflows.

### Explicit Over Automatic

AI may suggest knowledge updates, but humans approve permanent changes.

### Context Over History

Store meaningful engineering knowledge rather than raw conversation history.

## What Engineering Twin Is Not

Engineering Twin is not:

- an AI model
- an autonomous agent
- a backend platform
- a database of all conversations
- a replacement for AI-agent configuration

It preserves engineering judgment so humans and AI can collaborate more effectively.
