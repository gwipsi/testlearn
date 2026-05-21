# PowerShell Git Lernprojekt

Dieses Repository ist ein kleines Lernprojekt, um GitHub mit PowerShell 5.1 zu ueben.

## Ziel

Du lernst hier schrittweise:

- Repository klonen
- Dateien bearbeiten
- Aenderungen mit `git status` pruefen
- Commits erstellen
- Branches verwenden
- Pull Requests verstehen
- PowerShell-Skripte versionieren

## Projektstruktur

```text
.
|-- README.md
|-- Aufgaben.md
|-- .gitignore
`-- scripts
    `-- Get-SystemInfo.ps1
```

## Start

Repository klonen:

```powershell
git clone https://github.com/gwipsi/testlearn.git
cd testlearn
```

Skript ausfuehren:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\scripts\Get-SystemInfo.ps1
```

## Erste Git-Uebung

Aendere im Skript den Wert von `$ScriptVersion`, fuehre das Skript aus und erstelle danach deinen ersten Commit:

```powershell
git status
git add .
git commit -m "Update script version"
git push
```

## Hinweis

Das Skript ist absichtlich klein gehalten. Es soll als saubere Basis dienen, nicht als fertiges Admin-Framework.