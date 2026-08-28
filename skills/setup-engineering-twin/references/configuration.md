# Setup Engineering Twin Configuration Reference

After a successful Create or Import, persist the selected Twin Data location according to this configuration model.

## Recommended Location

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

If the user intentionally uses a workspace-level configuration, write the path there instead of replacing the user-level configuration.

## Switching the Active Twin Data

When an existing configuration points to a usable Twin Data and the user wants another Twin Data to become active:

1. Show the current configured path and the proposed path.
2. Validate the proposed Twin Data before changing the configuration.
3. Obtain explicit user confirmation to switch the active Twin Data.
4. Update only the configuration pointer.
5. Do not delete, move, modify, merge, or transform the previously configured Twin Data.
6. Report both the old and new paths when the switch is complete.

## Configuration Boundary

Configuration stores environment-specific information such as the Twin Data location.

It must not store:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

Configuration answers **which Twin Data should be used**. Twin Data answers **what engineering knowledge the Twin contains**.
