var counter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var answer1;
var answer2;
var answer3;
var answer4;
function newQuestion() {
  var queryURL =
    "https://opentdb.com/api.php?amount=10&category=19&type=multiple";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    // console.log(data);
    rightAnswer = data.results[counter].correct_answer;
    wrongAnswer1 = data.results[counter].incorrect_answers[0];
    wrongAnswer2 = data.results[counter].incorrect_answers[1];
    wrongAnswer3 = data.results[counter].incorrect_answers[2];

    var randomNum = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    console.log(randomNum);
    $(".inner-container").empty();

    switch (randomNum) {
      case 0:
        answer1 = rightAnswer;
        answer2 = wrongAnswer1;
        answer3 = wrongAnswer2;
        answer4 = wrongAnswer3;
        break;
      case 1:
        answer1 = rightAnswer;
        answer2 = wrongAnswer1;
        answer3 = wrongAnswer2;
        answer4 = wrongAnswer3;
        break;
      case 2:
        answer1 = rightAnswer;
        answer2 = wrongAnswer1;
        answer3 = wrongAnswer2;
        answer4 = wrongAnswer3;
        break;
      case 3:
        answer1 = rightAnswer;
        answer2 = wrongAnswer1;
        answer3 = wrongAnswer2;
        answer4 = wrongAnswer3;
        break;
    }
    $(".inner-container").empty;
    var newP = $("<p id='timer'>time remaining</p>");
    newP.append(`<p> Question: ${data.results[counter].question} </p`);

    newP.append(`<h3 class="answer" id="answer-1">${answer1}</h3>`);
    newP.append(`<h3 class="answer" id="answer-2">${answer2}</h3>`);
    newP.append(`<h3 class="answer" id="answer-3">${answer3}</h3>`);
    newP.append(`<h3 class="answer" id="answer-4">${answer4}</h3>`);
    $(".inner-container").append(newP);

    counter++;
  });
}

$("#start").on("click", function() {
  newQuestion();
});

$(document).on("click", ".answer", function() {
  var answer = $(this).attr("id");
  switch (answer) {
    case rightAnswer:
      alert("correct");
      break;
    default:
      alert("wrong");
      break;
  }
});
