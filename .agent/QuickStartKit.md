# ⚡ Antigravity QuickStart Kit

Use this kit to rapidly bootstrap powerful AI-driven workflows in any new project.

---

## 📂 Core Structure

To reuse this setup, simply copy the `.agent` folder to your new project root:

```
.agent/
├── agents/            # Specialized Persona Definitions (e.g. Planner, Researcher)
├── workflows/         # Automatable workflows (e.g. Bootstrap, Code, Fix)
├── best-practices/    # Technical Standards (Frontend, Backend, DB, Etc.)
├── rules/             # Global Governance Rules
└── antigravity_tools.md # Tool Documentation
```

---

## 🏗️ Framework Architecture Overview

The `.agent` framework operates as an **AI Orchestration System** with three core layers:

### Layer 1: Orchestration Rules (`.agent/rules/`)

**Core governance documents** that define how agents collaborate:

| File                          | Purpose                   | Key Responsibilities                                                        |
| ----------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `primary-workflow.md`         | Main development workflow | 1. Planning → 2. Testing → 3. Code Review → 4. Integration → 5. Debugging   |
| `development-rules.md`        | Code quality standards    | YAGNI/KISS/DRY principles, file naming (kebab-case), file size (<200 lines) |
| `orchestration-protocol.md`   | Agent coordination        | Sequential chaining vs Parallel execution strategies                        |
| `documentation-management.md` | Docs lifecycle            | Plan structure in `./plans/`, auto-update triggers                          |

### Layer 2: Specialized Agents (`.agent/agents/`)

**15 role-based agents** with distinct expertise:

```
Planning & Analysis:
├── planner.md           → Research + create implementation plans
├── researcher.md        → Technical research via web search
├── scout.md             → Codebase analysis
└── brainstormer.md      → Feature ideation

Development:
├── fullstack-developer.md  → End-to-end implementation
├── ui-ux-designer.md       → UI/UX design and components
└── database-admin.md       → Database migrations and schema

Quality Assurance:
├── tester.md            → Run test suites
├── debugger.md          → Root cause analysis
└── code-reviewer.md     → Security, performance, architecture review

Project Management:
├── project-manager.md   → Progress tracking, roadmap updates
├── docs-manager.md      → Documentation maintenance
├── git-manager.md       → Git operations (commit, push, PR)
└── journal-writer.md    → Decision documentation
```

### Layer 3: Executable Workflows (`.agent/workflows/`)

**33 automated workflows** organized by category:

```
.agent/workflows/
├── plan/               # Planning workflows (6 files)
│   ├── plan-fast.md       → Quick analysis, no research
│   ├── plan-hard.md       → Deep research + comprehensive plan
│   ├── plan-parallel.md   → Multi-phase parallel execution
│   ├── plan-two.md        → Compare 2 approaches
│   ├── plan-ci.md         → GitHub Actions fix planning
│   └── plan-cro.md        → Conversion rate optimization
│
├── code/               # Implementation workflows (2 files)
│   ├── auto.md            → Auto-run without approval gates
│   └── no-test.md         → Fast iteration (skip testing)
│
├── fix/                # Debugging workflows (5 files)
│   ├── fix-fast.md        → Quick fixes (<30 min)
│   ├── fix-hard.md        → Complex issues requiring planning
│   ├── fix-test.md        → Test failures (tester → debugger loop)
│   ├── fix-ui.md          → UI/UX specific fixes
│   └── fix-logs.md        → Log analysis and debugging
│
├── docs/               # Documentation workflows (3 files)
│   ├── docs-init.md       → Full documentation initialization
│   ├── docs-update.md     → Update after code changes
│   └── docs-summarize.md  → Quick summary updates
│
├── git/                # Git workflows (4 files)
│   ├── git-cm.md          → Conventional commit
│   ├── git-cp.md          → Commit and push
│   ├── git-merge.md       → Branch merging
│   └── git-pr.md          → Pull request creation
│
└── [root workflows]    # High-level orchestration (13 files)
    ├── bootstrap.md       → New project from scratch
    ├── code.md            → Execute plan with testing
    ├── plan.md            → Intelligent plan router
    ├── fix.md             → Intelligent fix router
    ├── test.md            → Run test suite
    ├── debug.md           → Debug without auto-fix
    ├── review-codebase.md → Codebase health scan
    └── ...
```

