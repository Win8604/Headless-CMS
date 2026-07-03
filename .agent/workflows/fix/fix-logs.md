---
description: ⚡ Analyze logs and fix issues
argument-hint: [issue]
---

# Fix Issues using Logs

**Purpose**: Systematic log analysis to find and fix root causes.

---

## Mission

<issue>$ARGUMENTS</issue>

---

## Workflow

### 1. Log Capture

- **Check for logs**: Verify if `./logs.txt` exists.
- **Configure (if missing)**:
  - Updates script config to pipe stderr/stdout to logs.
  - Bash/Unix: `2>&1 | tee logs.txt`
  - PowerShell: `*>&1 | Tee-Object logs.txt`
- **Generate Logs**: Run the command to reproduce the issue and populate logs.

### 2. Analysis

- **Analyze Logs**: Use `grep_search` to find error patterns.
  - Recommended: `tail -n 50 logs.txt` to see recent errors.
  - Search for "Error", "Exception", "Fatal", "Warning".
- **Locate Code**: Use `grep_search` or `find_by_name` to find the code responsible for the error.

### 3. Planning

- **Create Plan**: If the fix is complex, create an `implementation_plan.md` artifact.
- **Trace Root Cause**: Confirm why the error is happening.

### 4. Implementation

- **Apply Fix**: Edit files using code tools (`replace_file_content`).
- **Review**: Ensure changes address the root cause without side effects.

### 5. Verification

- **Test**: Run `run_command` to verify the fix works.
- **Check Logs**: Ensure no new errors appear in `logs.txt`.

### 6. Reporting

- **Summary**: Report changes and results to the user.
- **Next Steps**: Suggest further actions if needed.
