---
description: ⚡ Analyze and fix small issues [FAST]
argument-hint: [issues]
---

## Mission

**Think hard** to analyze and fix these issues:
<issues>$ARGUMENTS</issues>

---

## Best Practices Reference

📚 **Debugging:** `.agent/best-practices/utilities/debugging.md`  
📚 **Frontend:** `.agent/best-practices/frontend/frontend-development.md`

---

## Workflow

### 1. Analyze Issue

- If user provides screenshots or videos, use image analysis to describe the issue in detail.
- **Consult debugging best practices** (Step 1: Reproduce & Isolate) for systematic approach.

### 2. Debug & Find Root Cause

**📚 Follow:** `.agent/best-practices/utilities/debugging.md` - Phase 2 (Trace & Investigate)

- Review error logs and stack traces
- Check recent code changes using file history
- Trace execution flow to failure point
- Identify problematic code sections
- Form hypothesis about root cause

**Tools:** `grep_search`, `view_file`, `run_command`

### 3. Implement Fix

**📚 If frontend bug:** Consult `.agent/best-practices/frontend/frontend-development.md`

- Apply minimal changes following KISS principle
- Follow project code standards (check `docs/`)
- Add comments for complex logic
- Ensure proper error handling
- Handle edge cases

**Tools:** `replace_file_content`, `multi_replace_file_content`

### 4. Test Fix

**📚 Follow:** `.agent/best-practices/utilities/debugging.md` - Phase 4 (Fix & Validate)

- Run relevant test suite using `run_command`
- Verify issue is resolved
- Check for regressions (no new issues)
- Test edge cases and error scenarios
- If tests fail, debug and repeat from step 2

### 5. Report Results

- Summary of issue and root cause
- Changes made (files modified)
- Test results
- How to verify the fix
- Suggest next steps if needed
