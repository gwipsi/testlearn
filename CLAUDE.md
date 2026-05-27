# CLAUDE.md

This file documents the repository structure, conventions, and workflows for AI assistants working in this codebase.

## 🤖 AI Assistant Collaboration Rules

**Important:** The AI assistant has NO memory between sessions. This CLAUDE.md is the **only persistent storage** for:
- Project rules, conventions, and best practices
- Behavioral guidelines for the assistant
- Hosting and deployment decisions
- Technical lessons learned
- Structure decisions (e.g., file organization)

**New insights and rules are documented here for future sessions.**

### Screenshot & Testing Rules

- **Screenshots:** Only when visual verification is genuinely needed (e.g., UI layout changes, design uncertainties). Not for every code change.
- **Vision Analysis:** Only on explicit request. Do NOT automatically analyze images with Claude's vision capabilities (expensive in tokens).
- **Token Efficiency:** Avoid unnecessary image processing. Trust code correctness for logic changes.

### AI Assistant Workflow Rules

**IMPORTANT: Always follow this workflow for code changes:**

1. **Create feature branch** or work on assigned branch (e.g., `claude/demo-headline-colors-NuUZE`)
2. **Make changes** and commit with clear messages
3. **Push to feature branch** (`git push -u origin <branch-name>`)
4. **Create PR to main** using `mcp__github__create_pull_request` — never push directly to main
5. **Let user merge** the PR (via web interface or git app)

**Why:** 
- `main` is branch-protected (requires PR reviews)
- AI assistants must respect this protection
- User merges the PR, maintaining control over what lands on main

**Common mistake to avoid:**
- ❌ Push changes directly to `main` without PR
- ❌ Forget to create PR after pushing to feature branch
- ✅ Always create PR, always let user merge

### Decision Log

- **2026-05-25:** Separated CSS and JavaScript from `index.html` into `styles.css` and `script.js` for better maintainability and professional structure.
- **2026-05-25:** Renamed `/web` folder to `/docs` for GitHub Pages deployment compatibility.
- **2026-05-25:** Deployed with GitHub Pages (public repository) instead of private alternatives due to educational/learning context.

## Project Overview

**testlearn** is a German-language learning repository designed to teach GitHub fundamentals through hands-on exercises with PowerShell 5.1 and a standalone HTML page. The project is intentionally minimal — the goal is learner visibility and simplicity, not production-grade architecture.

Primary documentation is in German. Code comments, variable names, log messages, and UI text are also in German.

## Repository Structure

```
testlearn/
├── CLAUDE.md               # This file (AI assistant guide & decision log)
├── README.md               # Project overview and quick-start (German)
├── Aufgaben.md             # Structured learning exercises 1–9 (German)
├── .gitignore              # Excludes Logs/, *.log, editor folders, OS files
├── scripts/
│   └── Get-SystemInfo.ps1  # Windows system-info PowerShell script
└── docs/                   # GitHub Pages deployment folder
    ├── index.html          # HTML structure (dashboard)
    ├── styles.css          # CSS styling (separate from HTML)
    ├── script.js           # JavaScript logic (separate from HTML)
    └── data.json           # Sample data for dynamic loading
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

### `docs/` Folder (GitHub Pages Deployment)

**Hosting:** Deployed via GitHub Pages from `/docs` branch folder. Live at: `https://gwipsi.github.io/testlearn/`

#### `index.html` (HTML Structure)
- **Language:** German UI text throughout.
- **Imports:** `<link rel="stylesheet" href="styles.css">` and `<script src="script.js"></script>`
- **Content:** Clean structure with header, main sections, footer.
- **Story Section:** "Die Geschichte von testlearn" — demonstrates styled narrative content.
- **Interactive Demo:** Buttons trigger JavaScript functions; output rendered in `<div id="output">`.

#### `styles.css` (Styling)
- **CSS custom properties** in `:root`:
  - `--blue-dark: #0074C7`, `--blue-light: #1F9EFF` (primary brand colors)
  - `--background: #f4f7fb`, `--card: #ffffff`, `--text: #172033`, `--muted: #627086`, `--border: #d8e1ee`
- **Layout:** CSS Grid (`repeat(auto-fit, minmax(240px, 1fr))`) with a max-width of 980px.
- **Components:** `.card`, `.button-row`, `.output`, `.story-section`, etc.
- **Separation benefit:** Easier to maintain, reuse styles across projects, professional structure.

