# Engineering Twin Data Schema

Version: 0.2

Status: Draft

Date: 2026-08-28


# 1. Overview

Engineering Twin Data is a Git-based personal engineering
knowledge repository.

It stores an engineer's:

- identity
- engineering principles
- technical decisions
- project context

The purpose is to provide structured context
for AI coding agents.

Engineering Twin Data is designed to be:

- human readable
- AI consumable
- Git version controlled
- portable across environments


# 2. Schema Versioning

The current Engineering Twin Data schema version is `0.2`.

New Twin Data created by `setup-engineering-twin` must use:

```yaml
version: 0.2
```

Schema currency and import compatibility are separate concerns.

The following versions are currently defined:

| Version | Status | Import | Create |
|---|---|---|---|
| 0.2 | Current | Yes | Yes |
| 0.1 | Legacy | Yes, when compatible | No |

Legacy `0.1` data may remain in its existing format after Import.
The setup process must not silently migrate it.

Migration is a separate, explicit operation governed by the generic
Engineering Twin Data migration workflow. A supported source/target
version pair must have its own documented mapping rules.

Legacy `0.1` data may use an earlier nested declaration:

```yaml
version: 0.1
schema:
  version: 0.1
```

When multiple version declarations are present, they must agree.
Conflicting declarations are a validation error.

A future version greater than the supported current version is not
automatically accepted.


# 3. Design Principles


## 3.1 Human First

All Engineering Twin Data should be understandable
by humans without requiring special tools.


## 3.2 Markdown Native

Knowledge content should primarily use Markdown.

Structured metadata may use YAML.


## 3.3 Explicit Knowledge Over Raw History

Engineering Twin Data stores meaningful knowledge,
not complete conversation history.

Examples:

Store:

- engineering principles
- technical decisions
- reusable engineering knowledge


Do not store:

- every AI conversation
- temporary debugging logs
- raw session dumps


## 3.4 Evolution Through Git

Changes to Engineering Twin Data should be tracked
through normal Git workflows.

Git history represents the evolution
of engineering thinking.


# 4. Directory Structure

A standard Engineering Twin Data repository:

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

│   └── XXXX-decision-name.md

└── projects/

    └── project-name.md


# 5. Root Configuration


## twin.yaml

Purpose:

Store metadata about this Engineering Twin instance.


Current example:

```yaml
version: 0.2
name: My Engineering Twin
created: 2026-08-28
language:
  primary: zh-TW
```

Fields:

| Field | Description |
|---|---|
| version | Schema version |
| name | Twin name |
| created | Creation date |
| language | Preferred language |

The current `0.2` schema uses the root `version` field.


# 6. Identity Layer


## Purpose

Identity describes:

"Who is this engineer?"


Location:

identity/profile.md


Example:


# Profile

Role:

Backend Engineer


Primary Technologies:

- Node.js
- Express
- MySQL
- AWS


Engineering Focus:

- Maintainability
- System reliability
- Clear architecture boundaries


Identity should contain:

- role
- experience background
- primary technology stack
- engineering interests


Identity should NOT contain:

- temporary project details
- individual technical decisions


# 7. Principles Layer


## Purpose

Principles describe:

"What does this engineer value?"


Location:

principles/*.md


Examples:

principles/

├── engineering.md

├── architecture.md

└── coding.md


Example:


# Architecture Principles

## Prefer Explicit Boundaries

Systems should have clear responsibility boundaries.


## Prefer Maintainability

Long-term maintainability is preferred
over short-term implementation speed.


Principles are:

- long-lived
- general
- reusable across projects


Principles should NOT contain:

- single project decisions
- temporary solutions


# 8. Decisions Layer


## Purpose

Decisions describe:

"How did this engineer make choices?"


Location:

decisions/


Example:

decisions/

├── 0001-ecs-over-lambda.md

└── 0002-mysql-over-postgresql.md


## Decision Format


# Decision 0001


## Metadata

Date:

2026-08-28


Status:

accepted


Topic:

architecture


Tags:

- aws
- deployment


## Context

Describe the problem and situation.


## Options Considered


### Option A

Description.


### Option B

Description.


## Decision

The chosen approach.


## Reasoning

Why this option was selected.


## Principle Extracted

Related engineering principle.


## Confidence

High


## Related Projects

- project-name


## Decision Status

Supported statuses:

| Status | Description |
|---|---|
| proposed | Candidate decision |
| accepted | Current decision |
| superseded | Replaced by newer decision |
| rejected | Considered but not chosen |


# 9. Projects Layer


## Purpose

Projects provide project-specific context.


Location:

projects/


Example:

projects/

└── game-platform.md


Example:


# Game Platform


## Overview

Online gaming platform.


## Technology Stack

- React
- Node.js
- MySQL
- AWS


## Related Decisions

- 0001-ecs-over-lambda
- 0002-database-design


Projects connect:

- principles
- decisions
- implementation context


# 10. Data Loading Priority


When an AI agent loads Engineering Twin Data,

the recommended priority is:


Metadata

↓

Identity

↓

Relevant Principles

↓

Relevant Decisions

↓

Project Context


Not all data should be loaded
for every conversation.


# 11. Evolution and Safety


Engineering Twin Data should evolve through:


Observation

↓

Knowledge Candidate

↓

Human Review

↓

Twin Knowledge Update


The AI agent may suggest improvements,
but should not modify Twin Data automatically.


The AI agent should:

- never modify Twin Data silently
- never invent engineering principles
- never convert temporary behavior into permanent knowledge
- distinguish observation from confirmed knowledge
- request human approval before permanent updates


Example:


Observation:

"The engineer used technology X in several projects."


Incorrect:

"The engineer prefers technology X."


Correct:

"Technology X appears frequently.
Consider adding this as a principle or decision
after confirmation."


# 12. Future Extensions


Possible future additions:

- decision relationships
- automated insight extraction
- schema validation
- semantic search metadata
- AI agent adapters


Future extensions should preserve

the core design:

Markdown + YAML + Git
