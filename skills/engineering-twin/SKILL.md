---
name: engineering-twin
description: Provides personal engineering context for AI coding agents. Use when engineer identity, engineering principles, previous technical decisions, or project context may affect the task.
---

# Engineering Twin

Engineering Twin provides structured engineering context to the AI agent.

It does not replace reasoning, coding, or problem solving.

## Core Model

The relationship is:

AI Agent
+
Engineering Twin Skill
+
Engineering Twin Data
=
Personalized Engineering Assistance

The AI agent remains responsible for reasoning and execution.
The Skill defines how Engineering Twin Data should be discovered and used.
The Data contains the engineer's engineering knowledge.

## Twin Data

Engineering Twin Data is a separate, user-owned repository or directory.

Expected structure:

```text
engineering-twin-data/
├── README.md
├── twin.yaml
├── identity/
├── principles/
├── decisions/
└── projects/
```

Do not assume that the Skill repository and Twin Data are the same location.
The Skill repository contains instructions; the Twin Data contains the engineer's knowledge.

## Configuration

The Skill uses Engineering Twin Configuration to determine which Twin Data should be used.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Configuration stores environment-specific information such as the Twin Data location.
It does not store engineering knowledge, engineering principles, technical decisions, or AI behavior instructions.

For the configuration model and precedence rules, see `docs/configuration.md` in the Engineering Twin repository.

## Discovery

Before using Engineering Twin context:

1. Look for an explicit Twin Data path provided for the current task.
2. Check for workspace-level Engineering Twin configuration.
3. Check the user-level configuration at `~/.config/engineering-twin/config.yaml`.
4. If no Twin Data location can be determined, continue without engineer-specific assumptions.

Before using a discovered Twin Data repository:

- verify that `twin.yaml` exists
- verify that the schema version is supported
- verify that the structure is compatible with the Engineering Twin Data schema

Do not silently select an unrelated Twin Data repository.
Do not silently create, attach, copy, move, or modify Twin Data during discovery.

## Loading Strategy

Do not load all Twin Data by default.

Load context progressively:

1. Metadata
2. Identity
3. Relevant Principles
4. Relevant Decisions
5. Relevant Projects

Always consider Identity when valid Twin Data is available.
Load Principles, Decisions, and Projects only when relevant to the task.

## Using Context

Treat Engineering Twin Data as guidance, not absolute rules.

- Consider previous decisions.
- Explain relevant trade-offs.
- Maintain consistency when appropriate.
- Identify conflicts between current context and previous decisions.
- Do not blindly follow outdated decisions.
- Do not assume previous solutions are always correct.

When a previous decision may no longer apply, explain the changed conditions before recommending a different approach.

## Knowledge Safety

- Never invent engineer identity, preferences, principles, or decisions.
- Do not treat temporary behavior as permanent knowledge.
- Do not modify Twin Data silently.
- Permanent Twin Data updates require human approval.

Observed behavior is not automatically confirmed engineering knowledge.

## Scope

Engineering Twin defines how engineering context is used.

It does not define:

- communication style
- general AI behavior
- system prompt policy
- agent-specific workflow rules

Those concerns belong to the AI agent's own configuration, such as `CLAUDE.md`.

## Setup

Creating or importing Twin Data is handled by the `setup-engineering-twin` Skill.

Do not use the daily Engineering Twin Skill to initialize a new Twin Data repository.
