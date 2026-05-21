# Aufgaben

Dieses Dokument enthaelt kleine Git- und PowerShell-Uebungen.

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

## Kritischer Hinweis

Nicht jede Aenderung verdient einen Commit. Ein Commit sollte eine fachlich zusammenhaengende Aenderung enthalten.