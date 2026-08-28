# Engineering Twin Data Migration

Version: 0.1

Status: Draft

Date: 2026-08-28

## 1. Purpose

This document defines the generic migration model for Engineering Twin Data.

Migration converts an existing Twin Data instance from a supported older schema to a newer schema while preserving user-owned engineering knowledge and keeping all changes reviewable.

## 2. Migration Is Separate From Import

Import and migration have different purposes.

```text
Import
= make existing compatible Twin Data usable

Migration
= convert compatible older Twin Data to a newer schema
```

Import does not imply migration.

An older schema may remain in its original form after a successful Import.

## 3. Generic Migration Lifecycle

```text
Existing Twin Data
        |
        v
Detect source schema
        |
        v
Select target schema
        |
        v
Check supported migration path
        |
        v
Build migration plan
        |
        v
Classify mappings
        |
        v
Human Review
        |
        v
Apply approved migration
        |
        v
Validate target schema
        |
        v
Report result
```

## 4. Version-Pair Mappings

The generic migration workflow is shared across schema versions.

Each supported version transition must separately define its mapping rules.

Examples:

```text
0.1 -> 0.2
0.2 -> 0.3
0.3 -> 1.0
```

A supported source version does not imply that every target version is reachable automatically.

## 5. Migration Planning

Before modifying Twin Data, classify every relevant source element as one of:

- direct mapping
- transformation
- unmapped
- ambiguous
- intentionally removed with approval

The plan should identify:

- source version
- target version
- affected files or fields
- proposed transformation
- information that may be preserved outside the target schema
- unresolved decisions requiring human judgment

## 6. Preservation and Loss Prevention

Migration must be non-destructive by default.

The migration process must not silently:

- delete engineering knowledge
- change the meaning of existing knowledge
- convert project-specific context into global principles
- convert observations into confirmed knowledge
- discard metadata without reporting it

When no target representation exists, stop for human review unless the target schema explicitly defines a safe disposition.

## 7. Human Approval

Migration is a user-controlled operation.

The Skill may:

- detect migration opportunities
- generate a migration plan
- draft transformed files
- report validation results

The Skill must obtain explicit user approval before applying a migration that modifies user-owned Twin Data.

## 8. Validation

After migration:

- the target schema version must be declared correctly
- required target structure must be present
- migrated content must remain readable
- transformed content must match the approved plan
- intentionally omitted or retained legacy content must be reported

Changing only the version field is not sufficient to claim that migration succeeded.

## 9. Failure and Recovery

If a safe migration cannot be completed, do not silently continue with a partial transformation.

When Twin Data is version-controlled with Git, preserve normal Git history and prefer recoverable changes.

Do not mix unrelated knowledge extraction or content changes into a schema migration unless explicitly approved by the user.

## 10. Current Version Example

The current schema may define one or more supported migration paths. Their details belong in the applicable version mapping references under the Setup Skill.

The generic migration workflow remains unchanged when a new schema version is introduced.
