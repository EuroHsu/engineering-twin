# Engineering Twin Lifecycle

The lifecycle is intentionally simple:

```text
Install Skills
      ↓
Create / Import Twin Data
      ↓
Configure Twin Data location
      ↓
User activates /engineering-twin
      ↓
Load relevant Twin context
      ↓
AI-assisted engineering work
      ↓
Historical extraction when requested
      ↓
Knowledge Candidate
      ↓
Human Review
      ↓
Twin Data Update
```

## Responsibility

```text
setup-engineering-twin
= Create / Import / Validate / Configure

engineering-twin
= Session Activation / Discover / Load / Interpret / Apply

extract-engineering-twin
= Analyze historical evidence / Propose candidates
```

Engineering Twin is opt-in for the current session. It does not replace the AI agent or its own configuration.

Engineering Twin Data remains separate from the Skills and local configuration.

Detailed operational lifecycle rules are maintained inside the relevant Skill packages.