---

## 🔄 Workflow Input/Output Patterns

Each workflow follows a consistent I/O contract:

### Planning Workflows

#### `/plan-hard` - Research-Based Planning

**Input:**

```bash
/plan-hard "Implement user authentication with OAuth2"
```

**Process:**

1. Create plan directory: `plans/250105-1410-oauth-authentication/`
2. Web research (5 queries max per topic) → `research/researcher-*.md`
3. Analyze codebase (`docs/`, `grep_search`, `view_file_outline`)
4. Generate plan files

**Output:**

```
plans/250105-1410-oauth-authentication/
├── plan.md                          # Overview (<80 lines)
│   ├── Status: Draft/In Progress/Complete
│   ├── Phases list with progress %
│   └── Links to phase files
├── phase-01-setup-environment.md   # Detailed phase
│   ├── Context links
│   ├── Overview (date, priority, status)
│   ├── Requirements
│   ├── Implementation steps
│   ├── Todo checklist
│   └── Success criteria
├── phase-02-implement-oauth.md
├── phase-03-write-tests.md
└── research/
    ├── researcher-oauth-providers.md   # ≤150 lines
    └── researcher-security-best-practices.md
```

#### `/plan-fast` - Quick Analysis

**Input:**

```bash
/plan-fast "Fix pagination bug in candidates table"
```

**Process:**

1. Skip web research
2. Analyze codebase only
3. Create plan from existing patterns

**Output:**

```
plans/250105-1410-pagination-fix/
├── plan.md                    # Simplified overview
├── phase-01-fix-pagination.md
└── reports/
    └── analysis-pagination-component.md
```

### Implementation Workflows

#### `/code` - Execute Implementation Plan

**Input:**

```bash
/code "./plans/250105-1410-oauth-authentication/phase-01-setup-environment.md"
```

**Process Stages:**

```
Step 0: Plan Detection          → Detect plan + phase
Step 1: Analysis                → Extract tasks to TodoWrite
Step 2: Implementation          → Code changes + compile check
Step 3: Testing                 → Delegate to tester (100% pass required)
Step 4: Code Review             → Delegate to code-reviewer (0 critical issues)
Step 5: User Approval [GATE]    → Wait for user confirmation
Step 6: Finalization            → Update docs + auto-commit
```

**Output:**

```
✓ Step 0: [OAuth Authentication] - [Phase 01: Setup Environment]
✓ Step 1: Found 8 tasks across 1 phase - Ambiguities: none
✓ Step 2: Implemented 5 files - [8/8] tasks complete, compilation passed
✓ Step 3: Tests [24/24 passed] - All requirements met
✓ Step 4: Code reviewed - [0] critical issues
⏸ Step 5: WAITING for user approval
[User approves]
✓ Step 5: User approved - Ready to complete
✓ Step 6: Finalize - Status updated - Git committed

Modified Files:
- backend/routes/api.php
- backend/app/Http/Controllers/AuthController.php
- backend/config/services.php
- client/src/lib/auth.ts
- client/src/pages/Login.tsx

Commit: feat(auth): implement OAuth2 authentication
```

### Debugging Workflows

#### `/fix-fast` - Quick Fix

**Input:**

```bash
/fix-fast "Candidates table not loading - API returns 500"
```

**Process:**

1. Analyze issue (logs, screenshots)
2. Debug & find root cause (`grep_search`, `view_file`)
3. Implement minimal fix
4. Test fix (`run_command`)
5. Report results

**Output:**

```
Issue: CandidateController missing eager loading
Root Cause: N+1 query on relationships (job_posting, created_by)

Fix Applied:
- File: backend/app/Http/Controllers/Api/CandidateController.php
- Change: Added ->with(['jobPosting', 'createdBy']) to query

Test Results: ✅ All tests pass (18/18)
Verification: API now returns 200, response time 45ms (was 2.3s)

Next Steps: Consider adding database indexes on foreign keys
```

