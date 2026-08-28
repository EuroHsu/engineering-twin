# Engineering Twin Data Migration Reference

Migration converts an existing Engineering Twin Data instance from a supported older schema to a newer schema.

## Migration Principles

Migration must be:

- explicit
- user-approved
- schema-aware
- reviewable
- non-destructive

An older schema being import-compatible does not require immediate migration.

Migration must never be triggered solely because a newer schema exists.

## Migration Lifecycle

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
Check migration compatibility
        |
        v
Build migration plan
        |
        v
Identify mapped and unmapped content
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

## Source and Target

Every migration must explicitly identify:

- source schema version
- target schema version
- migration direction
- applicable migration rules

Only migrations explicitly supported by the current Skill may be offered.

A newer or unknown schema must not be downgraded automatically.

## Migration Planning

Before modifying user-owned Twin Data, prepare a migration plan that distinguishes:

### Direct mappings

Fields or structures that have a defined equivalent in the target schema.

### Transformations

Content that requires a documented structural conversion.

### Unmapped fields

Source content with no defined target equivalent.

### Ambiguous content

Content whose target representation cannot be determined without human judgment.

The migration plan must be shown to the user before applying changes when it contains transformations, unmapped fields, or ambiguous content.

## Preservation Rules

Migration should preserve existing engineering knowledge whenever possible.

Do not silently:

- delete knowledge
- rewrite semantic content
- change the meaning of a decision
- convert a project-specific fact into a general principle
- convert an observation into confirmed knowledge
- discard metadata without reporting it

When a source field has no target mapping, preserve it only when the target schema explicitly allows extensions or when the user approves another disposition.

## Version Metadata

The resulting Twin Data must declare the target schema version in the form required by that schema.

If the source contains multiple version declarations, verify that they are consistent before migration.

A conflict in source version metadata is a validation error, not a migration opportunity.

## Safety

Before applying an approved migration:

- confirm the user owns or controls the Twin Data
- confirm the exact target version
- confirm the proposed changes
- preserve Git history through normal commits when the repository is version controlled
- avoid unrelated changes

A migration should not mix unrelated knowledge extraction, principle changes, or project edits into the same operation unless the user explicitly approves them.

## Validation After Migration

After migration:

1. Validate the target schema.
2. Confirm required metadata.
3. Confirm expected directories and files.
4. Confirm that existing knowledge remains readable.
5. Report any content that was intentionally excluded, transformed, or preserved outside the target schema.

A migration is not complete merely because the version field changed.

## Rollback and Failure

If migration cannot be completed safely, do not leave a partially transformed result intentionally.

Prefer Git-based recovery when available. If recovery cannot be guaranteed, stop before modifying the affected content and ask the user to resolve the blocking issue or provide a safe copy.

## Future Versions

When a new schema version is introduced, add an explicit migration mapping from each supported source version to the new target version.

Do not encode version-specific migration behavior only in the generic workflow. The generic workflow defines how migration is performed; each supported version pair defines what changes.
