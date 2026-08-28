# Engineering Twin Architecture

Version: 0.2

Status: Draft

Date: 2026-08-28


# 1. Overview

Engineering Twin is a personal engineering intelligence layer
for AI coding agents.

It captures an engineer's:

- engineering principles
- architectural principles
- technical decisions
- project context

and provides relevant context to AI assistants.

The goal is not to train an AI model,
but to provide a structured representation of
how an engineer thinks and makes decisions.


# 2. Problem Statement

Modern AI coding assistants are capable of generating code
and solving technical problems.

However, they usually lack understanding of:

- the engineer's architectural principles
- previous technical decisions
- trade-off considerations
- long-term engineering principles

As a result, AI suggestions may be technically correct
but inconsistent with the engineer's usual approach.


# 3. Goals

Engineering Twin aims to:


## 3.1 Align AI Assistance With Engineering Context

Enable AI agents to understand:

- who the engineer is
- what technologies they use
- what principles guide their decisions


## 3.2 Preserve Engineering Knowledge

Store valuable engineering knowledge in a format that is:

- human readable
- Git version controlled
- portable
- AI consumable


## 3.3 Support Long-term Evolution

Allow the Engineering Twin to evolve through:

Experience

↓

Decision Candidate

↓

Human Review

↓

Twin Knowledge Update


# 4. Non-Goals

Engineering Twin is NOT:


## 4.1 An AI Model

It does not train or fine-tune language models.


## 4.2 An Autonomous Agent

It does not replace AI agents such as Claude Code.


## 4.3 A Knowledge Database

It does not aim to store all conversations or logs.


## 4.4 A Backend Platform

It does not require:

- API server
- database
- cloud infrastructure


# 5. Core Concept

Engineering Twin works as a three-layer system.


## 5.1 AI Agent

Responsible for:

- reasoning
- coding
- problem solving


## 5.2 Engineering Twin Skill

Responsible for:

- locating Engineering Twin Data
- determining relevant context
- guiding context loading
- defining how Twin knowledge should be used

The Skill is an instruction layer for an AI agent,
not a separate reasoning engine.


## 5.3 Engineering Twin Data

Responsible for:

- storing personal engineering knowledge
- maintaining principles and decisions
- evolving through Git history

Engineering Twin Data is independent of the Skill
and may be stored in a separate repository or directory.


# 6. Skill Model

Engineering Twin is distributed as AI agent Skills.

The repository contains two complementary Skills:


## 6.1 Engineering Twin Skill

Purpose:

Provide engineering context during normal AI-assisted work.

It explains how the AI agent should:

- discover Twin Data
- load relevant knowledge
- consider previous decisions
- apply engineering context
- respect Twin knowledge safety rules


## 6.2 Setup Engineering Twin Skill

Purpose:

Create or import Engineering Twin Data.

It guides the user through:

- creating a new Twin Data repository
- importing existing Twin Data
- validating the data structure
- reviewing initial knowledge
- configuring the Twin Data location

Setup is separate from daily Twin usage.


# 7. Configuration Model

Engineering Twin Configuration records which user-owned
Engineering Twin Data repository or directory should be used.

Configuration is separate from Engineering Twin Data.

The recommended user-level configuration file is:

`~/.config/engineering-twin/config.yaml`

Example:

```yaml
version: 1

twinData:
  path: ~/workspace/my-engineering-twin-data
```

Configuration stores environment-specific information,
such as the Twin Data location.

It does not store:

- engineer identity
- engineering principles
- technical decisions
- project knowledge
- communication preferences
- general AI behavior
- agent-specific instructions

The initial configuration supports one active Twin Data location
per configuration scope.

When multiple configuration scopes exist, the recommended priority is:

1. Explicit path provided for the current task
2. Workspace-level configuration
3. User-level configuration
4. No configured Twin Data

If no location can be determined, the AI agent should not invent
engineer-specific context. The user may use the Setup Engineering Twin
Skill to create or import Twin Data.


# 8. Data Model

Engineering Twin Data consists of five areas:


## Metadata

Stored in:

twin.yaml

Purpose:

- schema version
- Twin instance information
- basic configuration


## Identity

Answers:

"Who is this engineer?"


Examples:

- role
- technical background
- primary stack


## Principles

Answers:

"What does this engineer value?"


Examples:

- architecture principles
- coding style
- engineering philosophy


## Decisions

Answers:

"How did this engineer make choices?"


Examples:

- technology selection
- architecture trade-offs
- rejected alternatives


## Projects

Answers:

"In what context were decisions made?"


# 9. Data Flow


Engineering Activity

        |

        v

AI Agent

        |

        | uses

        v

Engineering Twin Skill

        |

        | reads

        v

Engineering Twin Data

        |

        v

Relevant Engineering Context

        |

        v

AI Agent Reasoning


Knowledge evolution follows:

Engineering Activity

        |

        v

Engineering Insight / Decision Candidate

        |

        v

Human Review

        |

        v

Engineering Twin Data


# 10. Repository Model

The Engineering Twin repository contains Skills and documentation.

A typical repository structure is:

engineering-twin/

├── README.md
│
├── docs/
│   ├── architecture.md
│   ├── configuration.md
│   └── data-schema.md
│
└── skills/
    ├── engineering-twin/
    │   └── SKILL.md
    │
    └── setup-engineering-twin/
        ├── SKILL.md
        └── templates/

The repository does not contain a user's personal Engineering Twin Data.

Twin Data is created or imported separately.


# 11. Design Principles


## Human First

The data should always be understandable
by humans.


## Markdown Native

Engineering knowledge should primarily be represented
as Markdown, with YAML used only for structured metadata.


## Git Native

Engineering knowledge should evolve through
normal version control workflows.


## Explicit Over Automatic

AI may suggest updates,
but humans approve changes.


## Context Over History

Store meaningful engineering knowledge,
not all raw conversations.


# 12. Future Extensions

Possible future components:

- additional AI agent Skills
- MCP integration
- Hermes Agent adapter
- VS Code integration
- automated insight extraction
- schema validation tooling

These should extend the core model
without turning Engineering Twin into a backend system.
