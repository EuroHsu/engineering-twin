# Engineering Twin Configuration Reference

Engineering Twin Configuration records which user-owned Engineering Twin Data repository or directory should be used.

## Recommended Location

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

## Discovery Precedence

When resolving Twin Data, use this order:

1. Explicit Twin Data path provided for the current task
2. Workspace-level Engineering Twin configuration
3. User-level configuration
4. No configured Twin Data

If no location can be determined, do not invent engineer-specific context. Direct the user to `setup-engineering-twin` when setup is appropriate.

## Configuration Boundary

Configuration contains environment-specific information such as the Twin Data location.

It must not contain:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

Configuration answers **which Twin Data should be used**. Twin Data answers **what engineering knowledge the Twin contains**.
