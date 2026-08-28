# Engineering Twin Data Schema Version Reference

## Current Schema

The current Engineering Twin Data schema version is `0.2`.

New Twin Data created by `setup-engineering-twin` must use `version: 0.2` in `twin.yaml`.

## Import Compatibility

The setup Skill recognizes `0.1` as a legacy Engineering Twin Data schema.

Legacy `0.1` data may be imported when its structure can be interpreted sufficiently for use.
Importing legacy data does not require immediate migration.

The Skill must not silently rewrite a legacy Twin Data repository merely because its schema version is older.

## Legacy `0.1` Detection

Legacy data may use the earlier nested metadata form:

```yaml
version: 0.1
schema:
  version: 0.1
```

When both version fields are present, they must agree. Conflicting version declarations are a validation error.

## Migration

Migration from `0.1` to `0.2` is an explicit user-approved operation.

A migration may:

- convert supported metadata to the current `0.2` structure
- preserve existing Markdown knowledge
- report any fields that cannot be mapped automatically

A migration must not silently discard information.

After migration, the resulting Twin Data should declare `version: 0.2`.

## Unsupported Versions

A future version greater than the highest supported version is not automatically accepted.

The Skill must report the unsupported version and avoid modifying the data.

## Compatibility Principle

Schema compatibility and schema currency are separate concepts:

```text
Current
= version used for newly created Twin Data

Import-compatible
= version that can still be safely used or migrated
```
