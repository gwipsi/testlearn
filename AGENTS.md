# AGENTS.md

## Cursor Cloud specific instructions

### Überblick

Dieses Repository ist ein minimales Lernprojekt ohne Build-System, Paketmanager, Tests oder Linter. Es gibt keine Abhängigkeiten zu installieren.

### Dashboard starten (einziger Service)

```bash
cd /workspace/docs && python3 -m http.server 8000
```

Das Dashboard ist dann unter `http://localhost:8000/` erreichbar. Die `fetch("data.json")`-Funktion benötigt einen HTTP-Server (funktioniert nicht über `file://`).

### Hinweise

- **Kein Linter/Test/Build:** Das Projekt hat absichtlich keine automatisierten Tests, CI-Pipelines oder Linter. Validierung erfolgt manuell im Browser.
- **PowerShell-Skript:** `scripts/Get-SystemInfo.ps1` ist Windows-only (PowerShell 5.1, `Get-WmiObject`). Es kann auf Linux nicht ausgeführt werden.
- **Git Pre-commit Hook:** Laut CLAUDE.md existiert ein Hook, der `lastUpdated` in `data.json` aktualisiert bei Änderungen in `/docs/`. Der Hook muss ggf. manuell eingerichtet werden (prüfe `.git/hooks/pre-commit`).
- **Standardbefehle:** Siehe `CLAUDE.md` für vollständige Projektdokumentation und Konventionen.
