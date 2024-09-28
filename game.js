let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

//Keypress to check if the game started or not
$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

//Click responses
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//Main driving function of the game
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomColorChosen = buttonColors[randomNumber];
  // console.log(randomColorChosen);
  gamePattern.push(randomColorChosen);
  $(`#${randomColorChosen}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColorChosen);
}

//Adds sound to the button clicks
function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

//Adds animation to the buttons
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

//Checks whether the user entered pattern and game's pattern matches
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("yes");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Resets the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
