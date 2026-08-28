# Setup Engineering Twin Lifecycle Reference

A setup operation manages the Twin Data container and its active configuration:

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
Configure / Switch
  |
  v
Report Result
```

## Create

Create an empty Twin Data structure containing `twin.yaml` and the standard knowledge directories. Do not create knowledge files or populate knowledge during setup.

## Import

Validate the existing Twin Data and point Configuration at it. Do not copy, relocate, rename, rewrite, or normalize existing user-owned knowledge automatically.

## Configure / Switch

Configuration identifies which Twin Data is active. Changing the active path requires explicit user confirmation and must not modify the previous Twin Data.

## Knowledge Population

Use `extract-engineering-twin` to acquire, review, and write permanent knowledge from existing evidence.

## Completion

Setup is complete when the Twin Data location is established or confirmed, required validation is satisfied or explicitly accepted, and Configuration has been updated when applicable.
