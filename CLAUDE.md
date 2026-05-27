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

### 🔧 Quick Status Commands

**User can request status snapshots with these keywords:**

- **`gitstat`** — Run `git status` and display working tree status
  - Shows: Current branch, uncommitted changes, tracking status
  - Output: Clean text format
  
- **`repostat`** — Run comprehensive repo status check
  - Shows: Branch list with commits, recent commits (10), remote status compared to main
  - Output: Markdown table format with branch/commit info
  
**Action:** When user types these keywords, immediately execute the commands and format output clearly (Markdown tables preferred). No explanations needed unless status is problematic.

### ✅ Timestamp Auto-Update (Git Hook)

**No manual action needed!** A Git Pre-commit Hook automatically updates the timestamp whenever you commit changes to `/docs/`.

**How it works:**

1. You make changes to HTML/CSS/JS in `/docs/`
2. You run `git commit -m "Your message"`
3. **Hook automatically:**
   - Updates `lastUpdated` in `data.json` with current UTC time
   - Adds the updated file to your commit
   - Shows: `✅ Timestamp auto-updated: 2026-05-25T08:07:30Z`
4. Commit succeeds with both your changes AND the timestamp update

The homepage displays "Letztes Update: [date] ([minutes ago])" so users always see the latest version.

**Example commit flow:**
```bash
$ git add docs/index.html
$ git commit -m "Fix button styling"

✅ Timestamp auto-updated: 2026-05-25T08:07:30Z
[main abc1234] Fix button styling
 2 files changed, 3 insertions(+), 1 deletion(-)
```

**When it triggers:**
- ✅ Any commit that changes files in `/docs/`
- ✅ HTML/CSS/JS changes
- ✅ Feature additions or bug fixes
- ❌ NOT needed: Changes to scripts/, CLAUDE.md, etc. (files outside `/docs/`)

**If something goes wrong:** The hook will show an error. Just run the commit again.
