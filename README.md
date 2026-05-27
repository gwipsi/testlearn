# PowerShell Git Lernprojekt

Dieses Repository ist ein kleines Lernprojekt, um die Grundlagen von GitHub mit PowerShell 5.1 und einer kleinen Webseite zu üben.

🌐 **Live-Demo:** [gwipsi.github.io/testlearn](https://gwipsi.github.io/testlearn/) · 📖 **Git-Leitfaden:** [docs/git-tutorial.html](https://gwipsi.github.io/testlearn/git-tutorial.html)

## Ziel

Du lernst hier schrittweise:

- Repository klonen
- Dateien bearbeiten
- Änderungen mit `git status` prüfen
- Commits erstellen
- Branches verwenden
- Pull Requests verstehen
- PowerShell-Skripte versionieren
- Eine Webseite mit getrennten HTML-, CSS- und JavaScript-Dateien bearbeiten

Die strukturierten Übungen findest du in [`Aufgaben.md`](Aufgaben.md).

## Projektstruktur

```text
.
|-- README.md             # Diese Datei
|-- Aufgaben.md           # Strukturierte Lernaufgaben
|-- CLAUDE.md             # Leitfaden für KI-Assistenten
|-- .gitignore
|-- scripts
|   `-- Get-SystemInfo.ps1   # PowerShell-Lernskript (Windows)
`-- docs                     # Per GitHub Pages veröffentlicht
    |-- index.html           # Dashboard-Struktur
    |-- styles.css           # Styling (separat)
    |-- script.js            # Logik (separat)
    |-- data.json            # Beispiel-Daten
    `-- git-tutorial.html    # Git-Leitfaden für Agenten-Teams
```

## Start

Repository klonen:

```powershell
git clone https://github.com/gwipsi/testlearn.git
cd testlearn
```

Skript ausführen:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\scripts\Get-SystemInfo.ps1
```

Webseite öffnen:

```powershell
Start-Process .\docs\index.html
```

## Dashboard-Hinweise

Die Webseite liegt im Ordner `docs`, weil GitHub Pages diesen Ordner direkt veröffentlicht. HTML, CSS und JavaScript sind getrennt:

- `docs\index.html` enthält die sichtbare Struktur.
- `docs\styles.css` enthält Farben, Layout und den Hell-/Dunkelmodus.
- `docs\script.js` enthält die Button-Logik, den Datenabruf aus `data.json` und die Theme-Umschaltung.

Der Theme-Schalter oben rechts nutzt zunächst die Systemeinstellung (`prefers-color-scheme`). Sobald du ihn anklickst, wird deine Auswahl als `testlearn-theme` im Browser gespeichert.

## Erste Git-Übung

Ändere im Skript den Wert von `$ScriptVersion`, führe das Skript aus und erstelle danach deinen ersten Commit:

```powershell
git status
git add scripts\Get-SystemInfo.ps1
git commit -m "Update script version"
git push
```

## Web-Übung

Ändere in `docs\styles.css` eine Farbe im Bereich `:root` oder passe einen Text in `docs\index.html` an. Danach prüfst du die Änderung im Browser und commitest sie:

```powershell
git status
git add docs\styles.css docs\index.html
git commit -m "Update dashboard demo"
git push
```

## Hinweis

Das Skript und die Webseite sind absichtlich klein gehalten. Sie sollen als saubere Lernbasis dienen, nicht als fertiges Admin- oder Web-Framework.
