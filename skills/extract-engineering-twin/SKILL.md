---
name: extract-engineering-twin
description: Extracts evidence-backed engineering knowledge candidates from historical engineering activity and user-provided source material. Use when the user wants to build or enrich a Twin from past sessions, projects, resumes, documents, Git history, PRs, or other available records.
---

# Extract Engineering Twin

This Skill analyzes existing evidence to identify candidate knowledge for the user's Engineering Twin.

It is separate from both the daily-use `engineering-twin` Skill and the `setup-engineering-twin` Skill.

## Core Responsibility

The Extract Engineering Twin Skill answers:

> What engineering knowledge might be worth preserving from existing evidence?

It is also the primary knowledge-acquisition path for populating a newly created Twin from existing personal or project material.

It does not decide what should become permanent Twin knowledge.

## Evidence Types

Use evidence that is actually accessible through the current AI-agent environment.

### Behavioral Evidence

Behavioral evidence shows what the engineer did or decided in practice. Examples include:

- AI coding agent sessions
- local Git history
- pull request discussions and reviews
- implementation history
- recorded engineering activity

Behavioral evidence can support patterns, practices, decisions, and project context, but repeated behavior alone does not prove a universal preference.

### Declarative Evidence

Declarative evidence shows how the engineer describes their own background, experience, technologies, projects, or engineering approach. Examples include:

- resume or CV
- portfolio or personal project descriptions
- architecture or technical documents
- user-authored engineering notes or articles
- user-provided Markdown or text records

Declarative evidence can directly support stated identity, experience, technology context, project context, or explicitly stated preferences. Do not turn a declared fact into a stronger inferred preference without supporting evidence.

Other source types may be available through integrations or the current environment. Do not assume that any specific source is accessible.

For provider-specific session locations and access rules, read `references/evidence-sources.md` bundled with this Skill.

For the normalized candidate and permanent-data format, read `references/knowledge-format.md` bundled with this Skill.

## Extraction Workflow

Follow this workflow:

```text
Evidence Source
      |
      v
    Evidence
      |
      v
Observation / Pattern
      |
      v
Interpretation
      |
      v
Knowledge Candidate
      |
      v
Human Review
      |
      v
Normalized Twin Data
```

### 1. Select the Source and Scope

First establish what the user wants to extract and from which source or sources.

Possible scopes include:

- a resume or CV
- one or more existing projects
- selected files or documents
- a time period of AI coding sessions
- Git history or pull requests
- a technology or architecture topic
- a combination of sources

When the scope is ambiguous, ask the user rather than expanding the search unnecessarily.

### 2. Gather Evidence

Inspect the most relevant available sources within the requested scope.

Prefer concrete evidence over assumptions.

For important observations, retain enough provenance for a human to verify the claim.

Record, when available:

- source type
- source identifier or location
- relevant date or range
- project or topic
- concise evidence summary or excerpt
- whether the evidence is explicit, observed, or inferred

Do not reproduce large historical records when a concise reference is sufficient.

### 3. Evaluate Evidence Strength

Use the following as a default guide:

1. explicit technical decisions or written rationale
2. human-authored engineering or project documentation
3. explicit statements in resumes, CVs, or user-authored records
4. pull request discussion and review decisions
5. Git commits and implementation history
6. AI coding agent session observations
7. indirect behavioral patterns

This is guidance rather than a rigid ranking. Explicit evidence should remain distinguishable from interpretation, and multiple independent sources strengthen a candidate.

### 4. Separate Fact, Observation, and Interpretation

Clearly distinguish:

- what the source explicitly states
- what the observed activity shows
- what recurring pattern appears to exist
- what engineering knowledge might be inferred

For declarative sources, preserve explicit facts as facts. For behavioral sources, do not overgeneralize from one-off behavior.

### 5. Determine Candidate Scope

For each candidate, classify its scope when meaningful:

- General
- Technology-specific
- Project-specific
- Situation-specific
- Personal

Use the narrowest scope supported by the evidence. Do not promote project-specific facts into universal principles without evidence supporting that scope.

### 6. Produce Normalized Knowledge Candidates

Each candidate must use the vocabulary defined in `references/knowledge-format.md`.

At minimum, include:

- `type`
- `scope`
- `status: candidate`
- `confidence`
- `evidence`
- `sources`
- candidate statement
- observation
- interpretation
- suggested destination

A candidate is an extraction artifact for review. Do not copy its wrapper verbatim into permanent Twin Data.

### 7. Human Review

Present candidates for explicit review.

The user may:

- accept
- reject
- edit
- defer

Only an explicit acceptance or approved edit authorizes a permanent Twin Data update.

Preserve the distinction between the original candidate and the user's final decision.

### 8. Write Normalized Twin Data

After approval, convert the candidate into the appropriate permanent knowledge type.

Use YAML front matter and human-readable Markdown according to `references/knowledge-format.md`.

Do not write `status: candidate` as permanent knowledge.

## Empty Twin Initialization

When the Twin Data is newly created or mostly empty, extraction may be used to build its initial knowledge from existing source material.

A typical sequence is:

```text
New Twin Data
     |
     +--> Resume / CV / personal records
     |       -> Identity candidates
     |
     +--> Existing projects / documents
     |       -> Project and stated engineering context
     |
     +--> Sessions / Git / PRs
             -> Principles, practices, and decisions
```

Do not require the Twin to contain existing knowledge before extraction can begin.

## Historical Session Handling

AI coding agent sessions may contain:

- temporary experiments
- rejected ideas
- AI-generated suggestions
- debugging steps
- exploratory reasoning
- final decisions

Treat session content as evidence, not as an authoritative statement of engineering intent.

When a session contains exploration followed by an explicit human-confirmed decision, prefer the confirmed outcome and preserve the surrounding context needed to interpret it.

When no clear human decision exists, preserve the uncertainty.

## Git and Project History

Git commits show what was implemented, but implementation alone does not necessarily establish why it was chosen.

Use commit messages, related documents, and pull request discussion when available to distinguish implementation facts from engineering intent.

A later change can establish that implementation changed, but it does not by itself prove that the earlier approach was rejected as a general principle.

## Conflicting Evidence

When historical evidence conflicts:

- preserve the conflict
- identify the differing contexts
- avoid forcing a universal preference
- prefer explicit later decisions when they clearly supersede earlier ones
- present uncertainty to the user

Conflicting evidence may indicate that a principle is conditional rather than universal.

## Candidate Presentation

Present candidates in a compact human-readable form, for example:

```text
Knowledge Candidate

type: project
scope: project-specific
status: candidate
confidence: high
evidence: observed
sources:
  - type: project
    ref: /path/to/project

Candidate:
<proposed knowledge>

Observation:
<what the evidence shows>

Interpretation:
<why the candidate follows from the evidence>

Suggested Location:
projects/example.md

Review:
Accept | Edit | Reject | Defer
```

The candidate is a proposal, not confirmed Twin knowledge.

## Knowledge Safety

The Skill must never:

- invent evidence
- invent engineer identity, preferences, principles, or decisions
- treat AI-generated suggestions as confirmed engineering knowledge
- convert temporary behavior into permanent knowledge
- overgeneralize project-specific evidence into universal principles without support
- modify Twin Data silently
- commit changes to Twin Data without approval
- modify the Skill repository during extraction

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` when additional detail is required.
