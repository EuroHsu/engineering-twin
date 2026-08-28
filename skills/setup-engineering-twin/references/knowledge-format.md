# Twin Knowledge Format

New permanent Engineering Twin Data knowledge may use YAML front matter followed by human-readable Markdown.

## Permanent Metadata

Keep only metadata that helps the daily Engineering Twin make decisions:

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

Do not store extraction provenance in permanent Twin Data. Evidence, confidence, and source references belong to the extraction candidate and review process, not the final knowledge record.

`status: confirmed` is usable permanent knowledge. `superseded` and `deprecated` records remain historical context and should not be treated as current guidance unless relevant.

Templates are starting points only. Replace placeholder content with information confirmed by the user.

Existing Twin Data without front matter remains valid. Do not migrate or rewrite it automatically.