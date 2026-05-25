function writeOutput(lines) {
    document.getElementById("output").textContent = lines.join("\n");
}

function showSystemExample() {
    var now = new Date();
    var lines = [
        "Demo-Ausgabe",
        "------------",
        "Computername: Beispiel-PC",
        "Benutzer: Lernkonto",
        "Zeitpunkt: " + now.toLocaleString("de-DE"),
        "Quelle: JavaScript aus script.js"
    ];

    writeOutput(lines);
}

function showGitExercise() {
    var lines = [
        "Git-Uebung",
        "----------",
        "1. Aendere eine Farbe in styles.css.",
        "2. Speichere die Datei.",
        "3. Pruefe: git status",
        "4. Stage: git add docs/",
        "5. Committe: git commit -m \"Update dashboard styles\""
    ];

    writeOutput(lines);
}

function clearOutput() {
    writeOutput(["Bereit."]);
}

function loadProjectData() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            var lines = [
                "Projekt-Daten aus data.json",
                "============================",
                "",
                "Projekt: " + data.projekt.name,
                "Beschreibung: " + data.projekt.beschreibung,
                "Version: " + data.projekt.version,
                "",
                "Statistiken:",
                "  Commits gesamt: " + data.stats.commits_gesamt,
                "  Branches: " + data.stats.branches,
                "  Contributors: " + data.stats.contributors,
                "  Aufgaben: " + data.stats.aufgaben,
                "",
                "Neueste Commits:",
                "-----------------"
            ];

            data.commits.forEach(function(commit) {
                lines.push("  " + commit.id + " - " + commit.nachricht);
                lines.push("    Autor: " + commit.autor + " (" + commit.datum + ")");
            });

            lines.push("");
            lines.push("Diese Daten werden vom Browser aus data.json geladen.");
            lines.push("Das zeigt: HTML/JS ist nicht nur statisch!");

            writeOutput(lines);
        })
        .catch(error => {
            writeOutput([
                "Fehler beim Laden von data.json:",
                error.message,
                "",
                "Stelle sicher, dass die Datei im gleichen Verzeichnis ist."
            ]);
        });
}
