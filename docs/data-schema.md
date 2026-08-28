# Engineering Twin Data Schema

Current schema version: `0.2`.

Engineering Twin Data is user-owned, Git-versioned engineering knowledge. It is primarily Markdown with YAML metadata.

## Structure

```text
engineering-twin-data/
├── README.md
├── twin.yaml
├── identity/
│   └── profile.md
├── principles/
│   ├── engineering.md
│   ├── architecture.md
│   └── coding.md
├── decisions/
└── projects/
```

## Root Metadata

`twin.yaml` identifies the Twin instance and declares its schema version.

```yaml
version: 0.2
name: My Engineering Twin
created: 2026-08-28
language:
  primary: zh-TW
```

The supported 0.2 schema uses the root `version` field.

## Knowledge Layers

```text
Identity
= who the engineer is

Principles
= what the engineer generally values

Decisions
= specific engineering choices and their reasoning

Projects
= project-specific context
```

Raw conversation history and temporary debugging material are not part of Twin Data.

## Evolution

```text
Observation / Insight
        ↓
Knowledge Candidate
        ↓
Human Review
        ↓
Twin Data Update
```

Permanent knowledge requires human approval.

Detailed schema, validation, compatibility, and migration rules are maintained inside the relevant Skill packages.