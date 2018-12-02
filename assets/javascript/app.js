//hiding the container for questions
$("#question-container").hide();
//hiding the container for end results
$("#result-container").hide();
//hiding the container for showing if you answered right or wrong.
$("#answered-container").hide();
//setting up variables
//to be set to the length of the data pulled so the game knows when to end
var counterLimit;
//to keep track of how many questions have been asked to know when to stop
var counter = 0;
//keeps track of correct answers
var correct = 0;
//keeps track of incorrect answers
var incorrect = 0;
// keeps track of number of times timer ran out
var unanswered = 0;
// setting up the timer
var timer;
// keeps track of if timer is running
var timerRunning = false;
// stores timer intergar value so it can be stopped
var timerInterval;
//stores choice of quiz you want play
var choiceCategory = "";
// object set up to hold the data from the api
var info = {};
//function to restart the game
function startOver() {
  // reset all variables
  counter = 0;
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  // hide containers that are not needed
  $("#question-container").hide();
  $("#result-container").hide();
  $("#answered-container").hide();
  // shows the starting container
  $("#start-container").show();
  //turning off on click event handler
  $("#restart").off("click");
}
// function for the end of the game
function endGame() {
  //stopping the timer
  clearInterval(timerInterval);
  //setting the timer running var to off
  timerRunning = false;
  // showing correct container
  $("#answered-container").hide();
  $("#question-container").hide();
  $("#result-container").show();
  // printing to screen the number of correct guesses
  $("#correct").text(`Correct answers: ${correct}`);
  //printing to screen the number of incorrect guesses
  $("#incorrect").text(`Incorrect answers: ${incorrect}`);
  //printing to screen number of unanswered guestions
  $("#unanswered").text(`unanswered: ${unanswered}`);
  // setting up on click even handler
  $("#restart").on("click", function(event) {
    //calling the startOver function
    startOver();
  });
}
// setting the function for when timer runs out
function timesOut() {
  // stops timer
  clearInterval(timerInterval);
  // sets timer running to false
  timerRunning = false;
  // console.log(info.results[counter - 1].correct_answer);
  //showing correct container
  $("#question-container").hide();
  $("#answered-container").show();
  $("#right-answer").show();
  //printing time's up to screen
  $("#result").text(`Time's up!`);
  //printing the right answer to screen
  $("#right-answer").text(
    `Right answer: ${info.results[counter - 1].correct_answer}`
  );
  // setting source to relative image path
  $("img").attr("src", "assets/images/times-up.jpg");
  //settting the alt text to time's up
  $("img").attr("alt", "Times up!");
  //checks if we have answered the last question
  if (counter < counterLimit) {
    // if questions remain brings up new question
    setTimeout(newQuestion, 4000);
  } else {
    //if last question goes to the end
    setTimeout(endGame, 4000);
  }
}
// setting the function for when you guess correct
function correctGuess() {
  //stopping timer
  clearInterval(timerInterval);
  //sets timer to stopped
  timerRunning = false;
  // show needed containers
  $("#right-answer").hide();
  $("#question-container").hide();
  $("#answered-container").show();
  //print to screen that answer was right
  $("#result").text(`Correct!`);
  //setting source of of img to relative path of a picture
  $("img").attr("src", "assets/images/right-answer.jpg");
  $("img").attr("alt", "Right!");
  //check if there are questions remaining
  if (counter < counterLimit) {
    // if questions remain brings up new question
    setTimeout(newQuestion, 4000);
  } else {
    //if last question goes to the end
    setTimeout(endGame, 4000);
  }
}
// setting up function for incorrect guess
function incorrectGuess() {
  clearInterval(timerInterval);
  timerRunning = false;
  $("#question-container").hide();
  $("#answered-container").show();
  $("#right-answer").show();
  $("#result").text(`Wrong!`);
  $("#right-answer").text(
    `Right answer: ${info.results[counter - 1].correct_answer}`
  );
  $("img").attr("src", "assets/images/tenor.gif");
  $("img").attr("alt", "Wrong!");
  //checks if questions remain
  if (counter < counterLimit) {
    // if questions remain brings up new question
    setTimeout(newQuestion, 4000);
  } else {
    //if last question goes to the end
    setTimeout(endGame, 4000);
  }
}
// function for grabbing data
function getData() {
  // console.log("hi");
  //setting url for query placing in the player choice for category
  var queryURL = `https://opentdb.com/api.php?amount=10&category=${choiceCategory}&type=multiple`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    // putting data into a object so i can use it outside of this function
    info = data;
    //setting the counter limit to the number of questions in data
    counterLimit = info.results.length;
    //calling the newQuestion function to put up a question
    newQuestion();
  });
}
//setting up function for for going to a question
function newQuestion() {
  //setting timer to 30 seconds
  timer = 30;
  // console.log(info.results[counter].correct_answer);
  //setting all answers to wrong
  $("#answer1").attr("data-answer", "wrong");
  $("#answer2").attr("data-answer", "wrong");
  $("#answer3").attr("data-answer", "wrong");
  $("#answer4").attr("data-answer", "wrong");
  //making sure all on event listeners are off
  $(".answer").off("click");
  $(".answer").off("mouseenter");
  $(".answer").off("mouseleave");
  //showing correct container
  $("#result-container").hide();
  $("#start-container").hide();
  $("#answered-container").hide();
  $("#question-container").show();

  // console.log(data);
  //setting answers to variables
  var rightAnswer = info.results[counter].correct_answer;
  var wrongAnswer1 = info.results[counter].incorrect_answers[0];
  var wrongAnswer2 = info.results[counter].incorrect_answers[1];
  var wrongAnswer3 = info.results[counter].incorrect_answers[2];
  // creating a random number
  var randomNum = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  // console.log(randomNum);
  //using that random number to to put correct answer in random answer spot
  //printing to screen all answers
  switch (randomNum) {
    case 0:
      //setting data-answer answer 1 to right to refrence later
      $("#answer1").attr("data-answer", "right");
      $("#answer1").html(rightAnswer);
      $("#answer2").html(wrongAnswer1);
      $("#answer3").html(wrongAnswer2);
      $("#answer4").html(wrongAnswer3);
      break;
    case 1:
      $("#answer2").attr("data-answer", "right");
      $("#answer1").html(wrongAnswer1);
      $("#answer2").html(rightAnswer);
      $("#answer3").html(wrongAnswer2);
      $("#answer4").html(wrongAnswer3);
      break;
    case 2:
      $("#answer3").attr("data-answer", "right");
      $("#answer1").html(wrongAnswer2);
      $("#answer2").html(wrongAnswer1);
      $("#answer3").html(rightAnswer);
      $("#answer4").html(wrongAnswer3);
      break;
    case 3:
      $("#answer4").attr("data-answer", "right");
      $("#answer1").html(wrongAnswer3);
      $("#answer2").html(wrongAnswer1);
      $("#answer3").html(wrongAnswer2);
      $("#answer4").html(rightAnswer);
      break;
  }
  // printing timer to screen
  $("#timer").text(`Time remaining: 30`);
  //printing question to screen
  $("#question").html(`Question: ${info.results[counter].question}`);
  // if timer is not running starts it
  if (!timerRunning) {
    /*setting timmer atergar value to a variable and refrencing the timer count function
     to call in 1 second*/
    timerInterval = setInterval(timerCount, 1000);
    // setting timer running to true
    timerRunning = true;
  }
  // setting up hover to change button to having a colored background
  $(".answer").on("mouseenter", function() {
    $(this).addClass("button");
  });
  // removing colored background
  $(".answer").on("mouseleave", function() {
    $(this).removeClass("button");
    // console.log($(this));
  });
  // on click event listener to watch for click on answers
  $(".answer").on("click", function(event) {
    console.log("data:" + $(this).data("answer"));
    console.log();
    console.log("attr:" + $(this).attr("data-answer"));
    // setting the answer var to capture if answer was right or wrong
    var answer = $(this).attr("data-answer");
    // console.log($(this).attr("id"));
    //checking if right
    if (answer === "right") {
      // incrementing the counter to for one question answered
      counter++;
      // incrementing  the number of correct answers
      correct++;

      //calls the function correctGuess
      correctGuess();
    }
    // if wrong answer was guessed
    else {
      //increments the number of question shown
      counter++;
      // increments the number of incorrect answers
      incorrect++;
      //calls the function incorrectGuess
      incorrectGuess();
    }
  });
  //creates the function timer count to decrement the timer
  function timerCount() {
    // decrement timer
    timer--;
    //prints to screen the remaining time left
    $("#timer").text(`Time remaining: ${timer}`);
    // checks if times up
    if (timer === 0) {
      //if so increments questions shown
      counter++;
      // increments unanswered questions
      unanswered++;
      // calls timesOut function
      timesOut();
    }
  }
}
// starts on click event listener  to watch for players choice of trivia
$(".start").on("click", function() {
  // console.log($(this).attr("id"));
  //sets the category choosen by player to use in url
  choiceCategory = $(this).attr("id");

  // console.log("works");
  //calls the getData function
  getData();
});
// console.log(info);
