# Engineering Twin Skill

Version: 0.3


## Purpose

Engineering Twin provides personal engineering context
for AI coding agents.

It helps AI assistants understand:

- engineer identity
- engineering principles
- previous technical decisions
- project context

The purpose is not to replace AI reasoning,
but to provide structured engineering context
that improves consistency and alignment.


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


Responsibilities:

AI Agent:

- reasoning
- coding
- problem solving

Engineering Twin Skill:

- locate Engineering Twin Data
- validate Twin Data
- load relevant context
- provide structured context to the AI agent
- manage Twin lifecycle

Engineering Twin Data:

- store personal engineering knowledge
- preserve principles and decisions
- evolve through Git history


## Data Location

Engineering Twin Data should be stored separately
from this skill.

Example:

engineering-twin-data/

├── README.md
├── twin.yaml
├── identity/
├── principles/
├── decisions/
└── projects/

The skill should locate the configured
Engineering Twin Data directory before usage.


## Data Discovery

Before loading context,
the skill should locate Engineering Twin Data.

Recommended discovery priority:

1. Explicit configured path
2. Workspace configuration
3. User configured default location
4. Ask user to initialize or attach a Twin Data repository

The skill should verify:

- twin.yaml exists
- schema version is supported
- required directories are available
- data structure follows the supported schema

If no valid Engineering Twin Data is found,
the skill should not create assumptions
about the engineer's identity, principles,
or technical decisions.


## Initialization

When no Engineering Twin Data exists,
the skill may help create a new instance.

Initialization process:

Template
↓
User Input
↓
AI Assisted Draft
↓
Human Review
↓
Twin Data Created

The AI agent may help draft:

- identity information
- engineering principles
- project context
- decision candidates based on evidence

However:

- permanent principles require user confirmation
- decisions should not be generated without evidence
- temporary behavior should not be treated as permanent knowledge


## Attachment

Existing Engineering Twin Data repositories
can be attached to the skill.

The attachment process should:

- validate twin.yaml
- verify schema compatibility
- register the data location
- confirm loaded Twin identity

After attachment,
the skill should be able to locate and load
the configured Engineering Twin Data.


## Loading Strategy

Do not load all data by default.

Load context progressively.

Recommended order:

0. Metadata

Always load:

- schema version
- Twin configuration

1. Identity

Always load:

- engineer role
- technology background
- general engineering context

2. Principles

Load relevant principles based on the task.

Examples:

Architecture question:

- principles/architecture.md

Coding question:

- principles/coding.md

Engineering decision question:

- principles/engineering.md

3. Decisions

Load previous decisions related
to the current topic.

4. Projects

Load project context only when relevant.

Not all data should be loaded
for every conversation.


## Runtime Workflow

The v0.3 runtime follows this sequence:

Twin Data Discovery
↓
Schema Validation
↓
Context Loading
↓
Decision Retrieval
↓
Context Output

The runtime should produce structured context
without changing the Twin Data.

A command-line entrypoint is available at:

`skill/runtime.js`

The entrypoint accepts a JSON options object
and writes a JSON result to standard output.

Example invocation:

`node skill/runtime.js '{"configuredPath":"/path/to/engineering-twin-data","task":{"type":"architecture","query":"database architecture"}}'`


## Context Usage Rules

Engineering Twin information should be treated as guidance.

The AI agent should:

- consider previous decisions
- explain trade-offs
- maintain consistency
- identify conflicts between current context and previous decisions

The AI agent should not:

- blindly follow old decisions
- reject new approaches automatically
- assume previous solutions are always correct

Engineering Twin provides context,
not absolute rules.


## Decision Awareness

When previous decisions exist:

Explain:

- why the previous decision was made
- whether it still applies
- possible differences in the current context

If a previous decision no longer fits,
the AI agent should explain the changed conditions
before suggesting a new approach.


## Evolution

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

Examples of possible updates:

- updated identity information
- new engineering principles
- new decisions
- refined project context

All permanent knowledge updates
require human approval.


## Safety Rules

The AI agent should:

- never modify Twin Data silently
- never invent engineering principles
- never convert temporary behavior into permanent knowledge
- distinguish observation from confirmed knowledge
- request human approval before permanent updates

Observed behavior is not automatically
confirmed engineering knowledge.

Example:

Observation:

"The engineer used technology X in several projects."

Incorrect:

"The engineer prefers technology X."

Correct:

"Technology X appears frequently.
Consider adding this as a principle or decision
after confirmation."


## Non Goals

Engineering Twin is not:

- a replacement for reasoning
- a database of all conversations
- an autonomous learning system
- a model fine-tuning mechanism
- a storage system for raw session history
- an AI behavior configuration system
