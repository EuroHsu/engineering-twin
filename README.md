# Engineering Twin

A personal engineering context layer for AI coding agents.

Version: 0.3

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

```
AI Agent
    |
    | uses
    v
Engineering Twin Skill
    |
    | loads
    v
Engineering Twin Data
```

The Skill provides the mechanism for discovering, validating, and loading Twin Data.

The Data stores the engineer's identity, principles, decisions, and project context.


## Design Philosophy

Engineering Twin follows these principles:

### Human First

Knowledge should remain readable and understandable by humans.

### Git Native

Engineering knowledge evolves through normal Git workflows.

### Explicit Over Automatic

AI may suggest improvements, but humans control updates.

### Context Over History

Store meaningful engineering knowledge, not every conversation.


## Data Structure

A typical Engineering Twin Data repository:

```
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


## Runtime

Engineering Twin v0.3 provides a local runtime that:

- discovers Twin Data
- validates the Twin Data schema
- loads relevant engineering context
- retrieves related decisions
- produces structured context output

The runtime is agent-neutral and does not define AI behavior.


## Relationship With AI Agents

Engineering Twin does not replace AI agents.

It works together with them:

```
Engineer

    +

Engineering Twin

    +

AI Coding Agent

    =

Personalized Engineering Assistance
```

Engineering Twin provides engineering context.

It does not define AI behavior, communication style, or agent-specific instructions.

The AI agent remains responsible for reasoning, implementation, and problem solving.

Supported or future integrations may include:

- Claude Code
- Hermes Agent
- MCP compatible agents
- VS Code AI extensions


## Project Structure

```
engineering-twin/

├── docs/
│   ├── architecture.md
│   ├── data-schema.md
│   └── v0.3-prototype.md
│
├── src/
│   ├── discovery/
│   ├── validator/
│   ├── context/
│   └── runtime/
│
├── tests/
│   ├── discovery/
│   ├── validator/
│   ├── context/
│   └── runtime/
│
├── templates/
│   └── engineering-twin-data/
│
└── skill/
    ├── SKILL.md
    └── runtime.js
```

`skill/SKILL.md` defines the Engineering Twin Skill specification.

`skill/runtime.js` provides a command-line entrypoint for the runtime.


## Roadmap

### v0.2 Foundation

Completed:

- Architecture definition
- Data schema
- Data template
- Skill specification


### v0.3 Prototype

In progress:

- Twin Data discovery
- Twin Data validation
- Context loading
- Decision retrieval
- Runtime orchestration
- Structured context output
- Claude Code integration groundwork


### v0.4 Evolution

Planned:

- Decision candidate extraction assistance
- Twin knowledge improvement suggestions
- Additional AI agent integrations


## Philosophy

Engineering Twin is not about creating a copy of an engineer.

It is about preserving engineering judgment
so humans and AI can collaborate more effectively.
