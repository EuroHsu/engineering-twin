---
name: extract-engineering-twin
description: Extracts evidence-backed engineering knowledge candidates from historical engineering activity and prepares them for human review. Use when the user wants to analyze past sessions, Git history, PRs, technical documents, or other engineering activity for potential Twin knowledge.
---

# Extract Engineering Twin

This Skill analyzes historical engineering activity to identify candidate knowledge for the user's Engineering Twin.

It is separate from both the daily-use `engineering-twin` Skill and the `setup-engineering-twin` Skill.

## Core Responsibility

The Extract Engineering Twin Skill answers:

> What engineering knowledge might be worth preserving from past engineering activity?

It does not decide what should become permanent Twin knowledge.

## Evidence Access

Historical evidence is accessed through capabilities already available to the AI agent.

Relevant sources may include:

- AI coding agent sessions exposed by the environment
- files available in the current workspace
- user-provided exports or records
- local Git history
- connected Git hosting or project-management integrations
- architecture or technical decision documents
- project documentation

Do not assume that any specific source is accessible. When a requested source is unavailable, report that limitation and continue only with evidence that is actually available.

For provider-specific source locations and access rules, read `references/evidence-sources.md` bundled with this Skill.

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

Establish a clear historical scope from the user's request, such as:

- a time period
- one or more projects
- selected sessions
- a technology or architecture topic
- a set of commits
- a set of pull requests

If the scope is ambiguous, prefer the narrowest reasonable interpretation.
Do not broaden the search unnecessarily.

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
2. human-authored architecture or project documentation
3. pull request discussion and review decisions
4. Git commits and implementation history
5. AI coding agent session observations
6. indirect behavioral patterns

This is guidance rather than a rigid ranking.
Explicit human-confirmed evidence can outweigh lower-ranked evidence.
Multiple independent sources strengthen a candidate.

### 4. Separate Observation From Interpretation

Clearly distinguish:

- what the evidence directly shows
- what recurring pattern appears to exist
- what engineering knowledge might be inferred

Repeated behavior does not automatically prove a universal preference.

### 5. Produce Knowledge Candidates

Candidates may include:

- engineering principles
- architecture principles
- technical decisions
- reusable engineering knowledge
- project context refinements

Each candidate should include supporting evidence, interpretation, confidence, and a suggested Twin Data destination.

AI-generated speculation is not engineering evidence.

### 6. Human Review

Present candidates for explicit review.

The user may:

- accept
- reject
- edit
- defer

Only an explicit acceptance or approved edit authorizes a permanent Twin Data update.

Preserve the distinction between the original candidate and the user's final decision.

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

## Candidate Format

Use a format similar to:

```text
Knowledge Candidate

Type:
Principle | Decision | Project Context | Other

Candidate:
<proposed knowledge>

Evidence:
- <source type / identifier / relevant context>
- <source type / identifier / relevant context>

Observation:
<what the evidence shows>

Interpretation:
<why the candidate follows from the evidence>

Confidence:
Low | Medium | High

Suggested Location:
<Engineering Twin Data path>

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
- modify Twin Data silently
- commit changes to Twin Data without approval
- modify the Skill repository during extraction

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` when additional detail is required.
