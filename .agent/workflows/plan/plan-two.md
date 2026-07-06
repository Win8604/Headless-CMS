---
description: ⚡⚡⚡⚡ Research & create an implementation plan with 2 approaches
---

# Implementation Plan with Multiple Approaches

Create 2 detailed implementation plans for the given task using the planner agent methodology.

## Workflow

### 1. Create Plan Directory

Create a directory: `plans/{YYYY-MM-DD}-{plan-name}/`

Example: `plans/2025-12-31-multi-tenant-architecture/`

### 2. Research Phase

Use `search_web` and `read_url_content` to research best practices:

- Research different approaches to the task
- Find industry standards and patterns
- Maximum 5 research queries per topic

### 3. Analyze Codebase

Use code analysis tools to understand current implementation:

- Use `view_file_outline` to understand file structures
- Use `grep_search` to find relevant patterns
- Use `find_by_name` to locate related files
- Read `docs/codebase-summary.md`, `docs/code-standards.md`, `docs/system-architecture.md`

### 4. Create Implementation Plan

Gather all research and create plan with `.agent/agents/planner.md` methodology:

- Save overview at `plans/{date}-plan-name/plan.md`
- Create phase files: `plans/{date}-plan-name/phase-XX-name.md`

**Output Requirements:**

- Provide at least 2 implementation approaches with clear trade-offs
- Explain pros and cons of each approach
- Provide a recommended approach with rationale

### 5. Review

Present plan to user for review before implementation.

## Output Structure

```
plans/{date}-plan-name/
├── plan.md                    # Overview (< 80 lines)
├── phase-01-*.md              # Phase files
├── phase-02-*.md
└── reports/
    └── research-*.md          # Research reports
```

## Important Notes

**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing.
