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

The Skill must not assume that a historical source is locally accessible.
When a source requires an external integration, export, or user-provided file,
use the available access mechanism or ask the user to provide the evidence.


## 4. Evidence Strength

A useful default ordering is:

1. Explicit technical decisions or written rationale
2. Human-authored architecture or project documentation
3. Pull request discussion and review decisions
4. Git commits and implementation history
5. AI coding agent session observations
6. Indirect behavioral patterns

This ordering is guidance, not an absolute ranking.
Explicit human-confirmed evidence can outweigh a lower-ranked source.

Evidence from multiple independent sources is stronger than repeated observations
from one source.


## 5. Scope

Extraction should operate on an explicit or clearly bounded historical scope.

Possible scopes include:

- a date range
- one or more projects
- selected sessions
- a technology or architecture topic
- selected commits
- selected pull requests

Do not broaden the historical search unnecessarily.
If the requested scope is ambiguous, prefer the narrowest reasonable interpretation.


## 6. Evidence Records

For each important observation, retain enough provenance for a human to verify it.

A useful evidence record contains:

- source type
- source identifier or location
- relevant date or range, when available
- project or topic, when known
- concise evidence excerpt or summary
- whether the evidence is explicit, observed, or inferred

Reference evidence rather than reproducing large historical records.


## 7. Evidence, Observation, and Candidate

Extraction must distinguish three levels:

### Evidence

What the historical record directly shows.

### Observation or Pattern

A concise description of recurring or notable behavior supported by the evidence.

### Knowledge Candidate

A proposed engineering principle, decision, or project-context statement that may
be worth preserving.

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


## 8. Candidate Requirements

A candidate should normally have:

- one or more concrete evidence references
- a clear explanation of the inferred pattern
- uncertainty or confidence information
- a suggested target in Twin Data

Do not create a candidate solely from an isolated implementation detail unless
the user explicitly asks for that observation.

AI-generated speculation should not be treated as engineering evidence.


## 9. Human Review

Candidates must be presented before permanent Twin Data changes.

The user may:

- accept
- reject
- edit
- defer

Only an explicit acceptance or approved edit authorizes a permanent update.

The review should preserve the distinction between the original candidate and the
user's final decision.


## 10. Candidate Output

A candidate should be presented with:

```text
Knowledge Candidate

Type:
Principle | Decision | Project Context | Other

Candidate:
<proposed knowledge>

Evidence:
- <source type / identifier / relevant context>
- <source type / identifier / relevant context>

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


## 11. Historical Session Handling

Historical AI coding agent sessions are evidence sources, not authoritative statements
of engineering preference.

Session content may contain:

- temporary experiments
- rejected ideas
- AI-generated suggestions
- debugging steps
- exploratory reasoning
- final decisions

A session should not be treated as a single coherent statement of engineering intent.

When a session contains both exploration and a final human decision, preserve the
confirmed outcome and enough context to interpret it.

When no clear human decision exists, preserve the uncertainty.


## 12. Git and Project History

Git commits show what was implemented, but implementation alone does not necessarily
establish why the engineer chose it.

Use commit messages, related documentation, and pull request discussion when available
to distinguish implementation facts from engineering intent.

A later change can show that an implementation changed, but a change alone does not
prove that the earlier approach was rejected as a general principle.


## 13. Conflicting Evidence

When historical evidence conflicts:

- preserve the conflict
- identify the differing contexts
- avoid forcing a universal preference
- prefer explicit later decisions when they clearly supersede earlier ones
- present uncertainty to the user

Conflicting evidence may indicate that a principle is conditional rather than universal.


## 14. No Automatic Persistence

Extraction must never:

- silently modify Twin Data
- commit changes to the Twin Data repository without approval
- modify the Skill repository
- convert observations into permanent principles automatically

The human remains the authority over permanent Engineering Twin knowledge.
