function start() {
  var queryurl =
    "https://opentdb.com/api.php?amount=10&category=19&type=multiple";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    <p id="timer">time remaining</p>
      var newDiv = $("<div>");
  //         <p>Question?</p>
  //         <br />
  //         <br />
  //         <section class="answer" id="answer-1">answer</section>
  //         <br />
  //         <section class="answer" id="answer-2">answer</section>
  //         <br />
  //         <section class="answer" id="answer-3">answer</section>
  //         <br />
  //         <section class="answer" id="answer-4">answer</section>
  // });
}
$("#start").on("click", function() {

  start();
});
