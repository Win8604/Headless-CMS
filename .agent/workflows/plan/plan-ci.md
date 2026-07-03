---
description: Analyze Github Actions logs and provide a plan to fix the issues
---

# CI/CD Issue Analysis & Fix Plan

Analyze GitHub Actions logs, find root causes, and create a detailed fix plan.

## Workflow

### 1. Get GitHub Actions Logs

Use `run_command` with `gh` CLI to fetch logs:

```bash
gh run view <run-id> --log
gh run list --limit 10
```

Or use `read_url_content` if provided a GitHub Actions URL.

### 2. Analyze Issues

- Identify failing steps and error messages
- Find root causes of failures
- Check for environment issues, dependency problems, or test failures

### 3. Create Fix Plan

Create plan following `.agent/agents/planner.md` methodology:

- Save to `plans/{YYYY-MM-DD}-ci-fix-{issue}/plan.md`
- Include phase files for each fix area

**Output Requirements:**

- Provide at least 2 implementation approaches with clear trade-offs
- Explain pros and cons of each approach
- Provide a recommended approach

### 4. Review

Ask user for confirmation before implementing.

## Important Notes

**IMPORTANT:** Sacrifice grammar for concision when writing outputs.
**IMPORTANT:** List unresolved questions at the end, if any.
**IMPORTANT:** Do not start implementing without user approval.
