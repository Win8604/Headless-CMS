---
description: ⚡⚡ Analyze and fix UI issues
argument-hint: [issue]
---

# Fix UI Issues

**Purpose**: Systematically analyze and fix User Interface and User Experience issues, ensuring alignment with design guidelines.

**When to Use**:

- Visual bugs (misalignment, wrong colors, spacing)
- Responsive design issues (mobile/tablet/desktop)
- Component styling updates
- Interaction/Animation fixes
- Accessibility (a11y) improvements

---

## Mission

**Analyze and fix the following UI issue:**
<issue>$ARGUMENTS</issue>

---

## Workflow

### 1. Analysis & Design Review

- **Visual Analysis**: If user provides screenshots/videos, use image analysis to understand the visual defect.
- **Consult Guidelines**: Read `./docs/design-guidelines.md` (if available) to ensure compliance with the design system.
- **Reference Code**: Check `index.css`, `tailwind.config.js` (if applicable), and relevant component files to understand current styling.
- **Generate Assets**: If new UI assets are needed, use `generate_image` tool to create them.

### 2. Implementation

- **Edit Code**: Implement the UI fix directly in the codebase.
  - Prioritize CSS classes/modules over inline styles.
  - Ensure reusability of components.
  - Maintain consistency with existing design patterns.
- **Refine**: Iterate on the design to ensure it "wows" the user (modern aesthetics, smooth interactions).

### 3. Verification

- **Visual Check**:
  - If the dev server is accessible, use the `browser_subagent` (if available) to navigate to the page and capture a screenshot of the fix.
  - Otherwise, rely on code review and ask the user to verify visually.
- **Code Quality**:
  - Use `run_command` to run linting or build checks (`npm run lint` or `npm run build`) to ensure no syntax errors.

### 4. Documentation & Finalize

- **Update Docs**: If the fix changes design patterns, update `./docs/design-guidelines.md`.
- **Status Update**: Update project plans or task trackers if applicable.
- **Report**:
  - Summarize the UI changes made.
  - Explain how the fix addresses the visual issue.
  - Attach any generated screenshots/assets.
  - Ask user for final visual approval.
- **Commit**: On approval, stage and commit changes: `git commit -m "fix(ui): [description]"`

---

## Capabilities Used

- **Code Editing**: For CSS/TSX/JSX changes.
- **Image Generation**: For creating placeholders or UI assets (`generate_image`).
- **Browser Control**: For capturing screenshots of fixes (`browser_subagent`).
- **Terminal**: For running build/lint commands.
