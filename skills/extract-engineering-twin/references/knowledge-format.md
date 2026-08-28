# Twin Knowledge Format

## Permanent Metadata

Permanent Twin Data keeps only metadata that helps the daily Engineering Twin make decisions:

```yaml
---
scope: personal | general | technology-specific | project-specific | situation-specific
status: confirmed | superseded | deprecated
---
```

The knowledge type is defined by its destination directory:

- `identity/` → identity
- `principles/` → principle
- `decisions/` → decision
- `projects/` → project

`identity/` holds exactly one file (`profile.md`). `principles/` holds exactly three files (`architecture.md`, `coding.md`, `engineering.md`) — do not create additional principle category files. When a principle could fit more than one, classify it by what it primarily governs: system structure and boundaries → `architecture.md`; practices applied while writing code → `coding.md`; cross-cutting engineering judgment and process → `engineering.md` (the default when uncertain). `decisions/` and `projects/` grow without a fixed count, one file per decision or project.

Do not copy extraction provenance into permanent Twin Data. `confidence`, `evidence`, and `sources` are extraction/review metadata.

## Extraction Candidate

Candidates may use richer metadata because the extraction process needs to explain why a candidate was proposed:

```text
type
scope
status: candidate
confidence
evidence
sources
candidate
observation
interpretation
suggested destination
```

Candidate metadata and evidence are review artifacts. They must not be copied verbatim into permanent Twin Data.

## Semantic Rules

- Fact: directly supported information.
- Observation: a pattern directly observed in evidence.
- Inference: a conclusion drawn from evidence.
- Decision: a specific choice made for a context.
- Principle: a reusable engineering belief or rule supported strongly enough to generalize.

These labels are useful when reviewing extraction candidates. Write only what is confirmed true now — not a hedge. Resolve uncertainty during Human Review before writing (for example, drop a candidate's "Fact:" / "Observation:" / "Inference:" labels once confirmed, or defer it if it cannot be confirmed); do not carry those labels into permanent Twin Data.

## Candidate to Data

After explicit human approval, convert the candidate into a conclusion a future engineer can act on — not a case file. State what to believe or do; do not describe how the evidence was gathered. Write only the permanent `scope` and `status` metadata.

Do not restate the evidence itself in the body — evidence statistics (for example commit counts, timestamps, version spans) or local/external evidence source paths (for example absolute file paths, resume file paths, other repositories' document paths). In-repo relative paths that show where a decision applies (for example `src/utils/money.js`) and cross-references to other Twin Data files (for example `Related Projects`) are not evidence provenance and may be kept. Keep only the resulting conclusion — unless the number is itself part of the confirmed engineering fact (e.g., an agreed threshold or SLA), not a description of how the evidence was gathered.

Existing Twin Data without front matter remains readable. Do not migrate or rewrite it automatically.

## File Naming

- `identity/profile.md` and each `principles/*.md` use the bundled template's own filename.
- `decisions/`: name the file `NNNN-slug.md`, where `NNNN` matches the decision number in the file's `# Decision NNNN` heading and `slug` is a short kebab-case summary of the topic (for example `0001-api-money-fields-raw-values.md`). Continue the existing numbering; do not reuse or renumber existing decisions.
- `projects/`: name the file after the project itself in kebab-case (for example `catadex-admin-backend.md`), matching the project's heading.
