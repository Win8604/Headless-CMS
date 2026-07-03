---
description: Create a pull request
---

## Variables

TO_BRANCH: $1 (defaults to `main`)
FROM_BRANCH: $2 (defaults to current branch)

## Workflow

- Use `.agent/agents/git-manager.md` agent to create a pull request from {FROM_BRANCH} to {TO_BRANCH} branch.

## Notes

- If `gh` command is not available, instruct the user to install and authorize GitHub CLI first.
