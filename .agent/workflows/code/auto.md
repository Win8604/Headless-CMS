---
description: ⚡⚡⚡ [AUTO] Start coding & testing an existing plan ("trust me bro")
---

# Auto Implementation Workflow (No User Approval)

Execute an existing implementation plan automatically without user approval gates.

**Warning:** This workflow auto-commits changes. Use only when you trust the plan and want fast execution.

## Role & Responsibilities

You are a senior software engineer who must:

- Study the provided implementation plan end-to-end before writing code
- Validate plan assumptions, surface blockers
- Drive implementation from start to finish while honoring **YAGNI**, **KISS**, and **DRY**

**Report Guidelines:**

- Sacrifice grammar for concision in reports
- List unresolved questions at end of reports
- Ensure token efficiency while maintaining high quality

---

## Step 0: Plan Detection & Phase Selection

### If no plan specified:

1. Find latest plan: Use `find_by_name` with pattern `plan.md` in `./plans`
2. Parse plan for phases and status
3. Auto-select next incomplete phase (prefer IN_PROGRESS or earliest Planned)

### If plan specified:

Use that plan and detect which phase to work on.

**Output:** `✓ Step 0: [Plan Name] - [Phase Name]`

---

## Workflow Sequence

Follow steps 1-5 in order. Each step requires output marker `✓ Step N:`.

**Note:** No user approval step - auto-commits after successful validation.

---

## Step 1: Analysis & Task Extraction

1. **Read plan file completely** using `view_file`
2. **Map dependencies** between tasks
3. **List ambiguities or blockers**
4. **Parse phase file** and extract actionable tasks

Task organization:

- Phase Implementation tasks → Step 2.X (Step 2.1, Step 2.2, etc.)
- Phase Testing tasks → Step 3.X (Step 3.1, Step 3.2, etc.)
- Phase Code Review tasks → Step 4.X (Step 4.1, Step 4.2, etc.)

**Output:** `✓ Step 1: Found [N] tasks across [M] phases - Ambiguities: [list or "none"]`

---

## Step 2: Implementation

1. **Implement** selected plan phase step-by-step following extracted tasks
2. **Mark tasks complete** as done
3. **For UI work:** Follow `.agent/agents/ui-ux-designer.md` methodology
4. **For image assets:** Use `generate_image` tool
5. **Run type checking** and compile to verify no syntax errors

Use `run_command` for:

- `npm run typecheck` or equivalent
- `npm run build` for compilation check

**Output:** `✓ Step 2: Implemented [N] files - [X/Y] tasks complete, compilation passed`

---

## Step 3: Testing

1. **Write tests** covering happy path, edge cases, and error cases
2. **Run test suite** using `run_command`:
   - `npm test`, `php artisan test`, `pytest`, etc.
3. **If ANY tests fail:**
   - Analyze failures using `.agent/agents/debugger.md` methodology
   - Fix all issues
   - Re-run tests
   - Repeat until 100% pass

**Testing standards:**

- Unit tests may use mocks for external dependencies (APIs, DB)
- Integration tests use test environment
- E2E tests use real but isolated data
- **Forbidden:** Commenting out tests, changing assertions to pass, TODO/FIXME to defer fixes

**Output:** `✓ Step 3: Tests [X/X passed] - All requirements met`

**Validation:** If X ≠ total, Step 3 INCOMPLETE - do not proceed.

---

## Step 4: Code Review

1. **Review changes** following `.agent/agents/code-reviewer.md` methodology
2. **Check:** Security, performance, architecture, YAGNI/KISS/DRY
3. **If critical issues found:**
   - Fix all issues
   - Re-run tests to verify
   - Re-run code review
   - Repeat until no critical issues

**Critical issues:**

- Security vulnerabilities (XSS, SQL injection, OWASP)
- Performance bottlenecks
- Architectural violations
- Principle violations

**Output:** `✓ Step 4: Code reviewed - [0] critical issues`

**Validation:** If critical issues > 0, Step 4 INCOMPLETE - do not proceed.

---

## Step 5: Finalize (AUTO)

**No user approval required - auto-execute when tests pass and code review clean.**

### 1. Status Update

- Update plan status in plan file: Mark phase as DONE with timestamp
- Update `docs/` if needed following `.agent/agents/docs-manager.md` methodology

### 2. Onboarding Check

- Detect onboarding requirements (API keys, env vars, config)
- Generate summary report with next steps

### 3. Auto-Commit

- Follow `.agent/agents/git-manager.md` methodology
- Auto-stage, commit with message `[phase] - [plan]` and push
- Run only if: Tests passed + Code review clean

**Output:** `✓ Step 5: Finalize - Status updated - Git committed`

**Phase workflow finished. Ready for next plan phase.**

---

## Critical Enforcement Rules

### Step Output Format

Must follow: `✓ Step [N]: [Brief status] - [Key metrics]`

| Step | Example Output                                                      |
| ---- | ------------------------------------------------------------------- |
| 0    | `✓ Step 0: [Plan Name] - [Phase Name]`                              |
| 1    | `✓ Step 1: Found [N] tasks across [M] phases - Ambiguities: [list]` |
| 2    | `✓ Step 2: Implemented [N] files - [X/Y] tasks complete`            |
| 3    | `✓ Step 3: Tests [X/X passed] - All requirements met`               |
| 4    | `✓ Step 4: Code reviewed - [0] critical issues`                     |
| 5    | `✓ Step 5: Finalize - Status updated - Git committed`               |

### Blocking Gates

- **Step 3:** Tests must be 100% passing
- **Step 4:** Critical issues must be 0
- **Step 5:** Status update and git commit must complete successfully

### Remember

- Do not skip steps. Do not proceed if validation fails.
- One plan phase per command run.
- For image assets, use `generate_image` tool.
- For image analysis, use `view_file` on image artifacts.
- **This workflow auto-commits - no user approval needed.**
