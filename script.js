const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
let currentQuestion = 0;

function load() {
    initScores();
    showQuestion(questions[currentQuestion]);
}

function showQuestion(id) {
    const holder = document.getElementById("form_holder");
    const template = document.getElementById(id);

    holder.replaceChildren(template.content.cloneNode(true));
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
    } else {
        showResult();
    }
}
function showResult() {
    const scores = getScores();

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const [winner, winnerScore] = sorted[0];
    const [runnerUp] = sorted[1];

    document.getElementById("form_holder").innerHTML = `
    <h1>Recommended Engine</h1>
    <h2>${winner.toUpperCase()}</h2>
    <p>Second best fit: ${runnerUp}</p>
  `;
}

const ENGINES = ["unity", "unreal", "godot", "bevy", "pico8", "custom"];

function initScores() {
    const scores = {};
    ENGINES.forEach((engine) => (scores[engine] = 0));

    localStorage.setItem("engineScores", JSON.stringify(scores));
}

function getScores() {
    return JSON.parse(localStorage.getItem("engineScores"));
}

function saveScores(scores) {
    localStorage.setItem("engineScores", JSON.stringify(scores));
}

function updateScores(changes) {
    const scores = getScores();

    for (const engine in changes) {
        scores[engine] += changes[engine];
    }

    saveScores(scores);
}

function language(form) {
    if (form.python.checked) {
        updateScores({
            godot: 3,
            unity: 1,
            unreal: -2,
            bevy: 1,
        });
    }

    if (form.csharp.checked) {
        updateScores({
            unity: 3,
            godot: 1,
        });
    }

    if (form.cpp.checked) {
        updateScores({
            unreal: 3,
            custom: 2,
        });
    }

    if (form.rust.checked) {
        updateScores({
            bevy: 3,
            custom: 2,
        });
    }

    if (form.lua.checked) {
        updateScores({
            pico8: 3,
            godot: 2,
            unreal: -3,
        });
    }

    if (form.nolang.checked) {
        updateScores({
            pico8: 3,
            godot: 2,
            unity: 1,
            unreal: -3,
        });
    }

    nextQuestion();
}

function experience(form) {
    if (form.none.checked) {
        updateScores({ pico8: 3, godot: 2, unity: 1, unreal: -3 });
    }

    if (form.prototypes.checked) {
        updateScores({ godot: 2, unity: 2, pico8: 1 });
    }

    if (form.one.checked) {
        updateScores({ unity: 2, godot: 1, unreal: 1 });
    }

    if (form.many.checked) {
        updateScores({ unreal: 2, custom: 2, bevy: 1 });
    }

    nextQuestion();
}

function goal(form) {
    if (form.learn.checked) {
        updateScores({ pico8: 2, godot: 2, unity: 1 });
    }

    if (form.finish.checked) {
        updateScores({ godot: 3, unity: 2, pico8: 1 });
    }

    if (form.commercial.checked) {
        updateScores({ unity: 2, unreal: 2, custom: 1 });
    }

    if (form.experiment.checked) {
        updateScores({ bevy: 2, custom: 2, pico8: 1 });
    }

    nextQuestion();
}

function scope(form) {
    if (form.tiny.checked) {
        updateScores({ pico8: 3, godot: 2, unity: -1 });
    }

    if (form.small.checked) {
        updateScores({ godot: 2, unity: 2 });
    }

    if (form.medium.checked) {
        updateScores({ unity: 2, unreal: 1 });
    }

    if (form.big.checked) {
        updateScores({ unreal: 3, custom: 2, pico8: -3 });
    }

    nextQuestion();
}

function frustration(form) {
    if (form.engine.checked) {
        updateScores({ custom: 2, monogame: 1 });
    }

    if (form.control.checked) {
        updateScores({ custom: 3, bevy: 1 });
    }

    if (form.performance.checked) {
        updateScores({ unreal: 2, custom: 2 });
    }

    if (form.boilerplate.checked) {
        updateScores({ unity: 2, godot: 2 });
    }

    nextQuestion();
}

function priority(form) {
    if (form.speed.checked) {
        updateScores({ godot: 3, unity: 2, pico8: 1 });
    }

    if (form.visuals.checked) {
        updateScores({ unreal: 3, unity: 1 });
    }

    if (form.scale.checked) {
        updateScores({ unreal: 2, custom: 2 });
    }

    if (form.tech.checked) {
        updateScores({ custom: 3, bevy: 2 });
    }

    nextQuestion();
}

function stability(form) {
    if (form.stable.checked) {
        updateScores({ godot: 2, unity: 1, bevy: -3 });
    }

    if (form.minor.checked) {
        updateScores({ unity: 2, godot: 1 });
    }

    if (form.edge.checked) {
        updateScores({ bevy: 3, custom: 2 });
    }

    nextQuestion();
}

function learning(form) {
    if (form.docs.checked) {
        updateScores({ godot: 2, unity: 1 });
    }

    if (form.tutorials.checked) {
        updateScores({ unity: 3, godot: 2 });
    }

    if (form.source.checked) {
        updateScores({ custom: 3, bevy: 2 });
    }

    if (form.trial.checked) {
        updateScores({ pico8: 2, godot: 1 });
    }

    nextQuestion();
}
