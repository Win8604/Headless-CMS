---
description: ⚡⚡ No research. Only analyze and create an implementation plan
---

# Fast Implementation Plan (No Research)

Create an implementation plan by analyzing existing codebase without external research.

## Workflow

### 1. Create Plan Directory

Create directory: `plans/{YYYY-MM-DD}-{plan-name}/`

Example: `plans/2025-12-31-feature-name/`

### 2. Analyze Codebase

Read existing documentation:

- `docs/codebase-summary.md`
- `docs/code-standards.md`
- `docs/system-architecture.md`
- `docs/project-overview-pdr.md`

Use code analysis tools:

- Use `view_file_outline` to understand file structures
- Use `grep_search` to find relevant patterns
- Use `find_by_name` to locate related files

### 3. Create Implementation Plan

Follow `.agent/agents/planner.md` methodology:

- Save overview at `plans/{date}-plan-name/plan.md`
- Create phase files: `plans/{date}-plan-name/phase-XX-name.md`

### 4. Review

Ask user to review the plan before implementation.

## Output Structure

```
plans/{date}-plan-name/
├── plan.md                    # Overview (< 80 lines)
├── phase-01-*.md              # Phase files
├── phase-02-*.md
└── reports/
    └── analysis-*.md          # Analysis reports
```

## Plan File Specification

### plan.md (Overview)

- Keep generic and under 80 lines
- List each implementation phase with status and progress
- Include links to phase files

### phase-XX-\*.md (Phase Files)

Include these sections in order:

1. **Context links** - Reference parent plan, dependencies, docs
2. **Overview** - Date, description, priority, implementation status, review status
3. **Key Insights**
4. **Requirements**
5. **Architecture**
6. **Related code files**
7. **Implementation Steps**
8. **Todo list**
9. **Success Criteria**
10. **Risk Assessment**
11. **Security Considerations**
12. **Next steps**

## Important Notes

**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing.
