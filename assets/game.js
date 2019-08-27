// Variables for scores

var rightChoice = 0;
var wrongChoice = 0;
var incomplete = 0;
var counter = 20;
var timerCountdown = document.getElementById("timer");
var displayResults = document.getElementById("triviaResults");
var displayQuestions = document.getElementById("triviaQuestions");

displayResults.style.display = "none";

function showResults() {
  displayQuestions.style.display = "none";
  displayResults.style.display  = "block";
}

// Timer set up
var timer = setTimeout(function() {
  showResults();
}, counter * 1000);

// Timer stop to display scores
var countdown = setInterval(function() {
  counter--;
  timerCountdown.innerHTML = counter;
  if (counter === 0) {
    stopCountdown();   
    showResults(); 
  }
}, 1000);

function stopCountdown() {
  clearInterval(countdown);
}

// Questions & Choices

var questions = [
  {
    question: "What color is Blossom?",
    answers: [
      "Green",
      "Blue",
      "Purple",
      "Pink"
    ]
  },
  {
    question: "Sugar, spice, and everything ____?",
    answers: [
      "Dope",
      "Ugly",
      "Nice",
      "Pink"
    ]
  },
  {
    question: "Who is one of the Power Puff Girls enemies?",
    answers: [
      "Mojo Jojo",
      "Zombies",
      "Pollution",
      "Ugly"
    ]
  },
  {
    question: "Blossom, Bubbles, & _________?",
    answers: [
      "Butterrie",
      "Butterpop",
      "Butterfly",
      "Buttercup"
    ]
  },
];

// Correct Answers
var rightAnswers = [
  "Pink",
  "Nice",
  "Mojo Jojo",
  "Buttercup"

];

// Display question & choices
for (var i = 0; i < questions.length; i++) {
  var question = questions[i];

  var sec = document.createElement("section");
  sec.className = "triviaQuestions--question q" + i;
  sec.innerHTML = `<p>${question.question}</p>`;
  document.getElementById("form").appendChild(sec);

  for (var j = 0; j < question.answers.length; j++) {

    var answer = question.answers[j];

    var div = document.createElement("div");
    var radioBtn = `<input type="radio" name="group${i}" value="${answer}">`
    div.innerHTML = radioBtn + " " + answer;

    document.querySelector(".q" + i).appendChild(div);
  }
}

// Update after submissions are made

var form = document.forms["form"];
form.addEventListener("submit", function(event) {
  event.preventDefault();
  stopCountdown();

  for (var i = 0; i < form.children.length; i++) {
    var found = "";

    for (var j = 0; j < form["group" + i].length; j++) {
      if (form["group" + i][j].checked) {
        found = form["group" + i][j].value;
      }
    }

    if (found === rightAnswers[i]) {
      rightChoice += 1;
      found = "";
    } else if (found === "") {
      incomplete += 1;
    } else {
      wrongChoice += 1;      
    }
  }

  document.getElementById("right").innerHTML = rightChoice;
  document.getElementById("wrong").innerHTML = wrongChoice;
  document.getElementById("blank").innerHTML = incomplete;

  showResults();
});
