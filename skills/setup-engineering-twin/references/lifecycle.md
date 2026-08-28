# Setup Engineering Twin Lifecycle Reference

A setup operation follows this lifecycle:

```text
Start
  |
  v
Create / Import
  |
  v
Validate
  |
  v
Human Review
  |
  v
Save Configuration
  |
  v
Report Result
```

## Create

Create a new Twin Data structure from the templates bundled with this Skill. Do not overwrite existing user files silently.

## Import

Validate the existing Twin Data and point Configuration at it. Do not copy, relocate, rename, or rewrite existing user-owned knowledge automatically.

## Completion

Setup is complete only when the Twin Data location is established or confirmed, required validation is satisfied or explicitly accepted, required review has occurred for new knowledge, and Configuration has been updated when applicable.
