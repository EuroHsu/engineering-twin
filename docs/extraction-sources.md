# Engineering Twin Historical Evidence Access

Version: 0.1

Status: Draft

Date: 2026-08-28

## 1. Purpose

This document defines how `extract-engineering-twin` obtains historical engineering evidence.

The Skill is responsible for analyzing evidence that is available to the AI agent. It is not responsible for creating a centralized history store or implementing a proprietary retrieval system.

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

## 3. Source Selection

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

## 4. Historical AI Coding Sessions

AI coding sessions may be used as evidence when they are accessible in the current environment.

The Skill should:

- identify the relevant session or bounded set of sessions
- preserve enough source information to identify where evidence came from
- distinguish user decisions from AI-generated suggestions
- distinguish exploration, rejected options, temporary experiments, and final outcomes
- avoid treating a complete session as a single authoritative statement

If sessions are not directly accessible, the Skill may use user-provided exports or another available evidence source.

The Skill must not claim to have inspected sessions that were not accessible.

## 5. Git History

Git history can provide evidence about implementation changes and sequencing.

Git commits should normally be treated as evidence of what changed, not definitive evidence of why the engineer made the change.

When possible, combine commits with pull requests, documentation, or explicit decision records to establish rationale.

## 6. Pull Requests and Reviews

Pull requests and reviews can provide stronger evidence of human discussion and accepted trade-offs.

When extracting from them, distinguish:

- proposed approaches
- reviewer suggestions
- rejected alternatives
- final decisions

A review comment is not automatically the engineer's final position.

## 7. User-Provided Evidence

Users may provide session exports, transcripts, documents, links, or other records.

Treat these as evidence within the scope explicitly requested by the user.

Do not infer that user-provided material represents the engineer's current preference unless the evidence supports that interpretation and the user confirms it when required.

## 8. Provenance

Every knowledge candidate should retain enough provenance to explain its evidence source.

Where available, include:

- source type
- source identifier, path, URL, or commit reference
- relevant date or date range
- project or topic
- concise evidence excerpt or summary

Do not copy large historical records into the candidate when a concise reference is sufficient.

## 9. Access Failure

When a requested evidence source is unavailable:

- state that the source could not be accessed
- continue only with evidence that is actually available
- do not fabricate missing historical context
- lower confidence when missing evidence materially affects the conclusion
- ask the user for an export or additional access only when necessary to answer the request

## 10. Privacy and Scope

Historical engineering records may contain unrelated or sensitive information.

Extraction should access only the material needed for the requested scope.

Do not preserve unrelated conversation content as Twin knowledge.

## 11. Separation From Skill Implementation

This access model intentionally does not prescribe a parser, database, indexing layer, vector store, or custom runtime.

The AI agent and its available tools provide the execution mechanism. The Skill defines how historical evidence should be selected, interpreted, and converted into reviewable knowledge candidates.
