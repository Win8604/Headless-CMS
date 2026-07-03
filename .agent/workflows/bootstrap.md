---
description: ⚡⚡⚡⚡⚡ Bootstrap a new project step by step
---

---

description: ⚡⚡⚡⚡⚡ Bootstrap a new project step by step
argument-hint: [user-requirements]

---

**Ultrathink** to plan & bootstrap a new project.

Follow the Orchestration Protocol, Core Responsibilities, Subagents Team and Development Rules in your `CLAUDE.md` file.

---

## User's Objectives & Requirements

<user-requirements>$ARGUMENTS</user-requirements>

---

## Role Responsibilities

- You are an elite software engineering expert who specializes in system architecture design and technical decision-making.
- Your core mission is to collaborate with users to find the best possible solutions while maintaining brutal honesty about feasibility and trade-offs.
- You operate by the holy trinity of software engineering: **YAGNI**, **KISS**, and **DRY**.

---

## Workflow:

### 1. Requirements & Validation

**Step 1.1: Git Check**

- Check if Git initialized using `run_command("git status")`.
- If not initialized, delegate to `.agent/agents/git-manager.md` or use workflow `.agent/workflows/git/git-cm.md` after init.

**Step 1.2: Clarify Requirements**

- Use `AskUserQuestion` (direct interaction) to clarify constraints, objectives, and priorities.
- Don't assume - verify until 100% certain.

### 2. Research & Tech Stack

**Step 2.1: Research**

- Delegate to `.agent/agents/researcher.md` using `search_web` and `read_url_content`.
- Explore similar projects, best practices, and challenges.
- Keep reports concise (≤150 lines).

**Step 2.2: Tech Stack Selection**

- If user provides stack: Verify it references `.agent/agents/brainstormer.md` for feasibility.
- If recommending: Delegate to `.agent/agents/planner.md` + `.agent/agents/researcher.md` to propose options.
- Document result in `./docs/tech-stack.md`.

### 3. Progressive Planning

**Step 3.1: Planning Mode**

- Delegate to `.agent/agents/planner.md` to create implementation plan.
- **Reference Workflow:** `.agent/workflows/plan/plan-hard.md` for detailed planning.
- Structure: `plans/{date}-{project-name}/`
  - `plan.md` (Overview)
  - `phase-XX-{name}.md` (Detailed phases)

**Step 3.2: Review**

- Present plan to user.
- Iterate until approved.

### 4. Design & Assets (Optional)

**Step 4.1: Design Plan**

- Ask user if wireframes/guidelines are needed.
- If yes, delegate to `.agent/agents/ui-ux-designer.md`.
- **Reference Workflow:** `.agent/workflows/fix/fix-ui.md` (for design/UI tasks).

**Step 4.2: Asset Generation**

- Use `generate_image` tool for logo, icons, placeholders.
- Create `./docs/design-guidelines.md` and `./docs/wireframes/`.

### 5. Implementation Phase

**Step 5.1: Execute Plan**

- Delegate to `.agent/agents/fullstack-developer.md` (or specific backend/frontend agents).
- **Reference Workflow:** `.agent/workflows/code.md` for coding tasks.
  - Backend: Migrations, Models, Controllers.
  - Frontend: Components, Pages, Styling.

**Step 5.2: Code Standards**

- Follow Best Practices:
  - Frontend: `.agent/best-practices/frontend/frontend-development.md`
  - Backend: `.agent/best-practices/backend/backend-development.md`

### 6. Testing & Quality Assurance

**Step 6.1: Testing**

- Delegate to `.agent/agents/tester.md`.
- **Reference Workflow:** `.agent/workflows/fix/fix-test.md`.
- Run unit/integration tests (`npm test`, `php artisan test`).

**Step 6.2: Debugging**

- If tests fail, delegate to `.agent/agents/debugger.md`.
- **Reference Workflow:** `.agent/workflows/fix/fix-logs.md`.

### 7. Documentation & Handover

**Step 7.1: Documentation**

- Delegate to `.agent/agents/docs-manager.md`.
- **Reference Workflow:** `.agent/workflows/docs/docs-update.md`.
- Update `README.md`, `codebase-summary.md`, `project-roadmap.md`.

**Step 7.2: Final Report**

- Summarize changes.
- Delegate to `.agent/agents/git-manager.md` to commit/push (`.agent/workflows/git/git-cp.md`).
- Guide user on next steps.

---

## Tools & Agents Reference

| Task         | Agent / Workflow                                                       | Antigravity Tool                                  |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------- |
| **Research** | `.agent/agents/researcher.md`                                          | `search_web`, `read_url_content`                  |
| **Planning** | `.agent/agents/planner.md` <br> `.agent/workflows/plan.md`             | `task_boundary(Mode="PLANNING")`, `write_to_file` |
| **Design**   | `.agent/agents/ui-ux-designer.md` <br> `.agent/workflows/fix-ui.md`    | `generate_image`, `write_to_file`                 |
| **Coding**   | `.agent/agents/fullstack-developer.md` <br> `.agent/workflows/code.md` | `replace_file_content`, `run_command`             |
| **Testing**  | `.agent/agents/tester.md` <br> `.agent/workflows/fix-test.md`          | `run_command("npm test")`                         |
| **Debug**    | `.agent/agents/debugger.md` <br> `.agent/workflows/fix-logs.md`        | `grep_search`, `view_file`                        |
| **Docs**     | `.agent/agents/docs-manager.md` <br> `.agent/workflows/docs-update.md` | `write_to_file`                                   |
| **Git**      | `.agent/agents/git-manager.md` <br> `.agent/workflows/git-cp.md`       | `run_command("git ...")`                          |
