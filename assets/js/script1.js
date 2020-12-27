var highScores = [{
    name: "bot",
    score: 0
}, {
    name: "bot",
    score: 0
}, {
    name: "bot",
    score: 0
}];
var first = highScores[0];
var second = highScores[1];
var third = highScores[2];
var timer = 59;
var time = document.getElementById("time");
var score = 0;
var round = 0;
var objID = Math.random();
var arrayLooper = 0;
var inputForm = document.querySelector("#inputForm");
var viewHS = document.querySelector("#viewHS");
var startEl = document.querySelector("#start");
var choiceBox = document.querySelector("#choiceBox");
var A = document.querySelector("#A");
var B = document.querySelector("#B");
var C = document.querySelector("#C");
var D = document.querySelector("#D");
var results = document.querySelector(".results");
var answerChk = document.querySelector("#wrong");
var questionEl = document.querySelector("#question");
var questionBoxP = document.querySelector("#questionBoxP");
var tryAgain = document.querySelector("#tryAgain");
var questions = [{
    question: "What does 'HTML' stand for?",
    choices: [
        "hypertext markup language",
        "hella tight meta language",
        "how to meet ladies",
        "holy toledo machine learning"
    ],
    answer: "A"
}, {
    question: "What does 'CSS' stand for?",
    choices: [
        "Crazy Stylish Script",
        "Cascading Style Sheet",
        "Collection of Stackoverflow Snippets",
        "Competitive Selector Syntax"
    ],
    answer: "B"
}, {
    question: "In Javascript, arrays can be used to store _____.",
    choices: [
        "Strings",
        "Booleans",
        "Other Arrays",
        "All of the above"
    ],
    answer: "D"
}];

var timeDown = function () {
    time.textContent = "Time: " + timer;
    timer--;
    if (timer < 0) {
        clearInterval(startCount);
        time.textContent = "Times Up!"
        gameOver();
    }
}

var startCount = function () {
    setInterval(timeDown, 1000);
}

var startGame = function () {
    document.querySelector("#questionBoxP").innerHTML = "";
    startEl.remove();
    answerChk.textContent = "";
    startCount();
    questionCycle();
}

var questionCycle = function () {
    A.textContent = "";
    B.textContent = "";
    C.textContent = "";
    D.textContent = "";
    if (round > 2) {
        gameOver();
    } else {
        question(questions[round]);
    }
}

var question = function (a) {
    questionEl.textContent = a.question;

    A.className = "choices";
    var choiceA = document.createElement("p");
    choiceA.textContent = a.choices[0];
    A.appendChild(choiceA);

    B.className = "choices";
    var choiceB = document.createElement("p");
    choiceB.textContent = a.choices[1];
    B.appendChild(choiceB);

    C.className = "choices";
    var choiceC = document.createElement("p");
    choiceC.textContent = a.choices[2];
    C.appendChild(choiceC);

    D.className = "choices";
    var choiceD = document.createElement("p");
    choiceD.textContent = a.choices[3];
    D.appendChild(choiceD);

    questionHandler(a)
}

var questionHandler = function (correctA) {
    A.onclick = function (A) {
        userChoice("A");
    }
    B.onclick = function (B) {
        userChoice("B");
    }
    C.onclick = function (C) {
        userChoice("C");
    }
    D.onclick = function (D) {
        userChoice("D");
    }
    var correctChoice = correctA.answer;

    var userChoice = function (X) {
        if (X === correctChoice) {
            correct();
        } else {
            incorrect();
        }
    }

}

var correct = function () {
    round++;
    score += 5;
    timer = timer + 5;
    answerChk.textContent = "Correct! Score: " + score;
    setTimeout(function () {
        answerChk.textContent = "";
    }, 1500);
    questionCycle();
}

var incorrect = function () {
    round++;
    score--;
    timer = timer - 5;
    answerChk.textContent = "Incorrect! Score: " + score;
    setTimeout(function () {
        answerChk.textContent = "";
    }, 2000);
    questionCycle();
}

var gameOver = function () {
    time.remove();
    questionEl.textContent = "Game Over!"
    choiceBox.innerHTML = "<form id='inputForm'><input class='initials' id='initials' placeholder='Your Initials'><button class='btn' type='submit'>OK</button></form>";
}

viewHS.onclick = function () {
    showScores();
}

var scoreInput = function () {
    highScores = JSON.parse(localStorage.getItem("user"));
    var myHS = {};
    myHS.name = document.querySelector("input").value;
    myHS.score = score;
    myHS.id = objID;
    console.log(highScores[0]);
    saveScore();
    showScores()
}

var saveScore = function () {
    localStorage.setItem("user", JSON.stringify(highScores));
}
var showScores = function () {
    event.preventDefault();
    viewHS.remove();
    questionBoxP.textContent = "";
    answerChk.textContent = "";
    choiceBox.innerHTML = "";
    questionEl.textContent = "High Scores";
    var highScore = JSON.parse(localStorage.getItem("user"));
    // for (var i = 0; i < 3; i++) {
    //     var previousScores = document.createElement("p");
    //     previousScores.innerHTML = highScore[i].name;
    //     choiceBox.appendChild(previousScores);
    // }

    setTimeout(function () {
        tryAgain.className = "choices";
        var choiceA = document.createElement("p");
        choiceA.textContent = "Try Again";
        tryAgain.appendChild(choiceA);
    }, 4000);

}
tryAgain.onclick = function () {
    location.reload();
}

choiceBox.addEventListener("submit", scoreInput);
startEl.addEventListener("click", startGame);