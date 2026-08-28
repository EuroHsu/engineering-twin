# Engineering Twin Extraction Review

Version: 0.1

Status: Draft

This document defines the review model for historical engineering knowledge extraction.

## Evidence sources

Extraction may use AI coding agent sessions, Git commits and history, pull requests and reviews, architecture or technical decision documents, project documentation, and other user-provided engineering records.

The agent must not assume that any historical source is locally accessible. Use available integrations, exports, or user-provided records when needed.

## Evidence levels

1. Explicit technical decisions or written rationale
2. Human-authored architecture or project documentation
3. Pull request discussion and review decisions
4. Git commits and implementation history
5. AI coding agent session observations
6. Indirect behavioral patterns

This ordering is guidance. Explicit human-confirmed evidence can outweigh a lower-ranked source.

## Scope

Use a bounded scope such as a date range, project, selected sessions, technology topic, commits, or pull requests. Do not broaden the historical search unnecessarily.

## Extraction model

```text
Historical Activity
        ↓
Evidence
        ↓
Observation / Pattern
        ↓
Knowledge Candidate
        ↓
Human Review
        ↓
Twin Data Update
```

Evidence, observations, interpretations, and candidates must remain distinguishable.

## Candidate requirements

A knowledge candidate should normally include:

- source type and identifier or location
- relevant date or range, when available
- project or topic, when known
- concise evidence summary
- observation or pattern
- interpretation
- confidence
- suggested Twin Data destination

Do not infer a permanent preference from an isolated implementation detail.

Repeated behavior does not by itself prove a universal principle.

## Historical session handling

AI coding sessions can contain temporary experiments, rejected ideas, AI-generated suggestions, debugging steps, exploratory reasoning, and final decisions.

Treat sessions as evidence, not as authoritative statements of engineering intent.

When a session contains an explicit final human decision, preserve that decision and enough surrounding context to interpret it. Otherwise preserve uncertainty.

## Conflicting evidence

When evidence conflicts:

- preserve the conflict
- identify the differing contexts
- avoid forcing a universal preference
- prefer explicit later decisions when they clearly supersede earlier ones
- surface uncertainty to the user

## Human review

The user may Accept, Edit, Reject, or Defer each candidate.

Only an explicit acceptance or approved edit authorizes a permanent Twin Data update.

The original evidence and candidate should remain distinguishable from the user's final knowledge.

## Persistence boundary

Extraction must never silently modify Twin Data, commit changes without approval, modify the Skill repository, or turn observations into permanent knowledge automatically.
