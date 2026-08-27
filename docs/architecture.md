# Engineering Twin Architecture

Version: 0.1

Status: Draft

Date: 2026-08-28


# 1. Overview

Engineering Twin is a personal engineering intelligence layer
for AI coding agents.

It captures an engineer's:

- engineering preferences
- architectural principles
- technical decisions
- project experiences

and provides relevant context to AI assistants.

The goal is not to train an AI model,
but to provide a structured representation of
how an engineer thinks and makes decisions.


# 2. Problem Statement

Modern AI coding assistants are capable of generating code
and solving technical problems.

However, they usually lack understanding of:

- the engineer's preferred architecture style
- previous technical decisions
- trade-off preferences
- long-term engineering principles

As a result, AI suggestions may be technically correct
but inconsistent with the engineer's usual approach.


# 3. Goals

Engineering Twin aims to:

## 3.1 Personalize AI Assistance

Enable AI agents to understand:

- who the engineer is
- what technologies they prefer
- what principles guide their decisions


## 3.2 Preserve Engineering Knowledge

Store valuable engineering decisions in a format that is:

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

Engineering Twin consists of two major parts:


## 5.1 Engineering Twin Skill

Responsible for:

- integrating with AI coding agents
- loading relevant context
- providing engineering guidance


## 5.2 Engineering Twin Data

Responsible for:

- storing personal engineering knowledge
- maintaining decisions and principles
- evolving through Git history


Relationship:


AI Agent

    |

    v

Engineering Twin Skill

    |

    v

Engineering Twin Data



# 6. Data Model

Engineering Twin Data contains four layers.


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

- architecture preferences
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


# 7. Data Flow


Engineering Activity

        |

        v

Claude Code Session

        |

        v

Decision Candidate

        |

        v

Human Review

        |

        v

Engineering Twin Data

        |

        v

Future AI Context



# 8. Design Principles


## Human First

The data should always be understandable by humans.


## Git Native

Engineering knowledge should evolve through
normal version control workflows.


## Explicit Over Automatic

AI may suggest updates,
but humans approve changes.


## Context Over History

Store meaningful engineering knowledge,
not all raw conversations.


# 9. Future Extensions

Possible future components:

- CLI
- MCP integration
- Hermes Agent adapter
- VS Code extension
- Automated decision extraction

These should extend the core model
without changing the fundamental data structure.
