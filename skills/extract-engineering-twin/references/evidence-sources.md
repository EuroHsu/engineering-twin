# Historical Evidence Sources

Historical evidence should be accessed through capabilities already available to the AI agent.

## Canonical Source Types

### AI Coding Agent Sessions

Use sessions when they are actually accessible in the current environment.

Possible local providers include:

- Claude Code: `$HOME/.claude/projects/`
- Gemini CLI: `$HOME/.gemini/tmp/`
- GitHub Copilot CLI: `$HOME/.copilot/session-state/`

These are source locations, not guarantees that readable sessions exist.

Treat session content as evidence. Distinguish user decisions, AI suggestions, exploration, rejected options, temporary experiments, and final outcomes.

### Git History

Use local Git history when available. Commits are evidence of implementation and sequencing, not definitive evidence of intent.

### Pull Requests and Reviews

Use pull requests and reviews when available. Distinguish proposals, reviewer suggestions, rejected approaches, and final human decisions.

### Documents and User-Provided Records

Use architecture documents, decision records, project documentation, exports, transcripts, or other records supplied or accessible in the current environment.

## Optional Sources

VS Code internal workspace storage and other agent-specific internal stores may vary by product and version. Treat them as optional and implementation-dependent rather than canonical sources.

## Cross-Platform Paths

Use `$HOME` to express user-local paths. Resolve it through the current environment rather than hard-coding Linux, macOS, or Windows absolute paths.

## Access Rules

- Check whether a source is actually accessible before using it.
- Do not claim to have inspected inaccessible history.
- Use bounded discovery based on the user's requested scope.
- Preserve source provenance in every knowledge candidate.
- Do not scan unrelated historical material simply because it is available.
