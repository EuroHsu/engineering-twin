# Engineering Twin Data Schema Version Reference

The current Engineering Twin Data schema version is `0.2`.

New Twin Data should use:

```yaml
version: 0.2
```

Legacy `0.1` data may still be used when its structure is compatible with the supported model. Legacy import does not imply automatic migration.

When multiple legacy version declarations exist, they must agree.

A future unsupported version must not be treated as compatible merely because the files are readable.

Schema currency and import compatibility are separate concerns:

```text
Current
= version used for newly created Twin Data

Import-compatible
= version that can still be safely interpreted
```
