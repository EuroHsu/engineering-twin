---
name: engineering-twin
description: Provides personal engineering context for AI coding agents. Use when engineer identity, engineering principles, previous technical decisions, or project context may affect the task.
---

# Engineering Twin

Engineering Twin provides structured engineering context to the AI agent.

It does not replace reasoning, coding, or problem solving.

## Activation

`/engineering-twin` is an explicit session-level opt-in command.

When the user invokes `/engineering-twin`:

1. Activate Engineering Twin for the current session.
2. Discover the configured Twin Data.
3. Validate the Twin Data before using it.
4. Load metadata and identity as the initial context.
5. Wait for the user's subsequent engineering task.

Do not treat activation as a permanent user preference or automatically carry it into unrelated sessions.

Before the user explicitly activates this Skill, do not use Engineering Twin Data merely because it exists in the environment.

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

For detailed configuration rules, read `references/configuration.md` bundled with this Skill.

## Discovery and Validation

After activation, before using Engineering Twin context:

1. Look for an explicit Twin Data path provided for the current task.
2. Check for workspace-level Engineering Twin configuration.
3. Check the user-level configuration at `~/.config/engineering-twin/config.yaml`.
4. If no Twin Data location can be determined, continue without engineer-specific assumptions and direct the user to `setup-engineering-twin` when setup is appropriate.

Before using a discovered Twin Data repository:

- verify that `twin.yaml` exists
- verify that the standard knowledge directories are present or intentionally empty
- verify that existing Markdown knowledge is readable

Do not silently select an unrelated Twin Data repository.
Do not silently create, attach, copy, move, or modify Twin Data during discovery.

## Loading Strategy

Do not load all Twin Data by default.

Use the progressive loading guidance in `references/context-loading.md` bundled with this Skill.

Initial activation loads:

1. Metadata
2. Identity

After the user provides a task, load only the relevant:

3. Principles
4. Decisions
5. Projects

Always consider Identity when valid Twin Data is available.
Load other knowledge areas only when relevant to the task.

## Normalized Knowledge

Knowledge may use YAML front matter followed by Markdown. Permanent metadata is intentionally minimal and should contain only:

- `scope`
- `status`

The knowledge type is determined by the destination directory (`identity/`, `principles/`, `decisions/`, or `projects/`).

Treat `status: confirmed` as permanent knowledge. Do not treat candidate content or extraction-only metadata as permanent knowledge.

Existing knowledge without front matter remains valid and should not be rewritten automatically.

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

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` when additional detail is required.
