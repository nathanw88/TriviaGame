$("#question-container").hide();
$("#result-container").hide();
var counterLimit;
var counter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer;
var timerRunning = false;
var timerInterval;
var result;
var choiceCategory = "";

function startOver() {
  counter = 0;
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  $("#question-container").hide();
  $("#result-container").hide();
  $("#start-container").show();
  $("#restart").off("click");
}
function endGame() {
  clearInterval(timerInterval);
  timerRunning = false;
  $("#question-container").hide();
  $("#result-container").show();
  $("#restart").show();
  $("#result").text(`Game over!`);
  $("#correct").text(`Correct answers: ${correct}`);
  $("#incorrect").text(`Incorrect answers: ${incorrect}`);
  $("#unanswered").text(`unanswered: ${unanswered}`);
  $("#restart").on("click", function(event) {
    startOver();
  });
}

function timesOut() {
  clearInterval(timerInterval);
  timerRunning = false;
  $("#question-container").hide();
  $("#result-container").show();
  $("#restart").hide();
  $("#result").text(`Time's out!`);
  $("#correct").text(`Correct answers: ${correct}`);
  $("#incorrect").text(`Incorrect answers: ${incorrect}`);
  $("#unanswered").text(`unanswered: ${unanswered}`);
  setTimeout(newQuestion, 5000);
}

function correctGuess() {
  clearInterval(timerInterval);
  timerRunning = false;
  $("#question-container").hide();
  $("#result-container").show();
  $("#restart").hide();
  $("#result").text(`Correct answer!`);
  $("#correct").text(`Correct answers: ${correct}`);
  $("#incorrect").text(`Incorrect answers: ${incorrect}`);
  $("#unanswered").text(`unanswered: ${unanswered}`);

  setTimeout(newQuestion, 5000);
}

function incorrectGuess() {
  clearInterval(timerInterval);
  timerRunning = false;
  $("#question-container").hide();
  $("#result-container").show();
  $("#restart").hide();
  $("#result").text(`Incorrect answer!`);
  $("#correct").text(`Correct answers: ${correct}`);
  $("#incorrect").text(`Incorrect answers: ${incorrect}`);
  $("#unanswered").text(`unanswered: ${unanswered}`);
  setTimeout(newQuestion, 5000);
}

function newQuestion() {
  // console.log("hi");
  timer = 30;
  var queryURL = `https://opentdb.com/api.php?amount=10&category=${choiceCategory}&type=multiple`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    $("#answer1").attr("data-answer", "wrong");
    $("#answer2").attr("data-answer", "wrong");
    $("#answer3").attr("data-answer", "wrong");
    $("#answer4").attr("data-answer", "wrong");
    $(".answer").off("click");
    $(".answer").off("mouseenter");
    $(".answer").off("mouseleave");
    $("#result-container").hide();
    $("#start-container").hide();
    $("#question-container").show();
    counterLimit = data.results.length;
    // console.log(data);
    var rightAnswer = data.results[counter].correct_answer;
    var wrongAnswer1 = data.results[counter].incorrect_answers[0];
    var wrongAnswer2 = data.results[counter].incorrect_answers[1];
    var wrongAnswer3 = data.results[counter].incorrect_answers[2];
    var randomNum = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    // console.log(randomNum);

    switch (randomNum) {
      case 0:
        $("#answer1").attr("data-answer", "right");
        $("#answer1").text(rightAnswer);
        $("#answer2").text(wrongAnswer1);
        $("#answer3").text(wrongAnswer2);
        $("#answer4").text(wrongAnswer3);
        break;
      case 1:
        $("#answer2").attr("data-answer", "right");
        $("#answer1").text(wrongAnswer1);
        $("#answer2").text(rightAnswer);
        $("#answer3").text(wrongAnswer2);
        $("#answer4").text(wrongAnswer3);
        break;
      case 2:
        $("#answer3").attr("data-answer", "right");
        $("#answer1").text(wrongAnswer2);
        $("#answer2").text(wrongAnswer1);
        $("#answer3").text(rightAnswer);
        $("#answer4").text(wrongAnswer3);
        break;
      case 3:
        $("#answer4").attr("data-answer", "right");
        $("#answer1").text(wrongAnswer3);
        $("#answer2").text(wrongAnswer1);
        $("#answer3").text(wrongAnswer2);
        $("#answer4").text(rightAnswer);
        break;
    }
    $("#timer").text(`Time remaining: 30`);
    $("#question").text(`Question: ${data.results[counter].question}`);

    if (!timerRunning) {
      timerInterval = setInterval(timerCount, 1000);
      timerRunning = true;
    }

    $(".answer").on("mouseenter", function() {
      $(this).addClass("button");
    });

    $(".answer").on("mouseleave", function() {
      $(this).removeClass("button");
      // console.log($(this));
    });

    $(".answer").on("click", function(event) {
      console.log("data:" + $(this).data("answer"));
      console.log("attr:" + $(this).attr("data-answer"));
      var answer = $(this).attr("data-answer");
      // console.log($(this).attr("id"));
      if (answer === "right") {
        counter++;
        correct++;
        if (counter < counterLimit) {
          correctGuess();
        } else {
          endGame();
        }
      } else {
        counter++;
        incorrect++;
        if (counter < counterLimit) {
          incorrectGuess();
        } else {
          endGame();
        }
      }
    });
    function timerCount() {
      timer--;
      $("#timer").text(`Time remaining: ${timer}`);
      if (timer === 0) {
        counter++;
        unanswered++;
        if (counter < counterLimit) {
          timesOut();
        } else {
          endGame();
        }
      }
    }
  });
}

$(".start").on("click", function() {
  console.log($(this).attr("id"));
  choiceCategory = $(this).attr("id");

  // console.log("works");
  newQuestion();
});
