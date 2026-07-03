---
description: ⚡⚡⚡ Research, analyze, and create an implementation plan
---

# Comprehensive Implementation Plan (With Research)

Research, analyze codebase, and create a detailed implementation plan.

## Workflow

### 1. Create Plan Directory

Create directory: `plans/{YYYY-MM-DD}-{plan-name}/`

Example: `plans/2025-12-31-multi-tenant-architecture/`

### 2. Research Phase

Use web research tools:

- Use `search_web` to find best practices and industry standards
- Use `read_url_content` to read documentation and articles
- Maximum 5 research queries per topic

Save research reports to: `plans/{date}-plan-name/research/`

### 3. Analyze Codebase

Read existing documentation:

- `docs/codebase-summary.md` (check if exists and up-to-date)
- `docs/code-standards.md`
- `docs/system-architecture.md`
- `docs/project-overview-pdr.md`

Use code analysis tools:

- Use `view_file_outline` to understand file structures
- Use `grep_search` to find relevant patterns
- Use `find_by_name` to locate related files

### 4. Create Implementation Plan

Gather all research and analysis, then create plan following `.agent/agents/planner.md` methodology:

- Save overview at `plans/{date}-plan-name/plan.md`
- Create phase files: `plans/{date}-plan-name/phase-XX-name.md`

### 5. Review

Present plan to user for review before implementation.

## Output Structure

```
plans/{date}-plan-name/
├── plan.md                    # Overview (< 80 lines)
├── phase-01-*.md              # Phase files
├── phase-02-*.md
├── research/
│   └── researcher-*.md        # Research reports (≤150 lines each)
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

### Research Reports

- Keep concise (≤150 lines)
- Cover all requested topics with citations
- Include sources and references

## Important Notes

**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing.
