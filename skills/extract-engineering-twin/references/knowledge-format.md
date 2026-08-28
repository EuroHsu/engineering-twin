# Normalized Twin Knowledge Format

New permanent knowledge created by this Skill should use YAML front matter followed by human-readable Markdown.

## Metadata

Required fields:

```yaml
---
type: identity | principle | decision | project
scope: personal | general | technology-specific | project-specific | situation-specific
status: confirmed | superseded | deprecated
confidence: high | medium | low
evidence: explicit | observed | inferred | mixed
sources:
  - type: resume | document | project | session | git | pr | user | other
    ref: <source identifier or path>
---
```

`candidate` is a review state used during extraction and must not be written as permanent Twin Data unless the user explicitly asks to preserve candidates.

## Semantic Rules

- Fact: directly supported information. Do not label inference as fact.
- Observation: a pattern directly observed in evidence.
- Inference: a conclusion drawn from evidence; keep it explicitly identified as inference.
- Decision: a specific choice made for a context.
- Principle: a reusable engineering belief or rule supported strongly enough to generalize.

A single knowledge file may contain multiple claims with different evidence types. In that case use `evidence: mixed` and distinguish claims in the Markdown body.

## Candidate to Data

Extraction candidates use the same metadata vocabulary plus review state and a suggested destination. After human approval, convert the candidate into normalized permanent knowledge; do not copy the candidate wrapper verbatim into Twin Data.

## Backward Compatibility

Existing Twin Data without front matter remains readable. Normalization applies to newly created or updated knowledge unless an explicit migration is approved.