#### `/fix-test` - Test Failure Loop

**Input:**

```bash
/fix-test "3 authentication tests failing after OAuth merge"
```

**Process:**

```
1. tester agent      → Compile & run tests → Report failures
2. debugger agent    → Analyze root cause → Generate report
3. planner agent     → Create fix plan → phase-01-fix-tests.md
4. Main agent        → Implement fixes
5. tester agent      → Re-run tests
6. [Repeat 2-5 until 100% pass]
7. code-reviewer     → Quick review
8. Report to user
```

**Output:**

```
Test Results After Fix:
✅ AuthController::login_with_oauth     PASS
✅ AuthController::callback_handles_state   PASS
✅ AuthController::refresh_token_valid   PASS

Changes Made:
- Fixed OAuth state validation in AuthController
- Updated token refresh logic in middleware
- Added missing test fixtures for OAuth providers

All Tests: 32/32 passed
Review: 0 critical issues, 1 suggestion (extract OAuth config to service)
```

### Documentation Workflows

#### `/docs-update` - Post-Implementation Sync

**Input:**

```bash
/docs-update "OAuth authentication feature completed"
```

**Process:**

1. `docs-manager` agent reads implementation reports
2. Updates relevant docs in `./docs/`
3. `project-manager` agent updates roadmap/changelog

**Output:**

```
Documentation Updated:

Modified Files:
✓ docs/system-architecture.md
  - Added OAuth authentication flow diagram
  - Updated security section with token management

✓ docs/code-standards.md
  - Added OAuth service pattern example

✓ docs/project-roadmap.md
  - Marked "OAuth Authentication" as Complete (100%)
  - Updated changelog with v1.1.0 features

✓ README.md
  - Added OAuth setup instructions
  - Updated environment variables section
```

### Git Workflows

#### `/git-cp` - Commit and Push

**Input:**

```bash
/git-cp "OAuth authentication implementation"
```

**Process:**

1. Stage all changes (`git add -A`)
2. Generate conventional commit message
3. Commit (`git commit`)
4. Push to current branch (`git push`)

**Output:**

```
Staged: 8 files changed, 423 insertions(+), 89 deletions(-)

Commit Message:
feat(auth): implement OAuth2 authentication

- Add OAuth providers (Google, GitHub, Microsoft)
- Implement callback handling and token management
- Add user profile sync from OAuth providers
- Update authentication middleware for OAuth tokens

Refs: #123

✅ Committed: a3f8c2d
✅ Pushed to: origin/feature/oauth-auth

Next Steps:
- Create pull request with /git-pr
- Request code review from team
```

---

## 🤝 Agent Communication Protocol

Agents communicate via **delegation pattern** with standardized reporting:

### Delegation Syntax

```markdown
Delegate to `.agent/agents/{agent-name}.md` agent:

- Task: {specific task description}
- Context: {relevant background}
- Expected Output: {what to return}
```

### Example Agent Chain

**Main Agent → Planner Agent:**

```
Input: "Create plan for multi-tenant architecture"
Delegation: `.agent/agents/planner.md`
Output: Plan directory with phase files
```

**Planner Agent → Researcher Agents (Parallel):**

```
Planner spawns 3 researchers:
- researcher-1: "Multi-tenant database patterns"
- researcher-2: "Tenant isolation strategies"
- researcher-3: "Laravel multi-tenancy packages"

Each returns: research/researcher-{topic}.md (≤150 lines)
```

**Main Agent → Developer Agent:**

```
Input: "Execute phase-01-database-setup.md"
Delegation: `.agent/agents/fullstack-developer.md`
Output: Code changes + compile status
```

**Developer Agent → Tester Agent:**

```
After code changes:
Delegation: `.agent/agents/tester.md`
Output: Test results (X/Y passed)
```

**Tester Agent → Debugger Agent (if failures):**

```
Input: "5 tests failing in TenantMiddleware"
Delegation: `.agent/agents/debugger.md`
Output: Root cause analysis + fix recommendations
```

