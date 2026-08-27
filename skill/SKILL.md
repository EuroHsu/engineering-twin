# Engineering Twin Skill

Version: 0.1


## Purpose

Engineering Twin provides personal engineering context
for AI coding agents.

It helps AI assistants understand:

- engineer background
- engineering principles
- previous technical decisions
- project context


## Core Concept

Engineering Twin does not replace the AI agent.

It provides additional context.

The relationship:

AI Agent

+

Engineering Twin Skill

+

Engineering Twin Data

=

Personalized Engineering Assistance


## Data Location

Engineering Twin Data should be stored separately
from this skill.

Example:

engineering-twin-data/

├── twin.yaml

├── identity/

├── principles/

├── decisions/

└── projects/


The skill should locate the configured
Engineering Twin Data directory before usage.


## Loading Strategy

Do not load all data by default.

Load context progressively.


Recommended order:


1. Identity

Always load:

- engineer role
- technology background
- general preferences


2. Principles

Load relevant principles based on the task.


Examples:

Architecture question:

- principles/architecture.md


Coding question:

- principles/coding.md


3. Decisions

Load previous decisions related
to the current topic.


4. Projects

Load project context only when relevant.


## Context Usage Rules

Engineering Twin information should be treated as guidance.

The AI agent should:

- consider previous decisions
- explain trade-offs
- maintain consistency


The AI agent should not:

- blindly follow old decisions
- reject new approaches automatically
- assume previous solutions are always correct


## Decision Awareness

When previous decisions exist:

Explain:

- why the previous decision was made
- whether it still applies
- possible differences in the current context


## Evolution

Engineering Twin Data should evolve through:

Observation

↓

Decision Candidate

↓

Human Review

↓

Twin Data Update


The AI agent may suggest improvements,
but should not modify Twin Data automatically.


## Non Goals

Engineering Twin is not:

- a replacement for reasoning
- a database of all conversations
- an autonomous learning system
- a model fine-tuning mechanism
