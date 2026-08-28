---
name: extract-engineering-twin
description: Extracts evidence-backed engineering knowledge from historical activity and user-provided source material, then reviews and writes decision-relevant Twin Data.
---

# Extract Engineering Twin

This Skill acquires, reviews, and writes Engineering Twin knowledge from existing evidence.

It is separate from `setup-engineering-twin`, which only bootstraps and configures the Twin Data container, and from `engineering-twin`, which uses the Twin for daily decision assistance.

## Responsibility Boundary

`extract-engineering-twin` manages:

```text
Evidence → Candidate → Human Review → Permanent Knowledge
```

It is the primary path for populating a new or existing Twin with knowledge.

## Evidence Types

### Behavioral Evidence

Examples:

- AI coding agent sessions
- local Git history
- pull request discussions and reviews
- implementation history
- recorded engineering activity

Behavioral evidence can support patterns, practices, decisions, and project context, but repeated behavior alone does not prove a universal preference.

### Declarative Evidence

Examples:

- resume or CV
- portfolio or personal project descriptions
- architecture or technical documents
- user-authored engineering notes or articles
- user-provided Markdown or text records

Declarative evidence can directly support stated identity, experience, technology context, project context, or explicitly stated preferences. Do not turn a declared fact into a stronger inferred preference without supporting evidence.

For provider-specific session locations and access rules, read `references/evidence-sources.md`.
For candidate and permanent-data conventions, read `references/knowledge-format.md`.

## Extraction Workflow

```text
Evidence Source
      ↓
Evidence
      ↓
Observation / Pattern
      ↓
Interpretation
      ↓
Knowledge Candidate
      ↓
Human Review
      ↓
Permanent Twin Data
```

### 1. Select Source and Scope

Establish what the user wants to extract and from which source or sources.

Possible sources include resumes, projects, selected documents, AI sessions, Git history, pull requests, and combinations of these.

When the scope is ambiguous, ask the user rather than expanding the search.

### 2. Gather Evidence

Inspect every source within the scope established in step 1 — not a sample of it.

Prefer concrete evidence over assumptions and retain enough provenance for the user to verify important observations — see `references/knowledge-format.md` for the fields a candidate carries.

### 3. Evaluate Evidence

Distinguish:

- explicit statements from the source
- observed activity
- recurring patterns
- inferred knowledge

Use the narrowest candidate scope supported by evidence.

Do not overgeneralize project-specific evidence into a general principle without support.

### 4. Produce Candidates

Candidates are review artifacts. They may describe:

- identity or background facts
- engineering principles
- architecture or coding practices
- technical decisions
- reusable engineering knowledge
- project context

Use the candidate fields defined in `references/knowledge-format.md`. They are extraction-stage information, not permanent Twin Data metadata.

### 5. Human Review

Present candidates for explicit review.

The user may:

- accept
- edit
- reject
- defer

Only an explicit acceptance or approved edit authorizes a permanent Twin Data update.

### 6. Write Permanent Knowledge

After approval:

1. Select the appropriate destination directory: `identity/`, `principles/`, `decisions/`, or `projects/`.
2. Use the bundled template from this Skill when creating a new knowledge file.
3. Follow `references/knowledge-format.md` for what belongs in the front matter and body.

Templates define file shape; they do not constitute confirmed user knowledge.

## Empty Twin Initialization

A newly created or mostly empty Twin can be populated directly through extraction.

Typical sequence:

```text
Resume / CV / personal records
    → Identity

Existing projects / documents
    → Project context and stated engineering knowledge

Sessions / Git / PRs
    → Principles, practices, and decisions
```

The Twin does not need existing knowledge before extraction can begin.

## Historical Session Handling

Sessions may contain experiments, rejected ideas, AI suggestions, debugging, exploration, and final decisions.

Treat them as evidence rather than authoritative engineering intent. Prefer explicit human-confirmed decisions when available.

## Git and Project History

Implementation history shows what happened, not necessarily why. Use commit messages, documents, and PR discussions to distinguish implementation facts from intent.

## Conflicting Evidence

When evidence conflicts:

- preserve the conflict during review
- identify differing contexts
- avoid forcing a universal preference
- prefer explicit later decisions when they clearly supersede earlier ones
- preserve uncertainty when the evidence is unresolved

## Candidate Presentation

Present candidates compactly, for example:

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

The candidate is not permanent Twin knowledge.

## Knowledge Safety

Ground every observation in evidence actually inspected, and derive identity, preferences, principles, and decisions only from that evidence or explicit user statements — never invent them.

Treat this Skill's own repository as read-only during normal extraction.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` and `templates/` when additional material is required.
