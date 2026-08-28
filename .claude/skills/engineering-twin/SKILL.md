---
name: engineering-twin
description: Load and apply relevant Engineering Twin context when working on architecture, coding, technical decisions, or project engineering questions. Use when engineer-specific principles, prior decisions, or project context may affect the task.
---

# Engineering Twin

Use Engineering Twin as engineering context, not as a replacement for reasoning.

## Runtime

When this repository is available in the current workspace, invoke the local runtime:

```bash
node skill/runtime.js '{"workspacePath":"<workspace>","task":{"type":"<task-type>","query":"<task-query>"}}'
```

Prefer an explicitly configured Twin Data path when one is available:

```bash
node skill/runtime.js '{"configuredPath":"<twin-data-path>","task":{"type":"<task-type>","query":"<task-query>"}}'
```

Use the returned structured context to inform the current task.

## Loading Rules

Load context progressively:

1. Metadata
2. Identity
3. Relevant principles
4. Relevant decisions
5. Relevant project context

Do not load unrelated Twin Data merely because it exists.

## Context Rules

Engineering Twin information is guidance.

- Consider prior decisions.
- Explain relevant trade-offs.
- Maintain consistency when appropriate.
- Identify conflicts between current context and prior decisions.
- Do not blindly follow outdated decisions.
- Do not assume previous solutions are always correct.

## Knowledge Safety

- Never invent engineer preferences or principles.
- Do not treat temporary behavior as permanent knowledge.
- Do not modify Twin Data automatically.
- Permanent knowledge updates require human approval.

## External Twin Data

When the Twin Data repository is external to this workspace, use its configured path with the runtime rather than copying the knowledge into the project.

If no valid Twin Data is found, continue using normal reasoning without inventing engineer-specific context.
