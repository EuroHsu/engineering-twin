---
name: setup-engineering-twin
description: Creates or imports an Engineering Twin Data repository and guides the user through initialization and validation. Use when the user wants to create, import, initialize, or attach Engineering Twin Data.
---

# Setup Engineering Twin

This Skill helps the user create a new Engineering Twin Data repository or use an existing one.

## Start

First determine whether a valid Engineering Twin Data repository already exists.

Ask the user to choose one of:

1. Create a new Engineering Twin Data
2. Import an existing Engineering Twin Data

Do not silently create or modify a Twin Data repository.

## Create

For a new Twin:

1. Choose or confirm the destination.
2. Create the standard directory structure.
3. Create `twin.yaml` with the supported schema version and instance metadata.
4. Guide the user through identity and engineering knowledge.
5. Draft Markdown content only from information provided or explicitly confirmed by the user.
6. Ask the user to review the generated content.
7. Do not treat unconfirmed observations as permanent knowledge.

Standard structure:

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

## Import

For an existing Twin:

1. Locate the repository or directory.
2. Verify `twin.yaml` exists.
3. Verify the schema version is supported.
4. Verify the expected structure.
5. Confirm the Twin identity with the user.
6. Use the existing data without rewriting it automatically.

## Knowledge Safety

- Never invent engineer identity.
- Never invent engineering principles.
- Never convert observed behavior into confirmed knowledge without approval.
- Never overwrite existing Twin Data silently.
- Permanent knowledge changes require human approval.

## Templates

Template files are provided in this Skill's `templates/` directory.
Use them as starting points and adapt them to information confirmed by the user.
