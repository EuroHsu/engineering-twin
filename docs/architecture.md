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

- locating Twin Data
- loading relevant context
- validating Twin Data compatibility


## 5.3 Engineering Twin Data

Responsible for:

- storing personal engineering knowledge
- maintaining principles and decisions
- evolving through Git history


# 6. Data Model

Engineering Twin Data contains five components.


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


# 7. Data Flow


Engineering Activity

        |

        v

AI Agent Session

        |

        v

Engineering Insight / Decision Candidate

        |

        v

Human Review

        |

        v

Engineering Twin Data


# 8. Design Principles


## Human First

The data should always be understandable
by humans.


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
- Automated insight extraction

These should extend the core model
without changing the fundamental data structure.
