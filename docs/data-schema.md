# Engineering Twin Data Schema

Version: 0.1

Status: Draft

Date: 2026-08-28


# 1. Overview

Engineering Twin Data is a Git-based personal engineering
knowledge repository.

It stores an engineer's:

- identity
- engineering principles
- technical decisions
- project experiences

The purpose is to provide structured context
for AI coding agents.

Engineering Twin Data is designed to be:

- human readable
- AI consumable
- Git version controlled
- portable across environments


# 2. Design Principles


## 2.1 Human First

All Engineering Twin Data should be understandable
by humans without requiring special tools.


## 2.2 Markdown Native

Knowledge content should primarily use Markdown.

Structured metadata may use YAML.


## 2.3 Explicit Knowledge Over Raw History

Engineering Twin Data stores meaningful knowledge,
not complete conversation history.

Examples:

Store:

- architectural decisions
- engineering preferences
- technical principles


Do not store:

- every AI conversation
- temporary debugging logs
- raw session dumps


## 2.4 Evolution Through Git

Changes to Engineering Twin Data should be tracked
through normal Git workflows.

Git history represents the evolution
of engineering thinking.


# 3. Directory Structure

A standard Engineering Twin Data repository:

engineering-twin-data/

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


# 4. Root Configuration


## twin.yaml

Purpose:

Store metadata about this Engineering Twin instance.


Example:


version: 0.1

name: My Engineering Twin

created: 2026-08-28

language:
  primary: zh-TW


Fields:

| Field | Description |
|---|---|
| version | Schema version |
| name | Twin name |
| created | Creation date |
| language | Preferred language |


# 5. Identity Layer


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


# 6. Principles Layer


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


# 7. Decisions Layer


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


# 8. Projects Layer


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


# 9. Data Loading Priority


When an AI agent loads Engineering Twin Data,
the recommended priority is:


Identity

↓

Relevant Principles

↓

Relevant Decisions

↓

Project Context


Not all data should be loaded
for every conversation.


# 10. Future Extensions


Possible future additions:

- decision relationships
- automatic candidate extraction
- schema validation
- semantic search metadata
- AI agent adapters


Future extensions should preserve
the core design:

Markdown + YAML + Git
