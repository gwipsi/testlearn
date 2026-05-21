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
- Eine einfache standalone HTML-Datei mit Inline-CSS und Inline-JavaScript bearbeiten

## Projektstruktur

```text
.
|-- README.md
|-- Aufgaben.md
|-- .gitignore
|-- scripts
|   `-- Get-SystemInfo.ps1
`-- web
    `-- index.html
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

HTML-Demo oeffnen:

```powershell
Start-Process .\web\index.html
```

## Erste Git-Uebung

Aendere im Skript den Wert von `$ScriptVersion`, fuehre das Skript aus und erstelle danach deinen ersten Commit:

```powershell
git status
git add .
git commit -m "Update script version"
git push
```

## HTML-Uebung

Aendere in `web\index.html` eine Farbe im Bereich `:root` oder passe einen Text an. Danach pruefst du die Aenderung im Browser und commitest sie:

```powershell
git status
git add web\index.html
git commit -m "Update dashboard demo"
git push
```

## Hinweis

Das Skript und die HTML-Datei sind absichtlich klein gehalten. Sie sollen als saubere Basis dienen, nicht als fertiges Admin- oder Web-Framework.