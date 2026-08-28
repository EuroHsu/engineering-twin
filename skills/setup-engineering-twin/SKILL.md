---
name: setup-engineering-twin
description: Creates or imports an Engineering Twin Data repository and guides the user through initialization, validation, and configuration. Use when the user wants to create, import, or initialize Engineering Twin Data.
---

# Setup Engineering Twin

This Skill manages the setup of Engineering Twin Data.

It is separate from the daily-use `engineering-twin` Skill.

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
6. Guide the user through Identity and Principles.
7. Add Decisions or Projects only when the user provides information that should be stored there.
8. Draft Markdown only from information provided or explicitly confirmed by the user.
9. Present generated or changed knowledge for human review.
10. Require explicit approval before treating drafted content as permanent Twin Data.
11. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.
12. Report the final Twin Data location and configuration location to the user.

The Create flow must not infer a user's engineering principles from the fact that a tool, framework, or architecture was mentioned or used. Observations may be presented as candidates for confirmation.

## Import

When the user chooses Import:

1. Ask for or locate the existing Twin Data repository or directory.
2. Verify that `twin.yaml` exists.
3. Determine the declared schema version.
4. Treat current schema `0.2` as directly supported.
5. Treat legacy schema `0.1` as import-compatible when the legacy structure can be interpreted sufficiently for use.
6. Verify that the structure is compatible with the corresponding schema.
7. Report validation problems clearly.
8. Do not rewrite, rename, move, normalize, or migrate existing content automatically.
9. Confirm with the user that this is the Twin Data they want to use.
10. Save the confirmed Twin Data location to the appropriate Engineering Twin Configuration.
11. Report the configured location and the schema status to the user.
12. When importing legacy `0.1` data, offer an explicit, separate migration to `0.2`; do not perform it without user approval.

Import does not copy personal knowledge into the Skill repository.

## Validation

Before accepting Twin Data as usable:

- `twin.yaml` must exist.
- The declared schema version must be current `0.2` or an explicitly supported legacy version such as `0.1`.
- Required metadata must be present according to the applicable schema.
- Existing Markdown knowledge should remain human-readable.
- Optional knowledge areas such as `decisions/` and `projects/` may be absent.
- If multiple version declarations exist in legacy metadata, they must agree.

A validation problem should be reported together with the affected path and the reason it is invalid.

Validation must not silently repair or migrate user-owned Twin Data.

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

If the user intentionally uses a workspace-level configuration, write the path there instead of replacing the user-level configuration.

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
3. Required human review has occurred for newly drafted knowledge.
4. Configuration has been updated successfully when configuration is applicable.
5. The user has been told where the Twin Data is located.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` and `templates/` when additional material is required.

For schema-version handling, use the bundled `references/schema-versions.md`.