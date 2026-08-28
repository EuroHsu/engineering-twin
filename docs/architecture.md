# Engineering Twin Architecture

Engineering Twin is a personal engineering context layer for AI coding agents.

## Core Model

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

```text
AI Agent
= reasoning, coding, problem solving

Engineering Twin Skills
= discovering, setting up, using, and evolving Twin context

Engineering Twin Data
= user-owned engineering knowledge
```

## Skills

```text
setup-engineering-twin
= Create / Import / Validate / Configure

engineering-twin
= Session Activation / Discover / Load / Interpret / Apply

extract-engineering-twin
= Analyze historical evidence / Propose candidates
```

The Skills provide instructions to the AI agent. They are not separate reasoning engines.

## Separation of Concerns

```text
Skill Repository
= installable agent instructions and bundled resources

User Configuration
= identifies which Twin Data to use

Engineering Twin Data
= stores engineering knowledge

AI Agent Configuration
= controls agent behavior and workflow
```

Skill packages must not depend on repository-level `docs/` files for normal operation.

## Data Model

Engineering Twin Data contains five areas:

```text
Metadata
Identity
Principles
Decisions
Projects
```

The knowledge format is primarily:

```text
Markdown + YAML + Git
```

## Lifecycle

```text
Setup
  |
  v
Twin Data
  |
  v
Session Activation
  |
  v
Relevant Context
  |
  v
AI-assisted Work
  |
  v
Historical Evidence
  |
  v
Knowledge Candidate
  |
  v
Human Review
  |
  v
Twin Data Evolution
```

See the individual Skill packages for operational instructions and references.