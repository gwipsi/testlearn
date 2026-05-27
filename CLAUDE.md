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

### ✅ "Letztes Update" — client-side, no committed timestamp

The homepage shows "Letztes Update: [date] ([relative])" by fetching the date of
the **latest commit touching `docs/`** directly from the GitHub API at page load.

**How it works:**
- `script.js` → `updateLastModifiedTime()` calls
  `https://api.github.com/repos/gwipsi/testlearn/commits?path=docs&per_page=1`
- It reads `commit.committer.date` of the newest commit and renders it.
- On error / rate limit it shows "⏱ Zeitstempel nicht verfügbar" (graceful fallback).

**Why this design (important — do NOT reintroduce a committed timestamp):**
- Previously a GitHub Action wrote `lastUpdated` into `docs/data.json` on every push.
  That value diverged between `main` and feature branches and caused a **merge conflict
  on the same line every single time**. See the conflict-detection notes below.
- Nothing per-push-changing is committed anymore → **zero timestamp merge conflicts**,
  no bot `⏱️ Auto-update` commits cluttering history, no branch-protection workarounds.
- Tradeoff: one unauthenticated GitHub API call per page load (60/hr per IP). Fine for a
  learning demo; covered by a fallback message.

**If the timestamp shows "nicht verfügbar":** usually API rate limiting — it recovers on
its own. There is no Action and no `lastUpdated` field to maintain.

---

## Quick Commands

### `repostat` / `gitstat`
**Trigger:** User types "repostat" or "gitstat"

**Action:** Display comprehensive git + GitHub status (branch, workdir, unpushed,
remote-ahead, vs-main, conflicts, PRs, branches, stashes, last commit).

#### ⚠️ Conflict detection — read this before reporting "keine Konflikte"

Conflict detection in this repo has failed repeatedly. Follow this exact order
of trust. **NEVER report "no conflicts" based on a local test against local HEAD.**

**1. AUTHORITATIVE — GitHub API (use this whenever an open PR exists):**
   - `mcp__github__pull_request_read` → field `mergeable_state`:
     - `dirty`   → **MERGE CONFLICT** (cannot merge, must resolve)
     - `blocked` → no conflict; blocked by branch protection (needs review/approval) — user action
     - `behind`  → no conflict; branch must update from base first
     - `clean`   → ready to merge
     - `unknown` → GitHub still computing; wait and re-query, do NOT assume clean
   - This is the source of truth. If it says `dirty`, there IS a conflict even if
     a local test disagrees.

**2. LOCAL fallback (only when no PR exists, e.g. pre-push):**
   - `git fetch origin --quiet` FIRST (mandatory).
   - Test the REMOTE refs in the PR direction, never local HEAD:
     `git merge-tree $(git merge-base origin/main origin/<branch>) origin/main origin/<branch>`
   - Conflict if output contains `changed in both` or `<<<<<<<`.

**Why local-HEAD tests give false negatives (the recurring bug):**
- The `update-timestamp` GitHub Action pushes an extra `⏱️ Auto-update` commit to
  the feature branch AFTER you push. Your local HEAD is then stale / behind
  `origin/<branch>`, so a merge test against local HEAD tests the wrong tree.
- A merge test needs a fresh `git fetch`; a stale `origin/main` ref also lies.
- `git diff --diff-filter=U` only reports files during an ACTIVE merge — useless before one.

**Root cause of the repeated conflicts (so we can avoid them):**
- `docs/data.json` `lastUpdated` is edited on BOTH main (from previously merged PRs)
  and the feature branch (by the Action). The same line diverges every time → guaranteed
  conflict on that one line. Resolve by **keeping the newer timestamp** (`git checkout --ours docs/data.json` when merging main into the feature branch).
- Reusing one long-lived branch makes histories cross (large "N ahead / N behind").
  **Prefer fresh, short-lived branches per change**; delete the branch after its PR merges.

**Other data sources:** `git status --porcelain` (workdir), `git log @{u}..HEAD`
(unpushed), `git log HEAD..@{u}` (remote ahead), `git rev-list --count origin/main...HEAD`
(vs main), `git stash list`, `git branch -r`, `mcp__github__list_pull_requests` (open PRs).

### Output Format & Fazit

**Display as Markdown code block** with this structure:
```
🔍 testlearn  (gwipsi/testlearn)
────────────────────────────────────────
branch:   [current branch]

✅ Workdir        sauber | ⚠️ [X files changed]
⚠️ Nicht gepusht  [N] | ✅ Alles gepusht
⚠️ Remote voraus  [N] | ✅ Lokal aktuell
⚠️ Branch↔main   [X ahead / Y behind] | ✅ Syncron
✅ Konflikte      keine | ⚠️ Ja
✅ Offene PRs     [N] | ⚠️ [N] (blocked/dirty)
🌿 Branches       [N] (außer main)
📦 Stashes        [N]

Letzter Commit:
YYYY-MM-DD HH:MM  (vor Xm/Xh)
[hash]  [message]

Fazit: [Status summary]
```

**Fazit Format (Multi-line when problems exist):**
- If ✅ all green: `Fazit: ✅ [Summary]`
- If ⚠️ problems exist: Show all three lines:
  1. **Problem:** What's wrong (e.g., "PR #21 hat Konflikte")
  2. **Grund:** Root cause in one line (e.g., "mergeable_state=dirty")
  3. **Lösung:** Action user can take (e.g., "Schreib 'fix' → ich behebe es")

Example:
```
Fazit: ⚠️ PR #21 hat Konflikte (mergeable_state=dirty)
Grund: Main hat neue Commits, die mit dieser Branch kollidieren
Lösung: Schreib "fix" → ich behebe die Konflikte
```

### `fix` — Auto-fix detected problems
**Trigger:** User types "fix"

**Action:** Scan current branch for common issues and attempt auto-fix:
- **Unpushed commits** → `git push origin [branch]`
- **Merge conflicts (PR dirty)** → `git pull origin main --no-rebase`, resolve with `git checkout --ours/--theirs` as needed, commit, push
- **Branch behind main** → `git pull origin main`
- **Stashed changes** → `git stash pop`

**Output:** Show what was fixed (or what couldn't be), then run `gitstat` to display new status.
