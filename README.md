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
- Den Hell-/Dunkelmodus einer statischen GitHub-Pages-Seite nachvollziehen

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

Für die komplette Browser-Demo mit `data.json` und GitHub-API-Zeitstempel ist ein lokaler Webserver hilfreicher:

```powershell
cd docs
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen. Unter Windows kann der Befehl je nach Installation auch `py -m http.server 8000` oder `python -m http.server 8000` heißen.

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

### Hell-/Dunkelmodus

Das Dashboard und der Git-Leitfaden unterstützen einen Hell-/Dunkelmodus:

- `docs\index.html` und `docs\git-tutorial.html` setzen beim Laden früh das Attribut `data-theme`, damit die Seite direkt im richtigen Modus startet.
- `docs\script.js` speichert die Auswahl im Browser unter `testlearn-theme`. Ohne gespeicherte Auswahl wird `prefers-color-scheme` des Betriebssystems genutzt.
- `docs\styles.css` enthält die Designwerte als CSS-Variablen in `:root` und überschreibt sie für `[data-theme="dark"]`.
- Der Button `Dunkelmodus`/`Hellmodus` aktualisiert Text, `aria-label` und `aria-pressed`.

Wenn der Modus nicht wie erwartet wechselt, lösche im Browser den Local-Storage-Eintrag `testlearn-theme` oder teste in einem privaten Fenster.

## Hinweis

Das Skript und die Webseite sind absichtlich klein gehalten. Sie sollen als saubere Lernbasis dienen, nicht als fertiges Admin- oder Web-Framework.
