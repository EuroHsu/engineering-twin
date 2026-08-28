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

Engineering Twin is not an AI model, autonomous agent, backend platform, or database of all conversations. It provides structured engineering context to existing AI agents.

## Skills

- `engineering-twin` — activate and use Twin context during the current session
- `setup-engineering-twin` — create or import Twin Data and configure its location
- `extract-engineering-twin` — analyze historical engineering activity and propose knowledge candidates

### Skill Responsibilities

```text
setup-engineering-twin
    = Create / Import / Validate / Configure

engineering-twin
    = Session Activation / Discover / Load / Interpret / Apply

extract-engineering-twin
    = Analyze historical evidence / Propose / Review / Write Knowledge
```

Each Skill is independently installable and must remain self-contained. Installed Skills must not depend on repository-level documentation files.

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

When a newer version is published, update the installed Skills through the same Skill ecosystem's supported update command or reinstall from the repository.

The exact global installation location and linking behavior are managed by the Skill installer and may vary by AI agent.

## Quick Start

After installation:

```text
setup-engineering-twin
    ↓
Create or Import Twin Data
    ↓
Configure Twin Data location
    ↓
/engineering-twin
    ↓
Use Twin context in the current session
```

Run `setup-engineering-twin` to create or import Twin Data.

Run `/engineering-twin` when you want to use the Twin in the current session. Activation is explicit and session-level; it does not permanently change the AI agent's configuration.

Run `extract-engineering-twin` when you want to analyze resumes, projects, sessions, Git history, pull requests, documents, and other available evidence for potential new knowledge.

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

Twin Data is stored separately from this repository and is primarily Markdown with optional YAML front matter. Permanent knowledge should keep only metadata that helps future engineering decisions:

```yaml
---
scope: personal | general | technology-specific | project-specific | situation-specific
status: confirmed | superseded | deprecated
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

`twin.yaml` is human-readable Twin metadata. It identifies the Twin Data and may contain fields such as name, creation date, and primary language. It is not a schema manifest or migration contract.

Twin Data is intentionally a stable, human-readable knowledge directory rather than a formally versioned data format. The Skills validate whether the directory is understandable and structurally usable; they do not require version upgrades for ordinary evolution.

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

## Lifecycle

```text
Install Skills
      ↓
Create / Import Twin Data
      ↓
Configure Twin Data location
      ↓
Activate /engineering-twin for a session
      ↓
Load relevant engineering context
      ↓
AI Agent reasoning
```

Knowledge evolution follows a separate human-controlled path:

```text
Engineering Activity
      ↓
Evidence
      ↓
Observation / Pattern
      ↓
Knowledge Candidate
      ↓
Human Review
      ↓
Twin Data Update
```

Import verifies whether an existing human-readable Twin Data directory can be understood by the current Skills. It does not require schema migration simply because the Skill implementation has evolved.

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

Engineering Twin uses explicit human review for permanent knowledge updates.

```text
Evidence
   ↓
Observation / Pattern
   ↓
Knowledge Candidate
   ↓
Human Review
   ↓
Twin Data
```

Candidates may be accepted, edited, rejected, or deferred. The AI must not silently promote observations or historical behavior into permanent engineering knowledge.

## Design Principles

- Human First
- Markdown Native
- Git Native
- Explicit Over Automatic
- Context Over History

Engineering Twin preserves engineering judgment; it does not replace AI reasoning or define the agent's own behavior.

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
