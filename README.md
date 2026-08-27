# Engineering Twin

A personal engineering context layer for AI coding agents.


## Overview

Engineering Twin helps AI coding agents understand an engineer's:

- engineering preferences
- architectural principles
- technical decisions
- project context

Instead of training a new AI model, Engineering Twin provides a structured context layer that allows existing AI agents to better align with an engineer's way of thinking.


## Why Engineering Twin?

Modern AI coding assistants are powerful at generating code and solving problems.

However, they usually lack understanding of:

- why an engineer prefers certain architectures
- what trade-offs are important
- what decisions were made before
- what engineering principles should be maintained

Engineering Twin preserves this engineering context in a portable and human-readable format.


## Core Concept

Engineering Twin consists of two parts:

```
Engineering Twin

├── Engineering Twin Skill
│
│   Integration layer for AI coding agents
│
└── Engineering Twin Data
    │
    └── Personal engineering knowledge
```

The Skill tells AI agents how to use the knowledge.

The Data stores the engineer's accumulated experience and decisions.


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

│   └── data-schema.md

│

├── templates/

│   └── engineering-twin-data/

│

└── skill/

    └── SKILL.md
```


## Roadmap

### v0.1 Foundation

Completed:

- Architecture definition
- Data schema
- Data template
- Skill specification


### v0.2 Prototype

Planned:

- Claude Code skill implementation
- Twin Data loading
- Context injection


### v0.3 Evolution

Planned:

- Decision extraction assistance
- Twin improvement suggestions
- Additional AI agent integrations


## Philosophy

Engineering Twin is not about creating a copy of an engineer.

It is about preserving engineering judgment
so humans and AI can collaborate more effectively.
