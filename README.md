# Engineering Twin

A personal engineering context layer for AI coding agents.

## The Problem

AI coding agents are good at reasoning about code, but each new session starts with limited knowledge of the engineer behind the code.

The agent may need to rediscover:

- who the engineer is and what experience shaped their perspective
- how they prefer to design systems and write code
- which technical decisions have already been made and why
- which project-specific constraints or intentional behaviors should not be rediscovered

That context is usually scattered across past sessions, Git history, ADRs, projects, resumes, and engineering notes. Without a durable context layer, the engineer repeatedly explains the same things and the agent repeatedly spends effort reconstructing them.

## The Idea

Engineering Twin turns that scattered history into a small, user-owned body of engineering knowledge that an AI coding agent can consult when it matters.

It does **not** try to remember everything. A piece of information belongs in the Twin only when it can materially affect a future engineering decision and is expected to remain useful beyond the immediate task or development period.

The result is a stable, human-readable knowledge directory that preserves engineering judgment without replacing the agent's own reasoning.

## What It Solves

Engineering Twin is designed to close the gap between:

> **"The agent can write code."**
>
> **"The agent understands how I want engineering decisions to be made."**

It helps the agent start from known engineering context instead of rediscovering the same background every session.

It also keeps that context under human control. New knowledge is proposed from evidence and reviewed before it becomes permanent. Existing knowledge can later be reviewed and kept, edited, removed, superseded, or deferred instead of accumulating indefinitely.

## Design Philosophy

Engineering Twin follows a few simple rules:

- **Human First** — the user decides what becomes permanent knowledge.
- **Decision Value First** — information is kept because it can improve future engineering decisions, not merely because it is interesting or well evidenced.
- **Durable Over Temporary** — prefer stable principles, decisions, constraints, and project context over short-lived state or exhaustive history.
- **Markdown Native** — knowledge stays human-readable, portable, and easy to version with git.
- **Private By Default** — Twin Data belongs to the user; if pushed to a remote, that remote should be private.
- **Explicit Over Automatic** — activation and permanent knowledge changes require deliberate user intent.
- **Context Over History** — preserve the conclusions and constraints that matter; do not turn the Twin into a transcript archive.

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

Engineering Twin is not an AI model, autonomous agent, backend platform, or database of all conversations. It provides structured engineering context to existing AI agents.

## Skills

- `engineering-twin` — activate and use Twin context during the current session (Session Activation / Discover / Load / Interpret / Apply); flags knowledge that may need review, without modifying it
- `setup-engineering-twin` — create or import Twin Data and configure its location (Create / Import / Validate / Configure)
- `extract-engineering-twin` — propose new knowledge candidates from historical evidence, and review existing Twin Data for stale, conflicting, duplicate, or low-value records (Analyze / Propose / Review / Write / Edit / Remove / Supersede)

Each Skill is independently installable and must remain self-contained. Installed Skills must not depend on repository-level documentation files.

### Invocation

`engineering-twin` requires an explicit `/engineering-twin` command. It does not activate itself from conversation content alone.

`setup-engineering-twin` and `extract-engineering-twin` can also be invoked explicitly by name, or triggered automatically when the AI agent recognizes a matching task from natural language (for example, asking to import existing Twin Data, or asking to review Twin Data for outdated knowledge).

## Installation

