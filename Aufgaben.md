# Aufgaben

Dieses Dokument enthaelt kleine Git-, PowerShell- und HTML-Uebungen.

## Aufgabe 1: Repository lokal klonen

```powershell
git clone https://github.com/gwipsi/testlearn.git
cd testlearn
```

Pruefe danach den Status:

```powershell
git status
```

## Aufgabe 2: Skript ausfuehren

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\scripts\Get-SystemInfo.ps1
```

Pruefe danach den Ordner `Logs`.

## Aufgabe 3: Kleine Aenderung committen

Aendere in `scripts\Get-SystemInfo.ps1` die Variable `$ScriptVersion` von `1.0.0` auf `1.0.1`.

Danach:

```powershell
git status
git add scripts\Get-SystemInfo.ps1
git commit -m "Update script version to 1.0.1"
git push
```

## Aufgabe 4: Branch erstellen

```powershell
git switch -c feature/add-disk-info
```

Erweitere das Skript um eine Ausgabe zum freien Speicherplatz von Laufwerk C:.

Danach:

```powershell
git status
git add .
git commit -m "Add disk information"
git push -u origin feature/add-disk-info
```

## Aufgabe 5: Pull Request erstellen

Erstelle auf GitHub einen Pull Request von `feature/add-disk-info` nach `main`.

Ziel: Verstehen, dass ein Pull Request eine kontrollierte Aenderung gegen den Hauptstand ist.

## Aufgabe 6: Fehler absichtlich einbauen

Baue eine kleine falsche Variable ein, fuehre das Skript aus und beobachte die Fehlermeldung.

Danach den Fehler korrigieren und committen.

## Aufgabe 7: HTML-Demo öffnen

Öffne die standalone HTML-Datei im Browser:

```powershell
Start-Process .\docs\index.html
```

Klicke die Buttons in der Seite an und prüfe, wie die Ausgabe durch `docs\script.js` verändert wird.

Teste auch den Schalter oben rechts: Er wechselt zwischen Hell- und Dunkelmodus. Ohne gespeicherte Auswahl folgt die Seite der Systemeinstellung des Browsers.

## Aufgabe 8: Dashboard sichtbar ändern

Ändere in `docs\styles.css` im Bereich `:root` den Wert von `--blue-dark` oder passe einen Kartentext in `docs\index.html` an.

Danach:

```powershell
git status
git add docs\styles.css docs\index.html
git commit -m "Change dashboard demo"
git push
```

## Aufgabe 9: Sinnvolle Trennung diskutieren

HTML, CSS und JavaScript liegen absichtlich in getrennten Dateien. Notiere für dich, warum diese Trennung Pull Requests leichter lesbar macht und ab wann sie in größeren Projekten besonders wichtig wird.

## Kritischer Hinweis

Nicht jede Aenderung verdient einen Commit. Ein Commit sollte eine fachlich zusammenhaengende Aenderung enthalten.