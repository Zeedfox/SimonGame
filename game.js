var bottomColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var lose = false;

$(".btn").click(function (){ // user clicking the bottoms (event listener)
  if(level !== 0){
  var userChosenColour = this.id;
  animatePress(this.id);
  userClickedPattern.push(userChosenColour);
  checkPattern();
  console.log(lose + " " + level)
}
});


$(document).keypress(function (event){
  if(level === 0 ){
    $("#level-title").text("Level " + level);
    gamePattern.push(nextSequence());
  }
  else if (lose === true) {
    restartG();
    gamePattern.push(nextSequence());
  }
});


function nextSequence() { // random function that chose a different color and reproduces his respective sound
  level += 1;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor( Math.random()*4);
  var randomChosenColor  = bottomColours[randomNumber];
  animationButton(randomChosenColor);
  return randomChosenColor;
}

function animationButton(id){ // animation of the simon game pattern
  $("."+id).fadeOut(150).fadeIn(150);
  playSound(id);
}

function playSound(name){ // function that reproduces the sounds depending the bottom
  if(lose !== true){ // if the user didn't lose yet
  var fileDirectory = "sounds/"+name+".mp3";
  var buttonSound = new Audio(fileDirectory);
  buttonSound.play();
}
}

function animatePress(currentColour){ //click user bottoms animation
  playSound(currentColour);
  $("."+currentColour).addClass("pressed").delay(100).queue(function (){
    $("."+currentColour).removeClass("pressed").dequeue();
  });
}

function checkPattern(){
  var actualTry = userClickedPattern.length - 1;
  if(userClickedPattern[actualTry] === gamePattern[actualTry]){
    if(userClickedPattern.length  === gamePattern.length){
      userClickedPattern = [];
      setTimeout(function(){
        gamePattern.push(nextSequence());
        console.log("Waiting");
      },1000);
      console.log("done!");
    }
  }
  else{
    lose = true;
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("#level-title").html("GAME OVER<br/>Press any key to restart the Game.");
    $("body").addClass("game-over").delay(200).queue(function(){
      $("body").removeClass("game-over").dequeue();
    });
  }
}

function restartG(){
  lose = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  // $("body").removeClass("game-over");
  console.log("I got Restarted!!!!");
}
