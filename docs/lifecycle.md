# Engineering Twin Lifecycle

Version: 0.1

Status: Draft

Date: 2026-08-28


## 1. Purpose

The Engineering Twin lifecycle describes how Skills, Configuration,
and user-owned Engineering Twin Data work together over time.

The lifecycle separates:

- Skill installation
- Twin Data setup
- Configuration
- Daily context usage
- Historical knowledge extraction
- Knowledge evolution


## 2. Components

Engineering Twin has three persistent concerns:

```text
Skill Repository
    |
    +-- provides AI agent Skills

User Configuration
    |
    +-- identifies which Twin Data to use

Engineering Twin Data
    |
    +-- stores engineering knowledge
```

These concerns must remain independent.


## 3. Installation

Installation makes the Engineering Twin Skills available to an AI agent.

Installation does not create or import a user's Engineering Twin Data.

After installation, the user has access to:

- `engineering-twin`
- `setup-engineering-twin`
- `extract-engineering-twin`

The exact installation mechanism may vary by AI agent or Skill ecosystem.


## 4. Initial Setup

After installation, the user runs the Setup Engineering Twin Skill.

The Setup Skill asks the user to choose:

```text
Create
or
Import
```

### Create

```text
User chooses Create
        |
        v
Choose destination
        |
        v
Create Twin Data structure
        |
        v
Collect user-provided information
        |
        v
Draft Markdown knowledge
        |
        v
Human Review
        |
        v
Persist approved Twin Data
        |
        v
Save Twin Data location in Configuration
```

### Import

```text
User chooses Import
        |
        v
Locate existing Twin Data
        |
        v
Validate schema
        |
        v
Confirm with user
        |
        v
Save Twin Data location in Configuration
```

Import does not copy or relocate existing Twin Data automatically.


## 5. Configuration

Configuration records which Twin Data should be used.

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Configuration is environment-specific and is normally stored outside
Engineering Twin Data.

The configuration does not contain engineering knowledge.


## 6. Daily Usage

During normal AI-assisted work:

```text
AI Agent
    |
    v
Engineering Twin Skill
    |
    v
Read Configuration
    |
    v
Locate Twin Data
    |
    v
Load relevant context
    |
    v
AI Agent Reasoning
```

The daily Skill does not initialize Twin Data when configuration is missing.
It directs the user to Setup Engineering Twin instead.

Context should be loaded progressively:

```text
Metadata
   ↓
Identity
   ↓
Relevant Principles
   ↓
Relevant Decisions
   ↓
Relevant Projects
```

Not all Twin Data should be loaded for every task.


## 7. Historical Knowledge Extraction

The Extract Engineering Twin Skill analyzes historical engineering activity
when the user asks to discover potential Twin knowledge.

```text
Historical Engineering Activity
        |
        v
Evidence
        |
        v
Observation / Pattern
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

Possible evidence sources include:

- AI coding agent sessions
- Git history
- pull requests and reviews
- architecture or technical decision documents
- other user-provided engineering records

Extraction does not automatically modify Twin Data.


## 8. Knowledge Evolution

Engineering knowledge evolves through human-controlled updates:

```text
Engineering Activity
        |
        v
Observation / Insight
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

AI may identify candidates and draft changes.

AI must not silently convert observations into permanent knowledge.

Permanent Twin Data updates require human approval.


## 9. Separation of Responsibilities

```text
setup-engineering-twin
    = Create / Import / Validate / Configure

engineering-twin
    = Discover / Load / Interpret / Apply

extract-engineering-twin
    = Analyze historical evidence / Propose candidates
```

Each Skill has a separate responsibility and none replaces the AI agent's
reasoning capability.


## 10. Separation of Concerns

The lifecycle must preserve these boundaries:

```text
Skill Repository
    = How the AI uses the Twin

User Configuration
    = Which Twin the AI uses

Engineering Twin Data
    = What the Twin knows

AI Agent Configuration
    = How the AI behaves
```

Engineering Twin does not replace the AI agent's own configuration.


## 11. Portability

Engineering Twin Data is portable because it is stored independently
of the Skill repository and local configuration.

A user may move the Twin Data repository to another machine and
recreate the local Configuration to point to the new location.

The core knowledge format remains:

```text
Markdown + YAML + Git
```
