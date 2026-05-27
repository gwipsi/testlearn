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

function formatRelativeTime(date) {
    var minutesDiff = Math.floor((new Date() - date) / (1000 * 60));
    if (minutesDiff <= 0) {
        return "gerade eben";
    } else if (minutesDiff === 1) {
        return "vor 1 Minute";
    } else if (minutesDiff < 60) {
        return "vor " + minutesDiff + " Minuten";
    } else if (minutesDiff < 1440) {
        return "vor " + Math.floor(minutesDiff / 60) + " Stunden";
    }
    return "vor " + Math.floor(minutesDiff / 1440) + " Tagen";
}

// Holt das Datum des letzten Commits, der /docs/ geändert hat, direkt von GitHub.
// Kein committeter Zeitstempel mehr -> keine Merge-Konflikte in data.json.
function updateLastModifiedTime() {
    var apiUrl = "https://api.github.com/repos/gwipsi/testlearn/commits?path=docs&per_page=1";
    var timestampEl = document.getElementById("last-updated");

    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("GitHub API error, status: " + response.status);
            }
            return response.json();
        })
        .then(function(commits) {
            if (!commits.length) {
                throw new Error("Keine Commits gefunden");
            }
            var commitDate = new Date(commits[0].commit.committer.date);
            if (timestampEl) {
                timestampEl.textContent = "⏱ Letztes Update: "
                    + commitDate.toLocaleString("de-DE")
                    + " (" + formatRelativeTime(commitDate) + ")";
            }
        })
        .catch(function(error) {
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
