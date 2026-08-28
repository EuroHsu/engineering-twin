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

Use `extract-engineering-twin` to populate, review, or update knowledge from resumes, projects, documents, sessions, Git history, PRs, and other evidence.

## Start

First determine whether a usable Engineering Twin Data repository or directory is already available.

Present the user with two choices:

1. Create a new empty Engineering Twin Data
2. Import an existing Engineering Twin Data

Do not silently create, overwrite, move, copy, merge, or modify Twin Data.

## Create

When the user chooses Create:

1. Ask for or confirm the destination path.
2. Resolve the path and check whether the destination already exists.
3. If the destination contains existing files, stop and ask whether it should be used, replaced, or another destination selected. Never overwrite it silently.
4. Create the empty standard Twin Data structure: `README.md`, `identity/`, `principles/`, `decisions/`, and `projects/`.
5. Create `README.md` using the bundled container README template.
6. Do not create knowledge files or populate Identity, Principles, Decisions, or Projects.
7. If the user wants to populate the new Twin from existing personal or project material, direct them to `extract-engineering-twin` after Create completes.
8. Configure the new Twin Data as active when applicable, with explicit confirmation before changing an existing configuration.
9. Report the resolved Twin Data path and configuration path.

Create establishes the Data container only. It does not represent unconfirmed or inferred knowledge.

## Import

When the user chooses Import:

1. Ask for or locate the existing Twin Data repository or directory.
2. Verify that the standard knowledge directories are present when applicable.
3. Report structural validation problems clearly.
4. Do not rewrite, rename, move, normalize, migrate, or otherwise modify existing content automatically.
5. Confirm with the user that this is the Twin Data they want to use.
6. Configure the confirmed Twin Data as active.
7. Report the configured path.

Import accepts a human-readable Twin Data directory when its structure can be understood by the current Skill. An older or extended file layout does not require rewriting merely because the current layout is simpler.

Import does not copy personal knowledge into the Skill repository.

## Validation

Before accepting Twin Data as usable:

- The standard knowledge directories should be present when applicable: `identity/`, `principles/`, `decisions/`, and `projects/`.
- Existing Markdown knowledge should remain human-readable.
- Optional knowledge areas may be empty.
- The Data directory must be distinguishable from the Skill repository.

Validation is a structural and readability check.

Validation must not silently repair user-owned Twin Data.

## Configuration

Use the bundled `references/configuration.md` for configuration rules, including the recommended location, the boundary on what configuration may store, and how to switch the active Twin Data.

## Completion

A setup operation is complete only after:

1. The Twin Data location has been established or confirmed.
2. Structural validation has succeeded, or the user has explicitly accepted the reported limitations.
3. Configuration has been updated successfully when configuration is applicable.
4. The user has been told the resolved Twin Data location and configuration location.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` and `templates/` when additional material is required.
