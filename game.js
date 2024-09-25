// alert("jai hind!");

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;

  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 3);
  let randomColorChosen = buttonColors[randomNumber];

  gamePattern.push(randomColorChosen);

  $(`#${randomColorChosen}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColorChosen);
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //   console.log(userClickedPattern);
});
