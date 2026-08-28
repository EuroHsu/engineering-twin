---
name: setup-engineering-twin
description: Creates or imports an Engineering Twin Data repository and configures which Twin Data is active. Use when the user wants to create an empty Twin Data repository, import existing Twin Data, validate it, or switch the active Twin Data.
---

# Setup Engineering Twin

This Skill manages the lifecycle and configuration of Engineering Twin Data.

It is separate from the knowledge-acquisition `extract-engineering-twin` Skill and the daily-use `engineering-twin` Skill.

## Responsibility Boundary

`setup-engineering-twin` manages only:

```text
Create / Import / Validate / Configure
```

It does not create, extract, infer, normalize, or modify permanent engineering knowledge.

Use `extract-engineering-twin` to populate or update knowledge from resumes, projects, documents, sessions, Git history, PRs, and other evidence.

## Start

First determine whether a usable Engineering Twin Data repository or directory is already available.

Present the user with two choices:

1. Create a new empty Engineering Twin Data
2. Import an existing Engineering Twin Data

Do not silently create, overwrite, move, copy, merge, migrate, or modify Twin Data.

## Create

When the user chooses Create:

1. Ask for or confirm the destination path.
2. Resolve the path and check whether the destination already exists.
3. If the destination contains existing files, stop and ask whether it should be used, replaced, or another destination selected. Never overwrite it silently.
4. Create the empty standard Twin Data structure: `twin.yaml`, `identity/`, `principles/`, `decisions/`, and `projects/`.
5. Create `twin.yaml` using the current schema version `0.2`.
6. Do not create knowledge files or populate Identity, Principles, Decisions, or Projects.
7. If the user wants to populate the new Twin from existing personal or project material, direct them to `extract-engineering-twin` after Create completes.
8. Configure the new Twin Data as active when applicable, with explicit confirmation before changing an existing configuration.
9. Report the resolved Twin Data path and configuration path.

Create establishes the Data container only. It does not represent unconfirmed or inferred knowledge.

## Import

When the user chooses Import:

1. Ask for or locate the existing Twin Data repository or directory.
2. Verify that `twin.yaml` exists.
3. Determine the declared schema version.
4. Treat current schema `0.2` as directly supported.
5. Treat legacy versions as import-compatible only when the current Skill explicitly supports their structure.
6. Verify that the structure is compatible with the corresponding schema.
7. Report validation problems clearly.
8. Do not rewrite, rename, move, normalize, or migrate existing content automatically.
9. Confirm with the user that this is the Twin Data they want to use.
10. Configure the confirmed Twin Data as active.
11. Report the configured path and schema status.
12. When a supported legacy version has a defined migration path, offer migration separately; do not perform it without user approval.

Import does not copy personal knowledge into the Skill repository.

## Validation

Before accepting Twin Data as usable:

- `twin.yaml` must exist.
- The declared schema version must be current or an explicitly supported legacy version.
- Required metadata must be present according to the applicable schema.
- Existing Markdown knowledge should remain human-readable.
- Optional knowledge areas such as `decisions/` and `projects/` may be absent.
- If multiple version declarations exist in legacy metadata, they must agree.
- New or updated normalized knowledge must use only `scope` and `status` metadata as defined in `references/knowledge-format.md`.

Validation must not silently repair or migrate user-owned Twin Data.

## Migration

When migration is appropriate, use the generic migration workflow in the bundled `references/migration.md`.

Before offering or applying a migration:

1. Identify the source and target schema versions.
2. Verify that the version pair is explicitly supported by `references/schema-versions.md`.
3. Prepare a migration plan showing direct mappings, transformations, unmapped fields, and ambiguous content.
4. Obtain explicit user approval before modifying user-owned Twin Data.
5. Apply only the approved migration.
6. Validate the resulting target schema.

Version-specific mapping rules belong in the schema-version reference or other bundled migration mapping references. Do not encode one version pair as the generic migration workflow.

## Configuration

Use the bundled `references/configuration.md` for configuration rules.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

If the user intentionally uses a workspace-level configuration, write the path there instead of replacing the user-level configuration.

When an existing configuration points to a usable Twin Data and the user wants another Twin Data to become active:

1. Show the current configured path and the proposed path.
2. Validate the proposed Twin Data before changing the configuration.
3. Obtain explicit user confirmation to switch the active Twin Data.
4. Update only the configuration pointer.
5. Do not delete, move, modify, merge, or migrate the previously configured Twin Data.
6. Report both the old and new paths when the switch is complete.

Configuration stores the location of Twin Data, not the Twin's engineering knowledge.

Do not store the following in configuration:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

## Completion

A setup operation is complete only after:

1. The Twin Data location has been established or confirmed.
2. Validation has succeeded, or the user has explicitly accepted the reported limitations.
3. Configuration has been updated successfully when configuration is applicable.
4. The user has been told the resolved Twin Data location and configuration location.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` when additional detail is required.

For schema-version handling, use the bundled `references/schema-versions.md`.
For migration workflow handling, use the bundled `references/migration.md`.
For knowledge-format handling, use the bundled `references/knowledge-format.md`.
