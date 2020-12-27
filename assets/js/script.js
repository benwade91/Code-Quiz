var highScores = [];
var scoreHistory;
var timer = 59;
var countdown;
var time = document.getElementById("time");
var score = 0;
var round = 0;
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

var startCount = function () {
    countdown = setInterval(function () {
        time.textContent = "Time: " + timer;
        timer--;
        if (timer < 0) {
            time.textContent = "Times Up!"
            gameOver();
        }
    }, 1000);
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
    score += 3;
    timer = timer + 5;
    answerChk.textContent = "Correct! Score: " + score;
    setTimeout(function () {
        answerChk.textContent = "";
    }, 1500);
    questionCycle();
}

var incorrect = function () {
    round++;
    if (score >= 1) {
        score--;
    }
    timer = timer - 5;
    answerChk.textContent = "Incorrect! Score: " + score;
    setTimeout(function () {
        answerChk.textContent = "";
    }, 2000);
    questionCycle();
}

var gameOver = function () {
    clearInterval(countdown);
    time.remove();
    questionEl.textContent = "Game Over!"
    choiceBox.innerHTML = "<form id='inputForm'><input class='initials' id='initials' placeholder='Your Initials'><button class='btn' type='submit'>OK</button></form>";
}

var scoreInput = function () {
    event.preventDefault();
    var myHS = {};
    myHS.name = (document.querySelector("input").value);
    myHS.score = JSON.stringify(score);
    while (!myHS.name) {
        myHS.name = prompt("Whats your initials?");
    }
    saveScore(myHS);
    showScores()
}

var saveScore = function (myHS) {
    console.log(myHS);
    highScores.push(myHS);
    scoreHistory = JSON.parse(localStorage.getItem("user")) || [];
    myHS.score = parseInt(score);

    if (!scoreHistory[0]) {
        scoreHistory.push(myHS);
    } else if (!scoreHistory[1]) {
        if (scoreHistory[0].score <= myHS.score) {
            scoreHistory.unshift(myHS);
        } else {
            scoreHistory.push(myHS);
        }
    } else if (!scoreHistory[2]) {
        console.log(scoreHistory[0].score);
        if (scoreHistory[0].score <= myHS.score) {
            scoreHistory.unshift(myHS);
        } else if (scoreHistory[1].score <= myHS.score) {
            scoreHistory.splice(1, 0, myHS);
        } else {
            scoreHistory.push(myHS);
        }
    } else if (!scoreHistory[3] || myHS.score >= scoreHistory[3].score) {
        if (scoreHistory[0].score <= myHS.score) {
            scoreHistory.unshift(myHS);
            console.log("case 1");
        } else if (scoreHistory[1].score <= myHS.score) {
            scoreHistory.splice(1, 0, myHS);
            console.log("case 2");
        } else if (scoreHistory[2].score <= myHS.score) {
            scoreHistory.splice(2, 0, myHS);
            console.log("case 3");
        } else {
            console.log("no high score");
        }
        console.log("case 4");
    }
    localStorage.setItem("user", JSON.stringify(scoreHistory));


}

var showScores = function () {
    event.preventDefault();
    viewHS.remove();
    questionBoxP.textContent = "";
    answerChk.textContent = "";
    choiceBox.innerHTML = "";
    questionEl.textContent = "High Scores";
    scoreHistory = JSON.parse(localStorage.getItem("user"));
    for (var i = 0; i < scoreHistory.length && i < 3; i++) {
        var parsedObj = (scoreHistory[i]);
        var previousScores = document.createElement("p");
        choiceBox.className = "previousScores";
        previousScores.innerHTML = parsedObj.name + " " + parsedObj.score;
        choiceBox.appendChild(previousScores);
    }

    setTimeout(function () {
        tryAgain.className = "choices";
        var choiceA = document.createElement("p");
        choiceA.textContent = "Try Again";
        tryAgain.appendChild(choiceA);
    }, 4000);

}
var whosHighest = function () {
    scoreHistory = JSON.parse(scoreHistory[0])
    var first = {
        score: -10
    };
    var second = {
        score: -10
    };
    var third = {
        score: -10
    };
    for (i = 0; i < scoreHistory.length; i++) {
        if (scoreHistory[i].score >= first.score) {
            third = second;
            second = first;
            first = scoreHistory[i];
            console.log("firstplace");
        } else if (scoreHistory[i].score < first.score && scoreHistory[i].score >= second.score) {
            third = second;
            second = scoreHistory[i];
            console.log("secondplace");
        } else if (scoreHistory[i].score < second.score && scoreHistory[i].score >= third.score) {
            third = scoreHistory[i];
            console.log("third");
        } else {
            console.log("fourth?");
            console.log(scoreHistory[i].score);
        }
    }
}
tryAgain.onclick = function () {
    location.reload();
}
viewHS.onclick = function () {
    showScores();
}
choiceBox.addEventListener("submit", scoreInput);
startEl.addEventListener("click", startGame);