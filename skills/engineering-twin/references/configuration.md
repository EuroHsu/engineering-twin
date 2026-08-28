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

For a project-specific override, use the workspace-level configuration file instead:

`.claude/engineering-twin/config.yaml` (relative to the project root)

Same format as above; `twinData.path` may be relative to the project root or absolute.

Discovery precedence and validation steps are defined in `SKILL.md` under "Discovery and Validation".

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
