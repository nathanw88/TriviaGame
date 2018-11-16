var counter = 0;
function start() {
  var queryurl =
    "https://opentdb.com/api.php?amount=10&category=19&type=multiple";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    newQuestion();
  });
}
function ranChoice(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$("#start").on("click", function() {
  start();
});

function newQuestion() {
  $(".inner-container").empty;
  var newP = $("<p id='timer'>time remaining</p>");
  newP.append(`<p> Question: ${response.results[counter].question} </p`);

  newP.append(`<h3 class="answer" id="answer-1">${answer1}</h3>`);
  newP.append(`<h3 class="answer" id="answer-2">${answer2}</h3>`);
  newP.append(`<h3 class="answer" id="answer-3">${answer3}</h3>`);
  newP.append(`<h3 class="answer" id="answer-4">${answer4}</h3>`);
}
