---
name: engineering-twin
description: Loads a user-owned Engineering Twin Data repository (identity, principles, decisions, projects) into session context as personal engineering guidance. Invoke with /engineering-twin.
disable-model-invocation: true
---

# Engineering Twin

Engineering Twin provides structured engineering context to the AI agent.

## Activation

`/engineering-twin` is an explicit session-level opt-in command.

When the user invokes `/engineering-twin`:

1. Activate Engineering Twin for the current session.
2. Determine the requested session mode.
3. In Assist Mode, discover and validate the configured Twin Data and load initial context per the Loading Strategy below.
4. In Observe Mode, do not discover or retrieve Twin Data for current reasoning.
5. Start in **Assist Mode** by default when no mode was explicitly requested.
6. Wait for the user's subsequent engineering task.

Do not treat activation as a permanent user preference or automatically carry it into unrelated sessions.

Before the user explicitly activates this Skill, do not use Engineering Twin Data merely because it exists in the environment.

## Modes

Engineering Twin has two session-level modes:

- **Assist Mode** — retrieve relevant Twin Data and use it as engineering guidance for the current task.
- **Observe Mode** — do not retrieve Twin Data for the current task. Observe the current session for new, durable engineering knowledge and ask about it only when the capture threshold below is met.

`/engineering-twin` starts Assist Mode by default.

Use `/engineering-twin -t` to toggle the current session between Assist Mode and Observe Mode.

`-t` means toggle; it does not select a fixed mode.

After switching modes, report the active mode and its retrieval/capture behavior clearly.

Mode changes affect subsequent turns. If Twin Data was already loaded earlier in the session, it may remain in the model context; switching to Observe Mode must not claim to erase information already seen.

## Observe Mode

Observe Mode is a quiet knowledge-capture mode, not a transcript recorder.

In Observe Mode:

- Do not proactively discover, load, or consult Twin Data.
- Do not use existing Twin knowledge to influence the current task.
- Continue normal reasoning and coding without interrupting ordinary work.
- Observe user-originated engineering judgments and decisions during the session.
- Ignore AI-only suggestions, tentative thoughts, experiments, and one-off implementation choices unless the user clearly turns them into durable guidance.

Only surface a capture prompt when the observed knowledge is strong enough to be worth preserving.

### Capture Threshold

A potential candidate should normally satisfy all of the following:

1. **User-originated** — the judgment or preference is explicitly stated or clearly confirmed by the user.
2. **Reusable** — it can reasonably apply to future situations beyond the current local change.
3. **Durable** — it is expected to remain useful beyond the immediate task, incident, release, or development period.
4. **Sufficiently explicit or reinforced** — the user either states a clearly lasting rule/decision or reinforces the same judgment enough to distinguish it from a passing thought.

Do not generalize beyond what the user actually expressed. In particular, do not turn a single project-specific statement into a general principle without explicit support.

When the threshold is met, wait for a natural conversational boundary and ask the user whether the candidate should be captured. Keep the prompt brief and do not interrupt an active technical exchange unnecessarily.

For example:

```text
Potential Engineering Twin knowledge:
<concise candidate>

Capture this in the Twin?
Yes | Edit | No
```

A positive response authorizes handoff to `extract-engineering-twin`; this Skill must not write or modify Twin Data directly.

## Core Model

The relationship is:

AI Agent
+
Engineering Twin Skill
+
Engineering Twin Data
=
Personalized Engineering Assistance

The Skill defines how Engineering Twin Data should be discovered and used.
The Data contains the engineer's engineering knowledge.

## Twin Data

Engineering Twin Data is a separate, user-owned repository or directory.

Expected structure:

```text
engineering-twin-data/
├── README.md
├── identity/
├── principles/
├── decisions/
└── projects/
```

Do not assume that the Skill repository and Twin Data are the same location.
The Skill repository contains instructions; the Twin Data contains the engineer's knowledge.

## Configuration

The Skill uses Engineering Twin Configuration to determine which Twin Data should be used. Configuration stores only the Twin Data location — never engineering knowledge or AI behavior instructions.

