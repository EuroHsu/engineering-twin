# Engineering Twin

A personal engineering context layer for AI coding agents.

Version: 0.2

Status: Draft

Date: 2026-08-28


## Overview

Engineering Twin helps AI coding agents understand an engineer's:

- identity
- engineering principles
- architectural principles
- technical decisions
- project context

Instead of training a new AI model, Engineering Twin provides a structured context layer that allows existing AI agents to better align with an engineer's way of thinking.


## Why Engineering Twin?

Modern AI coding assistants are powerful at generating code and solving problems.

However, they usually lack understanding of:

- why an engineer chooses certain architectures
- what trade-offs are important
- what decisions were made before
- what engineering principles should be maintained

Engineering Twin preserves this engineering context in a portable and human-readable format.


## Core Concept

Engineering Twin works as a three-layer system:

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

The Skills provide instructions for working with Twin Data.
The Data stores the engineer's identity, principles, decisions, and project context.

The Skills do not contain the user's personal engineering knowledge.


## Design Philosophy

Engineering Twin follows these principles:

### Human First

Knowledge should remain readable and understandable by humans.

### Markdown Native

Engineering knowledge should primarily be represented as Markdown.
Structured metadata may use YAML.

### Git Native

Engineering knowledge evolves through normal Git workflows.

### Explicit Over Automatic

AI may suggest improvements, but humans control updates.

### Context Over History

Store meaningful engineering knowledge, not every conversation.


## Engineering Twin Skills

The repository provides three complementary Skills.

### Engineering Twin

The daily-use Skill for applying personal engineering context during AI-assisted work.

### Setup Engineering Twin

The setup Skill for creating or importing Engineering Twin Data and configuring its location.

### Extract Engineering Twin

The extraction Skill for analyzing historical engineering activity and proposing evidence-backed knowledge candidates for human review.

The three Skills are intentionally separated by responsibility.


## Lifecycle

Engineering Twin follows this lifecycle:

```text
Install Skills
    |
    v
Setup Engineering Twin
    |
    +---- Create ----> Twin Data
    |
    +---- Import ----> Existing Twin Data
    |
    v
Save Twin Data Location
    |
    v
Engineering Twin Configuration
    |
    v
Normal AI-Assisted Work
    |
    v
Engineering Twin Skill
    |
    v
Relevant Engineering Context
    |
    v
Historical Engineering Activity
    |
    v
Extract Engineering Twin
    |
    v
Knowledge Candidate
    |
    v
Human Review
    |
    v
Twin Data Update
```

The Skill repository, local configuration, and user-owned Twin Data are separate concerns.


## Configuration

Engineering Twin Configuration tells the Skill which user-owned Twin Data repository or directory should be used.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Configuration stores environment-specific information such as the Twin Data location.
It does not store engineering knowledge or AI behavior instructions.

For the complete configuration model and discovery precedence, see `docs/configuration.md`.


## Data Structure

A typical Engineering Twin Data repository:

```text
engineering-twin-data/
├── README.md
├── twin.yaml
├── identity/
│   └── profile.md
├── principles/
│   ├── engineering.md
│   ├── architecture.md
│   └── coding.md
├── decisions/
└── projects/
```

`twin.yaml` contains metadata and schema information for this Engineering Twin instance.

Twin Data is user-owned and may be stored separately from the Skill repository.


## Relationship With AI Agents

Engineering Twin does not replace AI agents.

It works together with them:

```text
AI Agent
    +
Engineering Twin Skills
    +
Engineering Twin Data
    =
Personalized Engineering Assistance
```

Engineering Twin provides engineering context.

It does not define general AI behavior, communication style, system prompt policy, or agent-specific workflow rules.

The AI agent remains responsible for reasoning, implementation, and problem solving.

Supported or future integrations may include:

- Claude Code
- Hermes Agent
- MCP-compatible agents
- VS Code AI extensions


## Repository Structure

```text
engineering-twin/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── configuration.md
│   ├── data-schema.md
│   ├── extraction.md
│   ├── extraction-sources.md
│   └── lifecycle.md
└── skills/
    ├── engineering-twin/
    │   └── SKILL.md
    ├── setup-engineering-twin/
    │   ├── SKILL.md
    │   └── templates/
    └── extract-engineering-twin/
        └── SKILL.md
```

The repository contains the Skills, documentation, and setup templates.
It does not contain the user's personal Engineering Twin Data.

The historical evidence access model is documented in `docs/extraction-sources.md`.


## Roadmap

### Foundation

Completed:

- Architecture definition
- Data schema
- Markdown-native Skill model
- Configuration model
- Lifecycle definition
- Historical extraction model
- Historical evidence access model

### Core Skills

Current focus:

- Daily Engineering Twin Skill
- Setup Engineering Twin Skill
- Extract Engineering Twin Skill
- Progressive context usage
- Evidence-backed knowledge candidate review

### Ecosystem

Planned:

- Additional AI agent integrations
- MCP integration
- VS Code integration
- Optional schema validation tooling


## Philosophy

Engineering Twin is not about creating a copy of an engineer.

It is about preserving engineering judgment
so humans and AI can collaborate more effectively.
