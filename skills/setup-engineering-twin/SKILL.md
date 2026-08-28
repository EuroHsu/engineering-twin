---
name: setup-engineering-twin
description: Creates or imports an Engineering Twin Data repository and guides the user through initialization, validation, and configuration. Use when the user wants to create, import, or initialize Engineering Twin Data.
---

# Setup Engineering Twin

This Skill manages the setup of Engineering Twin Data.

It is separate from the daily-use `engineering-twin` Skill and the knowledge-acquisition `extract-engineering-twin` Skill.

## Responsibility Boundary

`setup-engineering-twin` manages the Twin Data lifecycle:

```text
Create / Import / Validate / Configure
```

It does not extract engineering knowledge from historical activity or personal source material. Use `extract-engineering-twin` for evidence-based knowledge acquisition from sessions, projects, resumes, documents, and other existing records.

## Start

First determine whether a usable Engineering Twin Data repository or directory is already available.

Present the user with two choices:

1. Create a new Engineering Twin Data
2. Import an existing Engineering Twin Data

Do not silently create, overwrite, move, copy, or modify Twin Data.

## Create

When the user chooses Create:

1. Ask for or confirm the destination path.
2. Check whether the destination already exists.
3. If the destination contains existing files, stop and ask the user whether it should be used, replaced, or another destination selected. Never overwrite it silently.
4. Create the standard Twin Data structure using the templates bundled with this Skill.
5. Create `twin.yaml` using the current schema version `0.2`.
6. Guide the user through Identity and Principles when the user wants to enter them directly.
7. Add Decisions or Projects only when the user provides information that should be stored there.
8. Draft Markdown only from information provided or explicitly confirmed by the user.
9. Do not create a knowledge file merely to represent missing, unknown, or unconfirmed information. Empty knowledge areas may remain as directories without knowledge files when no content was provided.
10. Present generated or changed knowledge for human review.
11. Require explicit approval before treating drafted content as permanent Twin Data.
12. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.
13. Report the resolved Twin Data path and configuration path, not only a relative or user-entered path.

The Create flow must not infer a user's engineering principles from the fact that a tool, framework, project, or architecture was mentioned or used. Observations may be presented as candidates for confirmation.

If the user wants to populate a new Twin from existing personal or project material rather than directly provide knowledge, keep Create limited to bootstrapping the Data structure and configuration. Do not perform that extraction here; use `extract-engineering-twin` for the knowledge-acquisition task.

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
10. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.
11. Report the configured location and the schema status to the user.
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

A validation problem should be reported together with the affected path and the reason it is invalid.

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

After a successful Create or Import, use the bundled `references/configuration.md` for the configuration rules.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

When a configuration already exists, treat it as the current active Twin Data pointer. If Create or Import selects a different Twin Data location, present the current configured path and the proposed replacement path, and require explicit user confirmation before changing the configuration.

Changing the configured path only changes which Twin Data is active. It must not delete, move, overwrite, merge, or otherwise modify the previously configured Twin Data unless the user separately requests that action.

If the user intentionally uses a workspace-level configuration, update that configuration instead of replacing the user-level configuration.

Configuration stores the location of Twin Data, not the Twin's engineering knowledge.

Do not store the following in configuration:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

## Templates

Templates are provided in this Skill's `templates/` directory.

Use templates as starting points only. Replace placeholder content with information confirmed by the user.

The templates define the initial structure; they do not constitute confirmed engineering knowledge for the user.

## Completion

A setup operation is complete only after:

1. The Twin Data location has been established or confirmed.
2. Validation has succeeded, or the user has explicitly accepted the reported limitations.
3. Required human review has occurred for newly drafted knowledge or an approved migration.
4. Configuration has been updated successfully when configuration is applicable.
5. The user has been told the resolved Twin Data location and configuration location.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` and `templates/` when additional material is required.

For schema-version handling, use the bundled `references/schema-versions.md`.
For migration workflow handling, use the bundled `references/migration.md`.
