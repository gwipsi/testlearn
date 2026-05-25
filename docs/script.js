function setActiveButton(button) {
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });
    button.classList.add("active");
}

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

function updateLastModifiedTime() {
    fetch("data.json")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.lastUpdated) {
                var lastUpdateDate = new Date(data.lastUpdated);
                var now = new Date();
                var minutesDiff = Math.floor((now - lastUpdateDate) / (1000 * 60));

                var timeString = lastUpdateDate.toLocaleString("de-DE");
                var relativeTime;

                if (minutesDiff === 0) {
                    relativeTime = "gerade eben";
                } else if (minutesDiff === 1) {
                    relativeTime = "vor 1 Minute";
                } else if (minutesDiff < 60) {
                    relativeTime = "vor " + minutesDiff + " Minuten";
                } else if (minutesDiff < 1440) {
                    var hours = Math.floor(minutesDiff / 60);
                    relativeTime = "vor " + hours + " Stunden";
                } else {
                    var days = Math.floor(minutesDiff / 1440);
                    relativeTime = "vor " + days + " Tagen";
                }

                var timestampEl = document.getElementById("last-updated");
                if (timestampEl) {
                    timestampEl.textContent = "⏱ Letztes Update: " + timeString + " (" + relativeTime + ")";
                }
            }
        })
        .catch(function(error) {
            var timestampEl = document.getElementById("last-updated");
            if (timestampEl) {
                timestampEl.textContent = "⏱ Zeitstempel nicht verfügbar";
            }
            console.error("Fehler beim Laden des Zeitstempels:", error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    updateLastModifiedTime();

    var buttons = document.querySelectorAll(".button-row button");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            setActiveButton(this);
        });
    });
});
