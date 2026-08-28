# Engineering Twin Context Loading Reference

Engineering Twin context should be loaded progressively rather than loading all Twin Data for every task.

## Loading Order

1. Metadata
2. Identity
3. Relevant Principles
4. Relevant Decisions
5. Relevant Projects

Always consider Identity when valid Twin Data is available. Load other knowledge areas only when relevant.

## Using Previous Decisions

When a relevant decision exists:

- explain why the decision was made
- consider whether the original context still applies
- identify changed conditions
- explain trade-offs when suggesting a different approach

Previous decisions are guidance, not immutable rules.

## Knowledge Boundary

Engineering Twin provides engineering context. It does not define:

- communication style
- general AI behavior
- system prompt policy
- agent-specific workflow rules

Those concerns belong to the AI agent's own configuration.
