---
description: ⚡⚡⚡ Plan and fix complex issues
---

# Fix Hard Issues (Complex Problems)

**Purpose**: Systematic approach to fix complex, difficult technical issues using comprehensive planning and analysis.

**When to Use**:

- Complex bugs requiring deep investigation
- Performance issues with unclear causes
- Integration failures across systems
- Architectural problems
- Issues requiring research and planning

---

## Workflow

### 1. Initial Analysis

- **Understand the Problem**:
  - Analyze provided screenshots/videos/logs
  - Describe the issue in detail
  - Identify expected vs actual behavior
  - Note error messages or symptoms

- **Clarify**:
  - Verify constraints and requirements
  - Understand true objectives
  - Don't assume - verify until 100% certain

### 2. Root Cause Investigation

- **Debug & Trace**:
  - Review error logs (`grep_search`)
  - Trace execution flow
  - Check file history for recent changes
  - Use `view_file` to inspect code
  - Reproduce the issue locally

- **Research (if needed)**:
  - Search documentation or web (`search_web`)
  - Check for similar existing issues
  - Document findings

- **Document Root Cause**:
  - State the root cause clearly
  - Explain why it's happening
  - Assess impact

### 3. Solution Planning

- **Create Implementation Plan**:
  - Create/Update `implementation_plan.md` artifact
  - Break fix into sequential steps
  - Identify files to modify
  - Plan test strategy
  - Define success criteria

### 4. Implementation

- **Execute Plan**:
  - Follow plan steps systematically
  - Implement changes using code tools
  - Add error handling and validation
  - Follow coding standards (YAGNI, KISS, DRY)
  - Keep files under 200 lines where possible

### 5. Validation & Testing

- **Verify Fix**:
  - Reproduce original issue to confirm fix
  - Run existing tests (`run_command`)
  - Add regression tests if applicable

- **Code Review**:
  - Check for hardcoded secrets
  - Verify error handling
  - Ensure input validation
  - Check adherence to project standards

### 6. Documentation & Reporting

- **Update Docs**:
  - Update relevant documentation
  - Update `docs/project-changelog.md`
  - Update task Artifacts

- **Final Report**:
  - Summary of issue and root cause
  - Solution implemented
  - Files changed
  - verification steps
  - Unresolved questions (if any)
