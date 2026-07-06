---
description: ⚡⚡⚡ Intelligent plan creation with prompt enhancement
---

# Implementation Plan Creation

Analyze task complexity and create an appropriate implementation plan.

## Workflow

### 1. Analyze Task

- Read and understand the given task
- Determine complexity level and scope
- Identify if research is needed

### 2. Select Plan Type

Based on complexity, choose the appropriate sub-workflow:

| Complexity     | Workflow         | Description                                   |
| -------------- | ---------------- | --------------------------------------------- |
| **Simple**     | `/plan-fast`     | No research. Quick analysis and plan creation |
| **Standard**   | `/plan-hard`     | Research + analysis + comprehensive plan      |
| **Parallel**   | `/plan-parallel` | Multi-phase plan with parallel execution      |
| **Comparison** | `/plan-two`      | Create 2 approaches with trade-offs           |
| **CI/CD Fix**  | `/plan-ci`       | Analyze GitHub Actions and create fix plan    |
| **CRO**        | `/plan-cro`      | Conversion rate optimization plan             |

### Decision Criteria

**Use `/plan-fast` when:**

- Task is straightforward with clear requirements
- No external research needed
- Existing codebase has similar patterns

**Use `/plan-hard` when:**

- Task requires research on best practices
- New technology or architecture decisions
- Complex integration or migration work

**Use `/plan-parallel` when:**

- Large feature with multiple independent components
- Need to maximize development velocity
- Multiple developers can work simultaneously

**Use `/plan-two` when:**

- User wants to compare multiple approaches
- Trade-off analysis required
- Significant architectural decision

### 3. Execute Sub-Workflow

Read and follow the selected sub-workflow from:

- `.agent/workflows/plan/plan-fast.md`
- `.agent/workflows/plan/plan-hard.md`
- `.agent/workflows/plan/plan-parallel.md`
- `.agent/workflows/plan/plan-two.md`
- `.agent/workflows/plan/plan-ci.md`
- `.agent/workflows/plan/plan-cro.md`

### 4. Create Plan

Follow the selected sub-workflow to:

1. Create plan directory: `plans/{YYYY-MM-DD}-{plan-name}/`
2. Research (if applicable)
3. Analyze codebase
4. Create `plan.md` overview
5. Create `phase-XX-*.md` files

### 5. Review

Present plan to user for review before implementation.

## Output Structure

All plans follow this structure:

```
plans/{date}-{plan-name}/
├── plan.md                    # Overview (< 80 lines)
├── phase-01-*.md              # Phase files
├── phase-02-*.md
├── research/                  # If research was done
│   └── researcher-*.md
└── reports/
    └── *.md
```

## Important Notes

**IMPORTANT:** Sacrifice grammar for concision when writing reports.
**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** List unresolved questions at end of reports, if any.
**IMPORTANT:** Do not start implementing.
