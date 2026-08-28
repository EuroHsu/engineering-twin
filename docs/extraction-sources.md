# Engineering Twin Historical Evidence Access

Version: 0.2

Status: Draft

Date: 2026-08-28

## 1. Purpose

This document defines how `extract-engineering-twin` obtains historical engineering evidence.

The Skill analyzes evidence available to the AI agent. It does not create a centralized history store or implement a proprietary retrieval system.

## 2. Access Principle

Historical evidence should be accessed through capabilities already available in the current AI-agent environment.

Possible access mechanisms include:

- files available in the current workspace
- user-provided exported records
- local Git history
- connected Git hosting or project-management integrations
- AI coding agent session records exposed by the environment
- other explicitly available tools or integrations

The Skill must not assume that a particular source is available.

## 3. Platform Path Convention

Agent-specific local paths should be documented relative to the user's home directory rather than as OS-specific absolute paths.

Use:

```text
$HOME
```

or the equivalent user-home concept provided by the current environment.

Do not hard-code a username, drive letter, or operating-system-specific home path into the Skill.

The same logical source may therefore resolve to:

```text
Linux:   /home/<user>/...
macOS:   /Users/<user>/...
Windows: C:\Users\<user>\...
```

The Skill should rely on the agent environment to resolve the home directory.

## 4. Known Local Session Sources

The following paths are supported source conventions for commonly used coding agents.

| Agent | Logical session root | Source status | Notes |
|---|---|---|---|
| Claude Code | `$HOME/.claude/projects/` | Canonical local source | Sessions are organized by project; individual session records may be stored below project directories. |
| Gemini CLI | `$HOME/.gemini/tmp/` | Canonical local source | Project-specific session data may exist below the project-specific directory. |
| GitHub Copilot CLI | `$HOME/.copilot/session-state/` | Canonical local source | Session state is organized by session; use available session records as evidence. |
| VS Code Copilot internal storage | `$HOME/.config/Code/User/workspaceStorage/` on Linux-like environments | Optional / environment-dependent | Do not treat this path as a universal Copilot session format. It varies with editor, platform, and implementation. |

These are discovery conventions, not guarantees that a session exists or that its contents are directly readable in every installation.

## 5. Claude Code Sessions

Preferred local discovery root:

```text
$HOME/.claude/projects/
```

The Skill should first narrow by project when the user requests project-scoped extraction.

When inspecting session records:

- identify the relevant project scope
- identify the relevant session records
- preserve the session path or another stable source identifier when available
- distinguish user-authored decisions from AI-generated suggestions
- distinguish exploration, rejected approaches, temporary experiments, and final outcomes

Do not treat the entire contents of a session as one authoritative engineering statement.

## 6. Gemini CLI Sessions

Preferred local discovery root:

```text
$HOME/.gemini/tmp/
```

The Skill should narrow to the relevant project-specific area before inspecting session data.

Do not assume that every directory below the root is a usable conversation record. Inspect available files and use only the evidence that can actually be interpreted.

## 7. GitHub Copilot CLI Sessions

Preferred local session root:

```text
$HOME/.copilot/session-state/
```

When available, session-specific event or record files may provide historical evidence.

The Skill should not infer engineering intent from a session state directory alone. It must inspect the available records and distinguish user actions, AI suggestions, experiments, and outcomes.

## 8. VS Code Internal Storage

VS Code workspace storage should be treated as an optional, implementation-dependent evidence source rather than a canonical Copilot session source.

For environments where it is applicable, a common Linux-like location is:

```text
$HOME/.config/Code/User/workspaceStorage/
```

Other operating systems use different VS Code data roots. The Skill should not assume that this storage contains a stable, portable conversation format.

Prefer a direct AI-agent session source, explicit export, or supported integration when available.

## 9. Source Selection

Select evidence sources according to the user's requested scope and the evidence needed to answer the extraction request.

Prefer direct and authoritative evidence when available, but use multiple sources when they provide useful independent support.

Examples:

```text
User asks about architecture decisions in one project
        |
        +--> inspect architecture documents
        +--> inspect relevant pull requests
        +--> inspect related Git history
        +--> inspect sessions when available
```

Do not scan unrelated history simply because it exists.

## 10. Session Availability

A source path being known does not mean that the source is available.

Before relying on a local session source, verify that:

- the expected root exists
- relevant records are present
- the records are readable in the current environment
- the contents can be interpreted sufficiently for the requested extraction

If a source is unavailable, continue with other available evidence when possible and disclose the limitation.

The Skill must not claim to have inspected sessions that were not accessible.

## 11. Other Evidence Sources

Historical extraction may also use:

- local Git history
- pull requests and reviews
- architecture or technical decision documents
- project documentation
- user-provided exports or records
- connected integrations

Git commits should normally establish what changed, not by themselves why it changed.

Pull request discussions may provide stronger evidence of human reasoning, but proposals and review comments must be distinguished from final decisions.

## 12. Provenance

Every knowledge candidate should retain enough provenance to explain its evidence source.

Where available, include:

- source type
- source identifier, path, URL, or commit reference
- relevant date or date range
- project or topic
- concise evidence excerpt or summary

Do not copy large historical records into the candidate when a concise reference is sufficient.

## 13. Access Failure

When a requested evidence source is unavailable:

- state that the source could not be accessed
- continue only with evidence that is actually available
- do not fabricate missing historical context
- lower confidence when missing evidence materially affects the conclusion
- ask the user for an export or additional access only when necessary to answer the request

## 14. Privacy and Scope

Historical engineering records may contain unrelated or sensitive information.

Extraction should access only the material needed for the requested scope.

Do not preserve unrelated conversation content as Twin knowledge.

## 15. Separation From Skill Implementation

This access model intentionally does not prescribe a parser, database, indexing layer, vector store, or custom runtime.

The AI agent and its available tools provide the execution mechanism. The Skill defines how historical evidence should be selected, interpreted, and converted into reviewable knowledge candidates.