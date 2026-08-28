# Engineering Twin Configuration

Version: 0.1

Status: Draft

Date: 2026-08-28


## 1. Purpose

Engineering Twin Configuration tells the Engineering Twin Skill
which user-owned Engineering Twin Data should be used.

Configuration is separate from Engineering Twin Data.

Configuration answers:

"Which Twin Data should the Skill use?"

Engineering Twin Data answers:

"What engineering knowledge does this Twin contain?"


## 2. Configuration Location

The recommended user-level configuration file is:

~/.config/engineering-twin/config.yaml

A future agent integration may use an equivalent
agent-specific configuration location.

The configuration file is local to the user's environment
and is not Engineering Twin knowledge.


## 3. Configuration Schema

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Fields:

| Field | Description |
|---|---|
| version | Configuration schema version |
| twinData.path | Path to the user's Engineering Twin Data |

The initial configuration schema should remain minimal.


## 4. Responsibility Boundary

Configuration stores environment-specific information,
such as the location of Twin Data.

It must NOT store:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

Those concerns belong to Engineering Twin Data
or the AI agent's own configuration.


## 5. Ownership and Separation

Engineering Twin Data remains user-owned and independent
from the Skill repository.

```text
Skill Repository
    |
    +-- provides Skills and supporting resources

User Configuration
    |
    +-- identifies the active Twin Data location

Engineering Twin Data
    |
    +-- stores engineering knowledge
```

The Skill must not assume that its own repository is Twin Data.

The Skill should not copy or move Twin Data unless the user
explicitly requests such an operation.


## 6. Discovery Priority

When locating Twin Data, use the following priority:

1. Explicit path provided for the current task
2. Workspace-level Engineering Twin configuration
3. User-level configuration at `~/.config/engineering-twin/config.yaml`
4. No configured Twin Data

If multiple configuration sources exist,
the higher-priority source takes precedence.

A Skill must not silently select an unrelated Twin Data repository.


## 7. Missing Configuration

If no Twin Data location can be determined:

- do not invent engineer-specific context
- do not assume the Skill repository is the Twin Data
- inform the user that no Twin Data is configured
- direct the user to `setup-engineering-twin` for creation or import

The daily `engineering-twin` Skill must not initialize Twin Data itself.


## 8. Create Workflow

When `setup-engineering-twin` creates a new Twin Data repository:

1. Determine the destination with the user.
2. Create the Twin Data structure.
3. Populate initial content from user-provided information.
4. Request human review.
5. After approval, save the Twin Data location to the appropriate configuration source.

By default, Create uses the user-level configuration.
If the user explicitly chooses a workspace configuration,
save the path there instead.

Example result:

```text
~/workspace/my-engineering-twin-data/

~/.config/engineering-twin/config.yaml
```

The configuration records the path; it does not copy the data.


## 9. Import Workflow

When `setup-engineering-twin` imports an existing Twin Data repository:

1. Locate the existing repository.
2. Validate its `twin.yaml` and supported schema version.
3. Confirm the repository with the user.
4. Save its location to the appropriate configuration source.
5. Do not rewrite, copy, or relocate the existing Twin Data automatically.


## 10. Multiple Twins

The initial configuration model supports one active Twin Data location
per configuration scope.

A future version may support named Twin Data profiles, for example:

```yaml
version: 2

activeTwin: personal

twins:
  personal:
    path: ~/workspace/personal-twin
  work:
    path: ~/workspace/work-twin
```

This is not part of the initial schema.


## 11. Portability and Git

Engineering Twin Data should be portable and version controlled
through Git.

Configuration is environment-specific and should normally remain
outside the Twin Data repository.

A user may recreate configuration on another machine by pointing it
to the same Twin Data repository.
