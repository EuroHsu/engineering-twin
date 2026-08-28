# Normalized Twin Knowledge Format

Engineering Twin Data knowledge may use YAML front matter followed by human-readable Markdown.

Expected metadata vocabulary:

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

Use metadata to understand provenance and lifecycle, but do not treat it as a substitute for the Markdown content.

Existing Twin Data without front matter remains valid. Do not migrate or rewrite it automatically.