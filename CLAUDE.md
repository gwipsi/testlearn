# CLAUDE.md

This file documents the repository structure, conventions, and workflows for AI assistants working in this codebase.

## Project Overview

**testlearn** is a German-language learning repository designed to teach GitHub fundamentals through hands-on exercises with PowerShell 5.1 and a standalone HTML page. The project is intentionally minimal — the goal is learner visibility and simplicity, not production-grade architecture.

Primary documentation is in German. Code comments, variable names, log messages, and UI text are also in German.

## Repository Structure

```
testlearn/
├── CLAUDE.md               # This file
├── README.md               # Project overview and quick-start (German)
├── Aufgaben.md             # Structured learning exercises 1–9 (German)
├── .gitignore              # Excludes Logs/, *.log, editor folders, OS files
├── scripts/
│   └── Get-SystemInfo.ps1  # Windows system-info PowerShell script
└── web/
    └── index.html          # Standalone HTML/CSS/JS dashboard
```

**Gitignored at runtime:**
- `Logs/` — created automatically when the PowerShell script runs; never commit log files.

## Source Files

### `scripts/Get-SystemInfo.ps1`

- **Runtime:** PowerShell 5.1 on Windows. Uses `Get-WmiObject` (Windows-only WMI).
- **Purpose:** Collects OS info (caption, version, build number, computer name, PS version, username) and writes it to a timestamped log file.
- **Version variable:** `$ScriptVersion` at line 2. Bumping this is the first exercise in `Aufgaben.md`.
- **Log output:** Written to `../Logs/<ScriptName><ScriptVersion><Username>.log` relative to the script's directory. The `Logs/` folder is created automatically if absent.
- **Log levels:** `Info`, `Wichtig`, `Warnung`, `Fehler`, `Erfolg`, `Debug` — validated by a `[ValidatePattern]` attribute in `Write-Log`.
- **Exit codes:** `$CHECK_PASSED = 0`, `$CHECK_FAILED = 1001`.
- **Entry point:** `Invoke-Main` called inside a `try/catch` block at the bottom.
- **Run command:**
  ```powershell
  powershell.exe -ExecutionPolicy Bypass -File .\scripts\Get-SystemInfo.ps1
  ```

**Conventions for the script:**
- Functions follow Verb-Noun PowerShell naming (`Get-OperatingSystemInfo`, `Write-Log`, etc.).
- All output goes through `Write-Log` — never `Write-Host` directly outside that function.
- Return structured objects with `[PSCustomObject]@{}` rather than raw strings.
- Keep the script small; it is a teaching example, not a framework.

### `web/index.html`

- **Single-file, no dependencies.** All CSS and JavaScript are inline by design.
- **Language:** German UI text throughout.
- **CSS custom properties** are defined in `:root`:
  - `--blue-dark: #0074C7`, `--blue-light: #1F9EFF` (primary brand colors)
  - `--background: #f4f7fb`, `--card: #ffffff`, `--text: #172033`, `--muted: #627086`, `--border: #d8e1ee`
- **Layout:** CSS Grid (`repeat(auto-fit, minmax(240px, 1fr))`) with a max-width of 980px.
- **JavaScript functions:**
  - `showSystemExample()` — renders mock system-info output in the terminal area.
  - `showGitExercise()` — renders a Git workflow reminder.
  - `clearOutput()` — resets the terminal area to `"Bereit."`.
  - All output targets `<div id="output">` via `writeOutput(lines)`.
- **Open in browser:**
  ```powershell
  Start-Process .\web\index.html
  ```

**Conventions for the HTML file:**
- Inline CSS and JS are intentional and should stay that way unless the task explicitly calls for separation.
- The footer note explains this decision and should be preserved.
- Color changes are the primary visual exercise — edit values inside `:root`.

## Git Conventions

**Branches:**
- `main` is the stable branch.
- Feature branches use the pattern `feature/<short-description>` (e.g., `feature/add-disk-info`).
- `Aufgaben.md` task 4 demonstrates the canonical branching workflow.

**Commits:**
- Messages are in English (based on existing history: `"Add standalone HTML dashboard"`, `"Update script version"`).
- Each commit should represent a single coherent change. `Aufgaben.md` explicitly notes: *"Not every change deserves a commit."*
- Typical staging:
  ```powershell
  git add scripts\Get-SystemInfo.ps1   # stage specific file
  git commit -m "Descriptive message"
  git push
  ```

**Pull Requests:**
- PRs go from a feature branch into `main`.
- PR #1 (`demo/update-dashboard-text` → `main`) is the reference example in the repo history.

## No Tests, No CI, No Linting

There are no automated tests, CI pipelines, linters, or formatters configured. This is intentional for a beginner-focused learning project.

## What to Keep in Mind When Making Changes

1. **Preserve educational clarity.** This repo is a teaching tool. Avoid adding complexity or abstractions that obscure what the learner is meant to see.
2. **Keep files small.** Both the PS1 script and the HTML file are intentionally minimal. Resist the urge to refactor or expand unless explicitly asked.
3. **Inline code in HTML is correct here.** Do not split CSS or JS into separate files unless task 9's discussion leads to an explicit request.
4. **German text is canonical.** UI strings, log messages, and documentation should remain in German unless the user requests otherwise.
5. **Do not commit log files.** The `Logs/` directory is gitignored. Never stage or commit anything from it.
6. **PowerShell 5.1 only.** The script uses `Get-WmiObject`, which is not available in PowerShell 7+ Core cross-platform. Do not port to `Get-CimInstance` or cross-platform equivalents unless asked.
