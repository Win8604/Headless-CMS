# Antigravity Tools Documentation

Comprehensive guide to all available tools in the Antigravity system, categorized by functionality.

---

## 1. File System Operations

### `list_dir`

Lists contents of a directory (files and subdirectories).

- **Usage**: Use to explore folder structure.
- **Arguments**:
  - `DirectoryPath`: Absolute path to directory.
- **Example**: `list_dir(DirectoryPath="/path/to/project/src")`

### `view_file`

Reads the content of a file. Optimized for large files by allowing line ranges.

- **Usage**: Reading code, configs, or documentation.
- **Arguments**:
  - `AbsolutePath`: Full path to the file.
  - `StartLine` (optional): 1-indexed start line.
  - `EndLine` (optional): 1-indexed end line.
- **Example**: `view_file(AbsolutePath="/path/to/file.ts", StartLine=1, EndLine=100)`

### `write_to_file`

Creates a new file or overwrites an existing one entirely.

- **Usage**: Creating new components, config files, or documentation.
- **Arguments**:
  - `TargetFile`: Absolute path.
  - `CodeContent`: String content of the file.
  - `Overwrite`: Set `true` to overwrite existing files.
- **Example**: `write_to_file(TargetFile="/path/to/new.ts", CodeContent="...", Overwrite=false)`

---

## 2. Code Editing

### `replace_file_content`

Replaces a **single contiguous block** of text in a file.

- **Usage**: Most common tool for editing code. Safer than rewriting whole files.
- **Arguments**:
  - `TargetFile`: Path to file.
  - `TargetContent`: Exact string to match (must be unique).
  - `ReplacementContent`: New content string.
- **Example**:
  ```python
  replace_file_content(
      TargetFile="/path/to/file.py",
      TargetContent="def old_func():\n    pass",
      ReplacementContent="def new_func():\n    return True"
  )
  ```

### `multi_replace_file_content`

Performs **multiple non-contiguous** edits in the same file simultaneously.

- **Usage**: When updating multiple functions or imports in one file.
- **Arguments**:
  - `TargetFile`: Path to file.
  - `ReplacementChunks`: Array of objects `{TargetContent, ReplacementContent}`.
- **Example**:
  ```python
  multi_replace_file_content(
      TargetFile="/path/to/file.py",
      ReplacementChunks=[
          {"TargetContent": "import A", "ReplacementContent": "import B"},
          {"TargetContent": "funcA()", "ReplacementContent": "funcB()"}
      ]
  )
  ```

---

## 3. Terminal & Execution

### `run_command`

Executes a shell command (zsh/bash).

- **Usage**: Running tests, builds, git commands, scripts.
- **Arguments**:
  - `CommandLine`: The command string.
  - `Cwd`: Working directory.
  - `SafeToAutoRun`: `true` for read-only/safe commands.
  - `WaitMsBeforeAsync`: Time to wait before backgrounding (e.g., 2000ms).
- **Example**: `run_command(CommandLine="npm test", Cwd="/path/to/project", SafeToAutoRun=true)`

### `command_status`

Checks the status/output of a background command.

- **Usage**: Polling long-running processes like builds or server starts.
- **Arguments**:
  - `CommandId`: ID returned from `run_command`.
- **Example**: `command_status(CommandId="...", WaitDurationSeconds=5)`

### `read_terminal`

Reads the latest output from an active terminal session.

- **Usage**: Checking live logs or interactive prompts.
- **Arguments**:
  - `ProcessID`: ID of the process.

### `send_command_input`

Sends text input to a running command.

- **Usage**: Responding to prompts (e.g., "Are you sure? [y/N]").
- **Arguments**:
  - `CommandId`: Target command ID.
  - `Input`: String to send (include `\n` for enter).
- **Example**: `send_command_input(CommandId="...", Input="y\n")`

---

## 4. Search & Exploration

### `find_by_name`

Finds files by filename pattern (glob).

- **Usage**: Locating specific files when path is unknown.
- **Arguments**:
  - `SearchDirectory`: Root dir to search.
  - `Pattern`: Glob pattern (e.g., `*.ts`, `*config*`).
