var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function() {
  if (!gameStarted) {
    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
})

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  showPattern();
}

function showPattern(){
  //Time in milliseconds between animations of buttons
  var interval = 800;

  gamePattern.forEach(function (element, index){
    setTimeout(function(){
      $("#" + element).fadeOut(200).fadeIn(200);
      playSound(element);
      console.log(element);
    }, index * interval);
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  gameStarted = false;
}

function gameOver() {
  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(() => {
    $("body").toggleClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

function playSound(name) {
  var audioSample = new Audio("sounds/" + name + ".mp3");
  audioSample.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}