Read `references/configuration.md` bundled with this Skill for the recommended file location, format, and full boundary rules.

## Discovery and Validation

In Assist Mode, after activation and before using Engineering Twin context:

1. Look for an explicit Twin Data path provided for the current task.
2. Check for workspace-level Engineering Twin configuration at `.claude/engineering-twin/config.yaml` (relative to the project root).
3. Check the user-level configuration at `~/.config/engineering-twin/config.yaml`.
4. If no Twin Data location can be determined, continue without engineer-specific assumptions and direct the user to `setup-engineering-twin` when setup is appropriate.

Before using a discovered Twin Data directory:

- verify that the standard knowledge directories are present or intentionally empty
- verify that existing Markdown knowledge is readable

Do not silently select an unrelated Twin Data repository.
Do not silently create, attach, copy, move, or modify Twin Data during discovery.

In Observe Mode, do not perform Twin Data discovery or retrieval merely to observe the session.

## Loading Strategy

In Assist Mode, do not load all Twin Data by default.

Initial activation loads:

1. Data directory README when available
2. Identity

After the user provides a task, load only the relevant:

3. Principles
4. Decisions
5. Projects

Always consider Identity when valid Twin Data is available.
Load other knowledge areas only when relevant to the task.

Observe Mode does not load Twin Data.

## Normalized Knowledge

Knowledge may use YAML front matter followed by Markdown. Permanent metadata is intentionally minimal and should contain only:

- `scope`
- `status`

The knowledge type is determined by the destination directory (`identity/`, `principles/`, `decisions/`, or `projects/`).

Treat `status: confirmed` as permanent knowledge. Do not treat candidate content or extraction-only metadata as permanent knowledge.

Skip files whose `status` is `superseded` entirely during loading — do not load them for current guidance, even when their knowledge area is otherwise relevant to the task.

Existing knowledge without front matter remains valid and should not be rewritten automatically.

## Using Context

In Assist Mode, treat Engineering Twin Data as guidance, not absolute rules.

- Consider previous decisions.
- Explain relevant trade-offs.
- Maintain consistency when appropriate.
- Identify conflicts between current context and previous decisions.
- Do not blindly follow outdated decisions.
- Do not assume previous solutions are always correct.

When a previous decision may no longer apply, explain the changed conditions before recommending a different approach.

Observe Mode does not use existing Twin context to guide current reasoning.

## Knowledge Health Signals

While using Twin Data in Assist Mode, watch for knowledge that may be stale, conflicting, or no longer useful.

Raise a review signal only when there is concrete evidence such as:

- current project state clearly contradicts a project record
- a decision has been explicitly replaced by a newer decision
- the implementation or constraint described by a record no longer exists
- a record depends on a premise that has materially changed

Age, low usage, or unfamiliar wording alone is not sufficient evidence that knowledge is stale.

Do not modify or delete the record. Explain the conflict or changed condition and suggest an `extract-engineering-twin` review of the affected knowledge.

## Knowledge Safety

- Never invent engineer identity, preferences, principles, or decisions.
- Do not treat temporary behavior as permanent knowledge.
- Do not modify Twin Data silently.
- Permanent Twin Data updates require human approval.

Observed behavior is not automatically confirmed engineering knowledge.

## Scope

Engineering Twin defines how engineering context is used.

It does not define:

- communication style
- general AI behavior
- system prompt policy
- agent-specific workflow rules

Those concerns belong to the AI agent's own configuration, such as `CLAUDE.md`.

## Setup

Creating or importing Twin Data is handled by the `setup-engineering-twin` Skill.

Do not use this Skill to initialize a new Twin Data repository.

## Knowledge Updates

When the current session surfaces something worth capturing as permanent knowledge — a new decision, principle, or project context — proactively ask the user whether to invoke the `extract-engineering-twin` Skill to process it.

In Observe Mode, only ask when the Capture Threshold is met.

Do not write or modify Twin Data directly from this Skill.

## Skill Packaging

This Skill must remain self-contained after installation.

For normal operation, do not depend on files outside this Skill directory.
Use bundled files under `references/` when additional material is required.
