---
name: setup-engineering-twin
description: Creates or imports an Engineering Twin Data repository and guides the user through initialization, validation, and configuration. Use when the user wants to create, import, or initialize Engineering Twin Data.
---

# Setup Engineering Twin

This Skill manages the setup of Engineering Twin Data.

It is separate from the daily-use `engineering-twin` Skill.

## Start

First determine whether the user already has Engineering Twin Data available.

Ask the user to choose one of:

1. Create a new Engineering Twin Data
2. Import an existing Engineering Twin Data

Do not silently create, overwrite, move, copy, or modify a Twin Data repository.

## Create

When the user chooses Create:

1. Choose or confirm the destination for the new Twin Data repository.
2. Create the standard directory structure.
3. Create `twin.yaml` using the supported schema version.
4. Guide the user through the Identity and Principles content.
5. Add project context only when the user provides it and confirms it should be stored.
6. Draft Markdown only from information provided or explicitly confirmed by the user.
7. Show the proposed content for review before treating it as permanent knowledge.
8. Require explicit user approval before finalizing the Twin Data.
9. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.

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

When the user chooses Import:

1. Locate the existing Twin Data repository or directory.
2. Verify that `twin.yaml` exists.
3. Verify that the schema version is supported.
4. Verify that the data structure is compatible with the Engineering Twin Data schema.
5. Report validation problems clearly.
6. Confirm the Twin identity with the user.
7. Use the existing data as-is unless the user explicitly requests changes.
8. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.

Import does not copy personal knowledge into the Skill repository.

## Configuration

Engineering Twin Configuration records which Twin Data location should be used by the daily `engineering-twin` Skill.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

When a workspace-specific configuration is intentionally used, save the path there instead of overwriting the user-level configuration.

Do not store engineering principles, technical decisions, project knowledge, communication preferences, or general AI behavior in the configuration.

## Validation

Before accepting a Twin Data repository as valid:

- `twin.yaml` must exist.
- The schema version must be supported.
- The expected top-level knowledge areas should be present.
- Existing Markdown files should remain human-readable.

Missing optional knowledge areas such as `decisions/` or `projects/` should not by themselves invalidate an otherwise usable Twin Data repository.

## Templates

Templates are provided in this Skill's `templates/` directory.

Use templates as starting points only. Replace placeholder content with information confirmed by the user.

## Knowledge Safety

- Never invent engineer identity.
- Never invent engineering principles.
- Never convert observed behavior into confirmed knowledge without approval.
- Never overwrite existing Twin Data silently.
- Never treat the Skill repository as the user's Twin Data repository.
- Never save personal engineering knowledge in the configuration file.
- Permanent knowledge changes require human approval.