Engineering Twin is distributed as Skills and can be installed with the [`skills`](https://github.com/vercel-labs/skills) ecosystem.

### Install all three Skills

```bash
npx skills@latest add EuroHsu/engineering-twin -g
```

The installer will:

1. clone the repository
2. discover the three Skills
3. let you select which Skills to install
4. let you choose the target AI coding agents
5. install the selected Skills using the supported installation method

For Claude Code, choose `engineering-twin`, `setup-engineering-twin`, and `extract-engineering-twin`, and install them for Claude Code.

### Install selected Skills

The installer supports selecting individual Skills. You do not need to install all three if only one is needed.

### Update

Update installed Skills using the same ecosystem's update command, or reinstall from the repository. The exact installation location and linking behavior are managed by the Skill installer and may vary by AI agent.

## Quick Start

After installation:

```text
/setup-engineering-twin
    ↓
Create or Import Twin Data
    ↓
Configure Twin Data location
    ↓
/engineering-twin
    ↓
Load relevant engineering context
    ↓
AI Agent reasoning
```

Run `/setup-engineering-twin` to create or import Twin Data.

Run `/engineering-twin` when you want to use the Twin in the current session. Activation is explicit and session-level; it does not permanently change the AI agent's configuration.

Run `/extract-engineering-twin` when you want to analyze resumes, projects, sessions, Git history, pull requests, documents, and other available evidence for potential new knowledge.

### Usage Scenarios

**Start empty, import history, or do both.**

There is no fixed order between `/extract-engineering-twin` and `/engineering-twin`. Which one to run first depends on whether there is existing history worth importing.

**An engineer with an existing history** — past projects, AI coding sessions, Git history, resumes, or documents worth preserving:

```text
/setup-engineering-twin
    ↓
/extract-engineering-twin (import knowledge from past projects, sessions, Git history, etc.)
    ↓
/engineering-twin (start using an already-populated Twin)
```

**An engineer starting fresh** — a junior engineer, or anyone without a meaningful history to import yet:

```text
/setup-engineering-twin
    ↓
/engineering-twin (start using an empty Twin right away)
    ↓
Twin Data evolves over time through ongoing use and periodic /extract-engineering-twin reviews
```

Both paths are valid, and an engineer can switch between them at any time: `/extract-engineering-twin` can be run before first use, or later once more history has accumulated.

### First-Time Example

```text
> /setup-engineering-twin
  "Create a new empty Engineering Twin Data at ~/workspace/my-engineering-twin-data"
  → creates identity/, principles/, decisions/, projects/, and a README.md
  → configures it as the active Twin Data

> /engineering-twin
  → discovers and validates the configured Twin Data
  → loads initial context
  → ready for the next engineering task

> /extract-engineering-twin
  "Look at my recent Git history and propose new knowledge candidates"
  → analyzes available evidence and proposes candidates
  → you accept, edit, reject, or defer each one
  → accepted candidates are written to Twin Data only after your approval
```

## Twin Data

```text
engineering-twin-data/
├── README.md
├── identity/
├── principles/
├── decisions/
└── projects/
```

Twin Data is stored separately from this repository and is a stable, human-readable knowledge directory. It is primarily Markdown with optional YAML front matter for permanent knowledge.

Twin Data contains personal engineering knowledge. Because it is plain Markdown, it works naturally under git version control if the user chooses to track it — this is an optional, user-owned choice and is not initialized, required, or managed by the Skills. If Twin Data is pushed to a git remote, the repository should be private.

Permanent knowledge should keep only metadata that helps future engineering decisions:

```yaml
---
scope: personal | general | technology-specific | project-specific | situation-specific
status: confirmed | superseded
---
```

The knowledge type is defined by the destination directory:

```text
identity/
= who the engineer is

principles/
= general engineering values and practices

decisions/
= specific technical choices, reasoning, and trade-offs

projects/
= project-specific context
```

`README.md` describes the Twin Data container and its knowledge areas. It is not itself engineering knowledge.

The Skills validate whether a Twin Data directory is structurally usable and its Markdown is readable. They do not require schema versions or migration steps for ordinary evolution.

## Configuration

Configuration answers **which Twin Data should be used**. Twin Data answers **what the Twin knows**.

The recommended user-level configuration is:

```text
~/.config/engineering-twin/config.yaml
```

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Configuration is local and environment-specific. It does not contain engineering knowledge or replace the AI agent's own configuration.

Discovery priority:

```text
Explicit task path
    ↓
Workspace configuration
    ↓
User configuration
    ↓
No configured Twin
```

## Historical Extraction

`extract-engineering-twin` analyzes evidence that is actually available through the current AI-agent environment, such as:

- AI coding agent sessions
- Git history
- pull requests and reviews
- architecture or technical documents
- resumes, portfolios, and user-provided records
- existing projects

Evidence must be bounded to the requested scope. Historical sessions are evidence, not authoritative statements of engineering preference.

Known local session sources are resolved relative to the user's home directory when applicable. Examples include:

```text
Claude Code
$HOME/.claude/projects/

Gemini CLI
$HOME/.gemini/tmp/

GitHub Copilot CLI
$HOME/.copilot/session-state/
```

Other sources may be available through the current AI-agent environment or integrations. The extraction Skill must only use evidence that is actually accessible and must retain enough review information to explain important candidates.

## Knowledge Evolution

Knowledge evolves through a human-controlled lifecycle.

For new knowledge:

```text
Engineering Activity
    ↓
Evidence
    ↓
Observation / Pattern
    ↓
Knowledge Candidate
    ↓
Decision Value Test
    ↓
Human Review
    ↓
Twin Data Update
```

Candidates may be accepted, edited, rejected, or deferred. An accepted or edited candidate becomes permanent knowledge only after explicit user approval.

For existing knowledge:

```text
Existing Twin Data
    ↓
Review Signal (engineering-twin) or explicit audit request
    ↓
extract-engineering-twin review
    ↓
Human Review
    ↓
Keep / Edit / Remove / Supersede / Defer
```

`Keep` leaves the record unchanged. `Edit` requires review of the complete revised record before writing. `Remove` deletes a record that has no sufficient ongoing decision value or is incorrect/duplicative. `Supersede` applies only when an existing decision is explicitly replaced by a newer decision; the older record remains as historical context with `status: superseded`. `Defer` leaves the record unchanged for later review.

Engineering Twin may identify concrete signs of stale or conflicting knowledge, but it does not modify Twin Data directly.

## Repository Boundary

```text
README.md
= project overview and human-facing specification

skills/<skill>/
= complete installable Skill instructions and bundled references

User-owned Twin Data
= engineering knowledge, stored separately
```

The repository does not contain a user's personal Twin Data, and installed Skills do not depend on files outside their own Skill directories for normal operation.