### Report Format Standard

All agents follow this reporting structure:

```markdown
# {Agent Name} Report - {Task Name}

**Date:** {YYMMDD-HHmm}
**Status:** Complete | In Progress | Blocked

## Summary

[2-3 sentence overview]

## Key Findings

- Finding 1
- Finding 2

## Deliverables

✅ Item 1: [link/path]
✅ Item 2: [link/path]

## Metrics

- Files analyzed: X
- Time spent: Y minutes
- Issues found: Z

## Next Steps

1. Step 1
2. Step 2

## Unresolved Questions

- Question 1?
- Question 2?
```

---

## 🚀 1. Setup

### Step 1: Clone the Kit

Copy the `.agent` directory to your project root.

### Step 2: Configure Rules

Edit `.agent/rules/development-rules.md` to match your specific tech stack.

- **Example:** Change "Laravel/React" to "Node/Vue" if needed.

### Step 3: Git Configuration

Add `.agent/` to your `.gitignore` file to keep it local:

```bash
echo ".agent/" >> .gitignore
```

_Note: The `.agent` folder contains your local AI configuration and should generally not be committed to the shared repository unless your team shares the same AI workflows._

---

---

## 🚦 2. Development Flows with Examples

### Greenfield Projects (New Codebase)

**Scenario:** Building a new Task Management SaaS application

#### **Phase 1: Project Bootstrap**

**Input:**

```bash
/bootstrap "Build a task management SaaS with team collaboration, real-time updates, and Kanban boards. Tech stack: Node.js + PostgreSQL + React + TypeScript"
```

**Expected Output:**

```
✅ Git initialized
✅ Tech stack validated: Node.js 20 + PostgreSQL 15 + React 18 + TypeScript 5
✅ Created plan: plans/250105-1410-task-management-bootstrap/
   ├── plan.md (Status: Draft)
   ├── phase-01-project-setup.md
   ├── phase-02-database-schema.md
   ├── phase-03-authentication.md
   ├── phase-04-task-crud.md
   └── phase-05-real-time-features.md

✅ Initial file structure created
✅ package.json + tsconfig.json generated

Next Steps:
1. Review plan.md
2. Start with: /code "phase-01-project-setup.md"
```

#### **Phase 2: Core Development Loop**

**Step 2.1: Plan Feature**

```bash
/plan-hard "Implement user authentication with JWT and refresh tokens"
```

**Output:**

```
Created: plans/250105-1415-jwt-authentication/
├── plan.md
├── phase-01-setup-jwt.md
├── phase-02-implement-auth-endpoints.md
├── phase-03-implement-middleware.md
└── research/
    ├── researcher-jwt-best-practices.md
    ├── researcher-refresh-token-rotation.md
    └── researcher-token-security.md

Review plan? [y/n]
```

**Step 2.2: Execute Implementation**

```bash
/code "./plans/250105-1415-jwt-authentication/phase-01-setup-jwt.md"
```

**Step-by-Step Output:**

```
✓ Step 0: [JWT Authentication] - [Phase 01: Setup JWT]
✓ Step 1: Found 6 tasks - Ambiguities: none

  TodoWrite Tasks:
  - Step 2.1: Install jsonwebtoken and bcrypt packages
  - Step 2.2: Create JWT utility functions
  - Step 2.3: Add environment variables for secrets
  - Step 2.4: Create token generation service
  - Step 2.5: Create token verification middleware
  - Step 2.6: Type definitions for JWT payload

✓ Step 2: Implemented 7 files - [6/6] tasks complete, compilation passed

  Modified:
  - backend/package.json
  - backend/src/utils/jwt.ts (NEW)
  - backend/src/middleware/auth.ts (NEW)
  - backend/src/types/auth.d.ts (NEW)
  - backend/.env.example
  - backend/src/config/jwt.config.ts (NEW)

✓ Step 3: Tests [12/12 passed] - All requirements met
✓ Step 4: Code reviewed - [0] critical issues, [2] suggestions

⏸ Step 5: WAITING for user approval

[User types: y or approve]

✓ Step 5: User approved - Ready to complete
✓ Step 6: Finalize complete
  - Docs updated: docs/system-architecture.md
  - Roadmap updated: Authentication (Phase 1) - 100%
  - Committed: feat(auth): implement JWT authentication setup
  - Pushed: origin/feature/jwt-auth

Next: /code "phase-02-implement-auth-endpoints.md"
```

