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

These labels are useful when reviewing extraction candidates. Permanent knowledge should retain only content that is useful for future decisions.

## Candidate to Data

After explicit human approval, convert the candidate into concise, decision-relevant knowledge and write only the permanent `scope` and `status` metadata.

Existing Twin Data without front matter remains readable. Do not migrate or rewrite it automatically.