- **Example**: `find_by_name(SearchDirectory="/src", Pattern="*.tsx")`

### `grep_search`

Searches for text content **inside** files (using ripgrep).

- **Usage**: Finding function definitions, variable usages, or specific strings.
- **Arguments**:
  - `SearchPath`: Directory or file to search.
  - `Query`: Text or Regex pattern.
- **Example**: `grep_search(SearchPath="/src", Query="function myFunc")`

### `view_file_outline`

Shows symbols (classes, functions, methods) in a file.

- **Usage**: Understanding file structure without reading all code.
- **Arguments**:
  - `AbsolutePath`: Path to file.

### `view_code_item`

Extracts specific code elements (function/class) by name.

- **Usage**: Reading just one function instead of whole file.
- **Arguments**:
  - `File`: Path to file.
  - `NodePaths`: Array of symbol names (e.g., `["MyClass.myMethod"]`).

---

## 5. Browser & Web

### `browser_subagent`

Agents that controls a real browser instance.

- **Usage**: E2E testing, UI verification, scraping complex JS sites.
- **Arguments**:
  - `TaskName`: Name of the session.
  - `Task`: Instructions for the agent (e.g., "Go to localhost:3000, click login").
- **Example**: `browser_subagent(TaskName="Test Login", Task="Navigate to login page and verify form")`

### `read_url_content`

Fetches text content from a URL (headless/no-JS).

- **Usage**: Reading documentation, blogs, or static pages fast.
- **Arguments**:
  - `Url`: Target URL.

### `search_web`

Performs a Google search.

- **Usage**: Researching errors, libraries, or docs.
- **Arguments**:
  - `query`: Search terms.

---

## 6. Miscellaneous

### `generate_image`

Generates images using AI.

- **Usage**: Creating UI mockups, assets, or placeholders.
- **Arguments**:
  - `Prompt`: Description of image.
  - `ImageName`: Output filename.

### `task_boundary`

Marks completion or transition of high-level tasks.

- **Usage**: Organizing work into chunks, clearing context.
- **Arguments**:
  - `TaskName`: Name of current task.
  - `TaskStatus`: Current status description.

### `notify_user`

Sends a prominent message/notification to the user.

- **Usage**: Asking for approval, reporting major milestones.
- **Arguments**:
  - `Message`: Markdown text.
  - `BlockedOnUser`: `true` if waiting for reply.

### `list_resources` / `read_resource`

Interacts with MCP (Model Context Protocol) servers.

- **Usage**: Accessing external data sources configured via MCP.

---

## 7. Planning & Task Management

### Enabling Planning Mode

Planning mode is a conceptual state where the agent focuses on analyzing, breaking down tasks, and documenting plans before execution. It is managed via artifacts and task boundaries.

**Key Actions:**

1. **Create Plan Artifacts**: Use `write_to_file` to create `implementation_plan.md` or `task.md`.
2. **Define Boundaries**: Use `task_boundary` to set the current context.

### `task_boundary`

Defines the scope and status of the current task.

- **Usage**:
  - **Start Planning**: Call with a high-level task name (e.g., "Planning Phase 1").
  - **Add Task**: Effectively done by updating the `task.md` artifact via `replace_file_content`.
  - **predictedTaskSize**: Helps the system allocate resources.
- **Arguments**:
  - `TaskName`: Name of the task or phase.
  - `TaskSummary`: Description of what is being done.
  - `TaskStatus`: Current state (e.g., "Planning", "Implementing", "Reviewing").
  - `PredictedTaskSize`: Estimate of steps (1-5).
  - `Mode` (NEW): Can strictly specify `PLANNING` or `IMPLEMENTATION` if supported by system version.

### Managing Tasks (Artifact-based)

Tasks are managed by editing the `task.md` file directly using file tools.

- **Add Task**: `replace_file_content` to append `- [ ] New Task` to `task.md`.
- **Complete Task**: `replace_file_content` to change `[ ]` to `[x]`.