#### `script.js` (JavaScript Logic)
- **Functions:**
  - `writeOutput(lines)` — updates the output terminal area.
  - `showSystemExample()` — renders mock system-info.
  - `showGitExercise()` — renders Git workflow reminder.
  - `loadProjectData()` — fetches and displays data from `data.json` (demonstrates fetch API).
  - `clearOutput()` — resets output to `"Bereit."`.
- **Separation benefit:** Cleaner code, professional structure, can be linted/tested separately.

#### `data.json` (Sample Data)
- Contains project metadata, commits list, and statistics.
- Demonstrates dynamic data loading (not hardcoded in HTML).
- Used by `loadProjectData()` function.

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
2. **Keep files small.** Both the PS1 script and the dashboard files are intentionally minimal. Resist the urge to refactor or expand unless explicitly asked.
3. **Separation of Concerns.** CSS and JavaScript are now separate from HTML (professional best practice). Do not inline them back unless explicitly requested.
4. **German text is canonical.** UI strings, log messages, and documentation should remain in German unless the user requests otherwise.
5. **Do not commit log files.** The `Logs/` directory is gitignored. Never stage or commit anything from it.
6. **PowerShell 5.1 only.** The script uses `Get-WmiObject`, which is not available in PowerShell 7+ Core cross-platform. Do not port to `Get-CimInstance` or cross-platform equivalents unless asked.
7. **GitHub Pages deployment:** Changes to `/docs/` are automatically live. Test locally with `python -m http.server` before pushing.

## Hosting & Deployment

- **Platform:** GitHub Pages (free, public repository)
- **Source:** `/docs` folder on `main` branch
- **URL:** https://gwipsi.github.io/testlearn/
- **Alternatives considered:** Netlify (with backend functions), Vercel, Uberspace (German hosting with privacy)
- **Why GitHub Pages:** Simplicity for static HTML/CSS/JS learning project. No backend needed yet.

## Maintenance Tasks

### ✅ Timestamp Auto-Update (GitHub Actions)

**No manual action needed!** A GitHub Actions workflow automatically updates the timestamp whenever `/docs/` files are modified.

**How it works:**

1. You push changes to **any branch** that modify files in `/docs/`
2. GitHub Actions workflow is triggered (`update-timestamp.yml`)
3. **Workflow automatically:**
   - Reads current date/time in UTC
   - Updates `lastUpdated` in `docs/data.json`
   - Commits change as `⏱️ Auto-update: timestamp for /docs changes`
   - Pushes the commit back to the same branch
4. When you merge the PR to `main`, the updated timestamp comes with it

The homepage displays "Letztes Update: [date] ([minutes ago])" so users always see the latest version.

**When it triggers:**
- ✅ Any push to **any branch** that modifies files in `/docs/`
- ✅ HTML/CSS/JS changes
- ✅ Feature additions or bug fixes
- ❌ NOT triggered: Changes to scripts/, CLAUDE.md, etc. (files outside `/docs/`)

**Why this design:**
- **Branch protection on main** prevents direct pushes → GitHub Actions has special permissions to work around this
- **Timestamp updates on feature branches** → correct value arrives on main automatically when PR is merged
- **Applies to all branches** → future branches created by agents work automatically without configuration

**If something goes wrong:** Check `.github/workflows/update-timestamp.yml` for proper `permissions: contents: write` setting.

---

## Quick Commands

### `repostat` / `gitstat`
**Trigger:** User types "repostat" or "gitstat"

**Action:** Display comprehensive git + GitHub status:
- Current branch and working directory state
- Unpushed commits, remote ahead status
- Comparison with main branch
- Merge conflicts, stashes
- Open pull requests
- Summary: all synchronized ✅ or outstanding issues ⚠️

**Data sources:**
- `git fetch --quiet` (before every measurement)
- `git status --porcelain` (working directory)
- `git log @{u}..HEAD` (unpushed commits)
- `git log HEAD..@{u}` (remote ahead)
- `git log HEAD..origin/main` / `origin/main..HEAD` (vs main)
- `git diff --diff-filter=U` (merge conflicts)
- `git stash list` (stashed changes)
- `git branch -r` (remote branches)
- GitHub MCP: `mcp__github__list_pull_requests` (open PRs)
- Time calculation: hours or days since last commit
