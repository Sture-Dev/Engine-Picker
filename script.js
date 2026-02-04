const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
let currentQuestion = 0;

function load() {
    initScores();
    showWelcome(questions[currentQuestion]);
}

// Create skip button
const skipButton = document.createElement("button");
skipButton.id = "skip_button";
skipButton.type = "button";
skipButton.textContent = "Skip";
skipButton.addEventListener("click", nextQuestion);

// Create restart button
const resetButton = document.createElement("button");
resetButton.id = "reset_button";
resetButton.type = "button";
resetButton.textContent = "Reset";
resetButton.addEventListener("click", reset);
function showWelcome(){
    const holder = document.getElementById("form_holder");
    const template = document.getElementById("welcome_page");

    holder.replaceChildren(template.content.cloneNode(true));
}

function reset() {
    currentQuestion = 0;
    initScores();
    showQuestion(questions[currentQuestion]);
}

function showQuestion(id) {
    const holder = document.getElementById("form_holder");
    const template = document.getElementById(id);

    holder.replaceChildren(template.content.cloneNode(true));
    const radioDiv = document.getElementById("radio_div");
    const optionCount = radioDiv.querySelectorAll('input[type="radio"]').length;

    if (optionCount > 4) {
        radioDiv.classList.add("two-columns");
    }
    holder.appendChild(skipButton);


}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
    } else {
        showResult();
    }
}


// Scores -----
const ENGINES = ["unity", "unreal", "godot", "bevy", "pico8", "custom"];

const ENGINE_DESCRIPTIONS = {
    unity: {
        title: "Unity",
        description: "The classic middle ground. Unity offers powerful built-in tools, a massive community with unlimited tutorials, and C# which is relatively easy to learn if you already know some programming. It’s more than capable for most indie games even in 3D, and is a very safe, versatile choice. If you want to learn something that’s actually used by real game studios, Unity is a solid and practical choice."
    },

    unreal: {
        title: "Unreal Engine",
        description: "You are ready to take the next step. Unreal is a heavyweight engine built for stunning visuals and large-scale projects. It rewards developers who are comfortable with programming and willing to invest time into mastering a complex toolset. Ideal if you want top-tier graphics and performance or looking to become a AAA developer."
    },

    godot: {
        title: "Godot",
        description: "If you want to create really capable games but don’t fancy complex coding or heavyweight tools, Godot is an excellent choice. It’s lightweight, flexible, and especially strong for 2D games, while still being powerful enough for many 3D projects. A great engine for learning and long-term growth. Its fast-growing community means more tutorials, better docs, and lots of ways to learn."
    },

    bevy: {
        title: "Bevy",
        description: "You like Rust don't you? Bevy is a modern, code-first engine built around Rust and ECS principles. It's exciting and powerful if you enjoy systems programming and full control, but it expects you to be comfortable working closer to the hardware."
    },

    pico8: {
        title: "PICO-8",
        description: "You want to dip your toes into game dev? Amazing! PICO-8 is a fun tool focused on creativity with limitations. It's perfect for beginners or anyone who wants fast, fun results. It encourages simple ideas, strong design, and learning by doing."
    },

    custom: {
        title: "Custom Engine",
        description: "You clearly know what you're doing, a custom engine is for developers who want total control. Building your own engine can make sense if you have very specific requirements for performance, want to experiment, or publish on unusual platforms. It’s challenging and time-consuming, but deeply rewarding."
    }
};

function showResult() {
    const scores = getScores();

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const [winner, winnerScore] = sorted[0];
    const [runnerUp] = sorted[1];

    const result = ENGINE_DESCRIPTIONS[winner];
    const holder = document.getElementById("form_holder");
    holder.innerHTML = `
    <h2>Your Top Pick</h2>
    <h1>${result.title}</h1>
    <p>${result.description}</p>
    <h2>Alternative</h2>
    <h1>${ENGINE_DESCRIPTIONS[runnerUp].title}</h1>
    <p>${ENGINE_DESCRIPTIONS[runnerUp].description}</p>
`;
    holder.appendChild(resetButton);
    const disclaimerTitle = document.createElement("h2");
    disclaimerTitle.id = "disclaimer";
    disclaimerTitle.textContent = "Disclaimer";

    const disclaimerText = document.createElement("p");
    disclaimerText.textContent =
        "This is an opinionated tool, not a rulebook. It’s meant to give you a good starting point. Thanks for checking in!";

    holder.appendChild(disclaimerTitle);
    holder.appendChild(disclaimerText);
}

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
            bevy: 1,
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
    if (form.all.checked) {
        updateScores({
            custom: 1,
            unreal: 1,
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
        updateScores({ unreal: 2, custom: 2, bevy: 1, unity: 2, });
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
        updateScores({ godot: 3, unity: 2 });
    }

    if (form.medium.checked) {
        updateScores({ unity: 3, godot: 1, unreal: 1 });
    }

    if (form.big.checked) {
        updateScores({ unreal: 3, custom: 2, pico8: -3 });
    }

    nextQuestion();
}

function frustration(form) {
    if (form.engine.checked) {
        updateScores({ custom: 2, });
    }

    if (form.control.checked) {
        updateScores({ custom: 3, bevy: 1 });
    }

    if (form.performance.checked) {
        updateScores({ unreal: 2, custom: 2 });
    }

    if (form.boilerplate.checked) {
        updateScores({ unity: 2, godot: 2, pico8: 2 });
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

function showEmail() {
  const emailSpan = document.getElementById("email");
  const button = document.getElementById("contact_button");

  emailSpan.textContent = "contact.sture@gmail.com";
  emailSpan.style.display = "block";
  button.style.display = "none";
}