**Step 2.3: Fix Failing Tests**

```bash
/fix-test "Token expiration test failing - tokens not expiring correctly"
```

**Output:**

```
🔍 Tester Report:
  Failed: 1/13 tests
  - TokenService::should_expire_after_15_minutes FAILED

🐛 Debugger Analysis:
  Root Cause: JWT exp claim using milliseconds instead of seconds
  Location: backend/src/utils/jwt.ts:28

📝 Planner Fix Plan:
  - Convert Date.now() to seconds (divide by 1000)
  - Add test for correct expiration format

✅ Fix Applied:
  - File: backend/src/utils/jwt.ts
  - Change: exp: Math.floor(Date.now() / 1000) + (15 * 60)

✅ Re-test: [13/13 passed]
✅ Review: 0 critical issues

All tests passing! Ready to merge.
```

**Step 2.4: Design UI**

```bash
/ui-ux-pro-max "Design login page with modern glassmorphism style"
```

**Output:**

```
🎨 UI Design Generated:
  - components/auth/LoginPage.tsx (NEW)
  - components/ui/GlassCard.tsx (NEW)
  - styles/auth.css (NEW)

Features:
  ✅ Glassmorphism card with backdrop blur
  ✅ Gradient background animation
  ✅ Social login buttons (Google, GitHub)
  ✅ Form validation with Zod
  ✅ Loading states with skeleton
  ✅ Error handling with toast notifications
  ✅ Responsive (mobile-first)

Preview: http://localhost:3000/login
Color Palette: Indigo gradient (#6366f1 → #8b5cf6)

Next: Review UI, then /git-cp "Add login page UI"
```

#### **Phase 3: Review & Finish**

```bash
/review-codebase
```

**Output:**

```
📊 Codebase Health Report:

File Stats:
  - Total files: 87
  - TypeScript: 64, CSS: 8, Config: 15
  - Average file size: 142 lines
  - Files >200 lines: 3 (need refactoring)

Code Quality:
  ✅ All files follow kebab-case naming
  ✅ YAGNI/KISS/DRY principles observed
  ⚠️  3 files need splitting (>200 lines)
  ✅ No critical security issues

Architecture:
  ✅ Clear separation: routes → controllers → services → models
  ✅ Type coverage: 98%
  ✅ Test coverage: 76% (target: 80%)

Suggestions:
  1. Split UserService.ts into smaller services
  2. Add integration tests for auth flow
  3. Document API endpoints in OpenAPI/Swagger

Status: READY FOR PRODUCTION ✅
```

```bash
/docs-update "Authentication feature complete"
```

**Output:**

```
📚 Documentation Updated:

✓ docs/system-architecture.md
  - Added JWT authentication flow diagram
  - Updated security section

✓ docs/code-standards.md
  - Added auth service pattern examples

✓ docs/project-roadmap.md
  - Authentication: 100% complete
  - Added to changelog: v0.2.0

✓ README.md
  - Setup instructions for JWT secrets
  - Environment variables documented

All docs synced with implementation ✅
```

---

### Brownfield Projects (Existing Codebase)

**Scenario:** Onboarding to a legacy PHP monolith, need to add API layer

#### **Phase 1: Onboarding & Analysis**

**Step 1.1: Initialize Documentation**

```bash
/docs-init
```

**Output:**

