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

Inspect only relevant evidence within the requested scope.

Prefer concrete evidence over assumptions and retain enough provenance for the user to verify important observations.

Extraction candidates may include source type, source reference, confidence, evidence classification, observation, interpretation, and suggested destination. These are extraction-stage information, not permanent Twin Data metadata.

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

Candidate details may include:

```text
type
scope
status: candidate
confidence
evidence
sources
candidate statement
observation
interpretation
suggested destination
```

Do not write these extraction-only fields into permanent Twin Data.

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
3. Write each file as a conclusion a future engineer can act on — not a case file. State what to believe or do; do not describe how the evidence was gathered.
4. Use only `scope` and `status` in the YAML front matter.
5. Do not copy candidate-only provenance, confidence, or evidence metadata into permanent Twin Data.
6. Do not preserve speculative reasoning as confirmed knowledge.
7. Do not restate the evidence itself in the body — evidence statistics (for example commit counts, timestamps, version spans) or local/external evidence source paths (for example absolute file paths, resume file paths, other repositories' document paths).
8. In-repo relative paths that show where a decision applies (for example `src/utils/money.js`) and cross-references to other Twin Data files (for example `Related Projects`) are not evidence provenance and may be kept.
9. Keep only the resulting conclusion — unless the number is itself part of the confirmed engineering fact (e.g., an agreed threshold or SLA), not a description of how the evidence was gathered.

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

The Skill must never:

- invent evidence
- invent engineer identity, preferences, principles, or decisions
- treat AI-generated suggestions as confirmed knowledge
- convert temporary behavior into permanent knowledge
- overgeneralize without support
- modify Twin Data silently
- commit changes to Twin Data without approval
- copy extraction-only provenance into permanent Twin Data
- modify the Skill repository during normal extraction

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` and `templates/` when additional material is required.
