---
name: extract-engineering-twin
description: Extracts evidence-backed engineering knowledge candidates from historical engineering activity and prepares them for human review. Use when the user wants to analyze past sessions, Git history, PRs, or other engineering activity for potential Twin knowledge.
---

# Extract Engineering Twin

This Skill analyzes historical engineering activity to identify candidate knowledge for the user's Engineering Twin.

It is separate from both the daily-use `engineering-twin` Skill and the `setup-engineering-twin` Skill.

## Core Responsibility

The Extract Engineering Twin Skill answers:

> What engineering knowledge might be worth preserving from past engineering activity?

It does not decide what should become permanent Twin knowledge.

## Evidence Sources

Use historical engineering evidence that is available in the current environment, such as:

- AI coding agent sessions
- Git commits and history
- pull requests and reviews
- architecture or technical decision documents
- other user-provided engineering records

Do not require any single evidence source when another reliable source is available.

## Extraction Workflow

Follow this workflow:

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

### 1. Identify the Scope

Confirm or infer the historical scope from the user's request, such as:

- a time period
- one or more projects
- selected sessions
- a technology or architecture topic
- a set of commits or pull requests

Do not expand the scope unnecessarily.

### 2. Gather Evidence

Inspect available historical sources within the requested scope.

Prefer concrete evidence over assumptions.

Record enough context to show why a candidate was identified.

### 3. Separate Observation From Interpretation

Clearly distinguish:

- what the evidence shows
- what pattern appears to exist
- what engineering principle or decision might be inferred

Repeated behavior alone does not prove a personal preference.

### 4. Produce Knowledge Candidates

Candidates may include:

- engineering principles
- architecture principles
- technical decisions
- reusable engineering knowledge
- project context refinements

Each candidate should include its supporting evidence and uncertainty.

### 5. Human Review

Present candidates for explicit review.

The user may:

- accept
- reject
- edit
- defer

Do not write accepted candidates into Twin Data until the user's decision is clear.

## Candidate Format

Use a format similar to:

```text
Knowledge Candidate

Type:
Principle | Decision | Project Context | Other

Candidate:
<proposed knowledge>

Evidence:
- <historical evidence>
- <historical evidence>

Interpretation:
<why the evidence supports the candidate>

Confidence:
Low | Medium | High

Suggested Location:
<Engineering Twin Data path>
```

The candidate is a proposal, not confirmed Twin knowledge.

## Knowledge Safety

- Never invent evidence.
- Never claim a preference that the evidence does not support.
- Never convert repeated behavior into a permanent principle without human confirmation.
- Never silently modify Engineering Twin Data.
- Never modify the Skill repository as part of extraction.
- Preserve uncertainty when evidence is ambiguous or conflicting.

Example:

```text
Observation:
The engineer selected technology X in three projects.

Candidate:
Technology X may be preferred in situations with constraints A and B.

Status:
Requires human confirmation.
```

Do not automatically conclude:

```text
The engineer prefers technology X.
```

## Relationship With Other Skills

`setup-engineering-twin` creates or imports Twin Data and configures its location.

`engineering-twin` uses confirmed Twin Data during normal AI-assisted work.

`extract-engineering-twin` analyzes historical engineering activity and proposes candidates for future Twin Data updates.

The three Skills form a lifecycle but remain independently responsible:

```text
Setup
  |
  v
Twin Data
  |
  v
Daily Engineering Work
  |
  v
Historical Evidence
  |
  v
Extraction
  |
  v
Knowledge Candidate
  |
  v
Human Review
  |
  v
Twin Data
```