```
📚 Analyzing codebase...

Discovered:
  - Framework: Laravel 8 (legacy)
  - Database: MySQL with 47 tables
  - Frontend: jQuery + Bootstrap 3
  - Code size: 1.2M tokens across 342 PHP files

Created Documentation:
  ✅ docs/project-overview-pdr.md
     - Business context: E-commerce platform
     - 10 core modules identified

  ✅ docs/codebase-summary.md
     - File structure analysis
     - Dependency tree
     - Tech debt areas (12 identified)

  ✅ docs/system-architecture.md
     - Current architecture: MVC monolith
     - Database schema documented
     - Integration points mapped

  ✅ docs/code-standards.md
     - Existing patterns extracted
     - Naming conventions documented

  ✅ docs/tech-debt.md (NEW)
     - 12 high-priority items
     - 28 medium-priority items

Estimated time to full context: 3-4 hours exploring codebase
Next: /review-codebase for deeper health check
```

**Step 1.2: Health Check**

```bash
/review-codebase
```

**Output:**

```
⚠️  Codebase Health: NEEDS ATTENTION

Code Quality Issues:
  🔴 Critical: 8 security vulnerabilities
     - SQL injection risk in ProductController.php:124
     - XSS vulnerability in review display
     - Outdated dependencies (Laravel 8 → 11)

  🟡 High Priority: 23 issues
     - N+1 queries in 12 locations
     - No test coverage (0%)
     - Mixed coding styles
     - Hardcoded credentials in 4 files

  🟢 Medium: 67 issues
     - Large files (15 files >500 lines)
     - Duplicated code in controllers
     - Missing type hints

Architecture:
  - Tight coupling between layers
  - Business logic in controllers
  - No service layer
  - Lack of API endpoints (only web routes)

Recommendations (Prioritized):
  1. [URGENT] Fix security vulnerabilities
  2. [HIGH] Add API layer without breaking web UI
  3. [HIGH] Implement authentication for API
  4. [MEDIUM] Refactor to service layer pattern
  5. [MEDIUM] Add test coverage

Next Steps:
  1. /plan-hard "Fix critical security vulnerabilities"
  2. /plan-hard "Add RESTful API layer for mobile app"
```

#### **Phase 2: Feature Development**

**Step 2.1: Understand Existing Patterns**

```bash
# Use Antigravity tools directly
grep_search "ProductController" --path="app/Http/Controllers"
view_file_outline "app/Http/Controllers/ProductController.php"
```

**Step 2.2: Plan New Feature**

```bash
/plan-hard "Add RESTful API layer for products without breaking existing web UI"
```

**Output:**

```
Created: plans/250105-1420-api-layer-products/
├── plan.md
├── phase-01-api-routes-setup.md
├── phase-02-api-controllers.md
├── phase-03-api-resources.md
├── phase-04-authentication.md
└── research/
    ├── researcher-laravel-api-best-practices.md
    ├── researcher-versioning-strategies.md
    └── researcher-backward-compatibility.md

Key Insights:
  - Use /api/v1 prefix to avoid conflicts
  - Keep existing controllers untouched
  - Create ApiProductController (separate from ProductController)
  - Use API Resources for response formatting
  - Laravel Sanctum for API auth

Risk Analysis:
  🟢 LOW: No changes to web routes = zero breaking risk
  🟡 MEDIUM: Need careful testing of shared models

Estimated Effort: 2-3 days
Ready to implement? [y/n]
```

**Step 2.3: Execute Plan**

```bash
/code "./plans/250105-1420-api-layer-products/phase-01-api-routes-setup.md"
```

**Output:**

```
✓ Step 2: Implemented 5 files - [7/7] tasks complete

  New Files:
  - routes/api.php (modified - added /api/v1/products)
  - app/Http/Controllers/Api/ProductController.php (NEW)
  - app/Http/Resources/ProductResource.php (NEW)
  - app/Http/Resources/ProductCollection.php (NEW)
  - tests/Feature/Api/ProductApiTest.php (NEW)

  No changes to:
  - routes/web.php (untouched ✅)
  - app/Http/Controllers/ProductController.php (untouched ✅)

✓ Step 3: Tests [15/15 passed]
  - API endpoints return correct JSON format
  - Web UI still functional (regression tests passed)
  - No breaking changes detected

Backward compatibility: ✅ VERIFIED
```

