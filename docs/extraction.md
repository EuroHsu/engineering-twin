# Engineering Twin Extraction

Version: 0.1

Status: Draft

Date: 2026-08-28


## 1. Purpose

The Extraction model defines how historical engineering activity can be analyzed
for potential Engineering Twin knowledge.

Extraction is a discovery process.

It does not turn historical activity into permanent Twin knowledge automatically.


## 2. Responsibility

`extract-engineering-twin` is responsible for:

- identifying historical engineering evidence
- finding recurring observations and patterns
- separating evidence from interpretation
- proposing knowledge candidates
- presenting candidates for human review

It is not responsible for:

- daily engineering context usage
- creating or importing a Twin Data repository
- deciding that a candidate is permanent knowledge
- silently modifying Twin Data


## 3. Evidence Sources

Extraction may use historical engineering records available to the AI agent,
including:

- AI coding agent sessions
- Git commits and history
- pull requests and reviews
- architecture or technical decision documents
- project documentation
- other user-provided engineering records

No single source is mandatory.

The Skill should use the most relevant reliable evidence available for the requested scope.


## 4. Source Trust

Evidence should be evaluated according to how directly it represents an engineering decision.

A useful default ordering is:

1. Explicit technical decisions or written rationale
2. Human-authored architecture or project documentation
3. Pull request discussion and review decisions
4. Git commits and implementation history
5. AI coding agent session observations
6. Indirect behavioral patterns

This ordering is guidance, not an absolute ranking.

Evidence from multiple independent sources is stronger than repeated observations from one source.


## 5. Scope

Extraction should operate on an explicit or clearly bounded historical scope.

Possible scopes include:

- a date range
- one or more projects
- selected sessions
- a technology or architecture topic
- selected commits
- selected pull requests

Do not scan unrelated historical material when it is not needed for the request.


## 6. Evidence and Interpretation

Extraction must distinguish three levels:

### Evidence

What the historical record directly shows.

### Observation or Pattern

A concise description of recurring or notable behavior supported by the evidence.

### Knowledge Candidate

A proposed engineering principle, decision, or project-context statement that may be worth preserving.

Example:

```text
Evidence:
The engineer selected ECS instead of Lambda in three projects and documented
cost and workload isolation as reasons.

Observation:
Workload isolation and predictable operating cost appear repeatedly in
container deployment decisions.

Knowledge Candidate:
For long-running or independently scaled workloads, prefer deployment models
that provide explicit workload isolation and predictable operating cost.
```

The candidate remains unconfirmed until human review.


## 7. Evidence Requirements for Candidates

A candidate should normally have:

- one or more concrete evidence references
- a clear explanation of the inferred pattern
- uncertainty or confidence information
- a suggested target in Twin Data

Do not create a candidate solely from an isolated implementation detail unless
the user explicitly asks for that observation.


## 8. Candidate Review

Candidates must be presented before permanent Twin Data changes.

The user may:

- accept
- reject
- edit
- defer

Only an explicit acceptance or approved edit authorizes a permanent update.


## 9. Candidate Output

A candidate should be presented with:

```text
Knowledge Candidate

Type:
Principle | Decision | Project Context | Other

Candidate:
<proposed knowledge>

Evidence:
- <source and relevant context>
- <source and relevant context>

Observation:
<what the evidence shows>

Interpretation:
<why the candidate follows from the evidence>

Confidence:
Low | Medium | High

Suggested Location:
<Engineering Twin Data path>

Review:
Accept | Edit | Reject | Defer
```

The output is a review artifact, not permanent Twin Data.


## 10. Historical Session Handling

Historical AI coding agent sessions are evidence sources, not authoritative statements of engineering preference.

Session content may contain:

- temporary experiments
- rejected ideas
- AI-generated suggestions
- debugging steps
- exploratory reasoning
- final decisions

Extraction must distinguish these cases.

A session should not be treated as a single coherent statement of engineering intent.

When a session contains both exploration and a final decision, prefer the explicitly confirmed outcome and retain the surrounding context needed to interpret it.


## 11. Conflicting Evidence

When historical evidence conflicts:

- preserve the conflict
- identify the different contexts
- avoid forcing a single preference
- prefer explicit later decisions when they clearly supersede earlier ones
- present uncertainty to the user

Conflicting evidence may indicate that a principle is conditional rather than universal.


## 12. No Automatic Persistence

Extraction must never:

- silently modify Twin Data
- commit changes to the Twin Data repository without approval
- modify the Skill repository
- convert observations into permanent principles automatically

The human remains the authority over permanent Engineering Twin knowledge.
