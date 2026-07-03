---
description: ⚡⚡⚡ Create detailed plan with parallel-executable phases
---

# Parallel Execution Implementation Plan

Create a detailed implementation plan with phases that can be executed independently in parallel.

## Workflow

### 1. Create Plan Directory

Create directory: `plans/{YYYY-MM-DD}-{plan-name}/`

Example: `plans/2025-12-31-multi-tenant-architecture/`

### 2. Research Phase

Use web research tools:

- Use `search_web` to find best practices
- Use `read_url_content` to read documentation
- Maximum 5 research queries per topic

Save research reports to: `plans/{date}-plan-name/research/`

### 3. Analyze Codebase

Read existing documentation:

- `docs/codebase-summary.md`
- `docs/code-standards.md`
- `docs/system-architecture.md`
- `docs/project-overview-pdr.md`

Use code analysis tools:

- Use `view_file_outline` to understand file structures
- Use `grep_search` to find relevant patterns
- Use `find_by_name` to locate related files

### 4. Create Parallel-Optimized Plan

Create plan following `.agent/agents/planner.md` methodology with parallel execution focus.

### 5. Review

Present plan to user for review before implementation.

## Special Requirements for Parallel Execution

**CRITICAL:** Create phases that:

1. **Can be executed independently** - Each phase self-contained with no runtime dependencies
2. **Have clear boundaries** - No file overlap between phases (each file modified in ONE phase only)
3. **Separate concerns logically** - Group by architectural layer, feature domain, or technology stack
4. **Minimize coupling** - Phases communicate through well-defined interfaces only
5. **Include dependency matrix** - Clearly document sequential vs parallel phases

### Parallelization Strategy

- Group frontend/backend/database work into separate phases when possible
- Separate infrastructure setup from application logic
- Isolate different feature domains (e.g., auth vs profile vs payments)
- Split by file type/directory (e.g., components vs services vs models)
- Create independent test phases per module

### Phase Organization Example

```
Phase 01: Database Schema (can run independently)
Phase 02: Backend API Layer (can run independently)
Phase 03: Frontend Components (can run independently)
Phase 04: Integration Tests (depends on 01, 02, 03)
```

## Output Structure

```
plans/{date}-plan-name/
├── plan.md                    # Overview with dependency graph
├── phase-01-*.md              # Phase files
├── phase-02-*.md
├── research/
│   └── researcher-*.md        # Research reports (≤150 lines each)
└── reports/
    └── analysis-*.md          # Analysis reports
```

## Plan File Specification

### plan.md (Overview)

Must include:

- Overview under 80 lines
- **Dependency graph** showing which phases can run in parallel
- **Execution strategy** (e.g., "Phases 1-3 parallel, then Phase 4")
- **File ownership matrix** (which phase owns which files)
- Links to all phase files

### phase-XX-\*.md (Phase Files)

Include these sections in order:

1. **Context links** - Reference parent plan, dependencies, docs
2. **Parallelization Info** - Which phases can run concurrently, which must wait
3. **Overview** - Date, description, priority, implementation status, review status
4. **Key Insights**
5. **Requirements**
6. **Architecture**
7. **Related code files** - MUST be exclusive to this phase (no overlap)
8. **File Ownership** - Explicit list of files this phase owns/modifies
9. **Implementation Steps**
10. **Todo list**
11. **Success Criteria**
12. **Conflict Prevention** - How this phase avoids conflicts with parallel phases
13. **Risk Assessment**
14. **Security Considerations**
15. **Next steps**

## Important Notes

**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing.
**IMPORTANT:** Each phase MUST have exclusive file ownership - no file can be modified by multiple phases.