#### **Phase 3: Bug Fixing & Maintenance**

**Step 3.1: Analyze Production Logs**

```bash
/fix-logs "Analyze error logs from storage/logs/laravel-2025-01-05.log"
```

**Output:**

```
📊 Log Analysis Report:

Found 127 errors in last 24 hours:

Top Issues:
  🔴 58 errors: Class 'Product' not found
     Pattern: Namespace issue in ProductController
     First occurrence: 02:34:12
     Last occurrence: 14:08:45

  🟡 34 errors: SQLSTATE[HY000]: Too many connections
     Pattern: Connection pool exhaustion during peak hours
     Times: 08:00-10:00, 18:00-20:00

  🟡 23 errors: Undefined index: user_id
     Pattern: Missing auth check in OrderController

  🟢 12 errors: Route [product.show] not defined
     Pattern: Old links in email templates

Root Causes Identified:
  1. Missing "use App\Models\Product;" in 3 controllers
  2. DB connection pool too small (max_connections=50)
  3. Missing auth middleware on 2 routes
  4. Stale cache of route names

Generated Fix Plan: plans/250105-1421-production-error-fixes/
Ready to implement? [y/n]
```

**Step 3.2: Quick Fix**

```bash
/fix-fast "Fix 'Class Product not found' errors in ProductController"
```

**Output:**

```
🔍 Analysis: Missing namespace import

Fix Applied:
  Files Modified:
  - app/Http/Controllers/ProductController.php
  - app/Http/Controllers/Admin/ProductController.php
  - app/Http/Controllers/Api/V2/ProductController.php

  Changes:
  + use App\Models\Product;

✅ Compilation: Success
✅ Tests: [42/42 passed]
✅ Deployed to staging

Verification in production logs:
  - Error count dropped: 58 → 0 (last hour)

Ready to deploy to production? [y/n]
```

**Step 3.3: Refactor for Clarity**

```bash
/refine "Refactor ProductController - move business logic to service layer"
```

**Output:**

```
📝 Refactoring Plan Created:

  Extract to Services:
  ✅ ProductService (CRUD operations)
  ✅ ProductPriceCalculator (pricing logic)
  ✅ ProductInventoryManager (stock management)

  Before: ProductController (487 lines)
  After:  ProductController (98 lines)
          + 3 service classes

  Benefits:
  - Single Responsibility Principle ✅
  - Easier to test (mock services)
  - Reusable across API and Web controllers

  Backward Compatibility: ✅ No breaking changes

Start refactoring? This will auto-commit after tests pass. [y/n]
```

---

## 📊 Workflow Decision Matrix

Choose the right workflow based on your scenario:

| Scenario                  | Recommended Workflow           | Expected Duration | Output                               |
| ------------------------- | ------------------------------ | ----------------- | ------------------------------------ |
| **New feature (complex)** | `/plan-hard` → `/code`         | 4-8 hours         | Plan + Implementation + Tests + Docs |
| **New feature (simple)**  | `/plan-fast` → `/code`         | 1-3 hours         | Plan + Implementation + Tests        |
| **Bug fix (quick)**       | `/fix-fast`                    | 15-30 min         | Fix + Tests                          |
| **Bug fix (complex)**     | `/fix-hard`                    | 2-4 hours         | Analysis + Plan + Fix + Tests        |
| **Test failures**         | `/fix-test`                    | 30 min - 2 hours  | Fixes until 100% pass                |
| **UI issues**             | `/fix-ui`                      | 30 min - 2 hours  | UI fixes + responsive checks         |
| **Log analysis**          | `/fix-logs` → `/fix-fast`      | 30 min - 1 hour   | Root cause + fixes                   |
| **New project**           | `/bootstrap`                   | 1-2 hours         | Full project setup + initial docs    |
| **Documentation**         | `/docs-init` or `/docs-update` | 20-45 min         | Complete docs                        |
| **Code review**           | `/review-codebase`             | 15-30 min         | Health report                        |
| **Git operations**        | `/git-cp` or `/git-pr`         | 2-5 min           | Commit + push                        |

---
