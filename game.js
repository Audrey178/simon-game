buttonColors = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
var startGame = false;
var level = 0;
function nextSequence()
{
    level++;
    $("#level-title").text("Level " +level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click",function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    var idButton = "#" + currentColor;
    var button = $(idButton);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}



$(document).keypress(function()
{
    if(startGame === false)
    {
        startGame = true;
        nextSequence();
        $("h1").text("Level " + level);
    }
})

function checkAnswer(currentLevel)
{
  var lastIndex = userClickedPattern.length - 1;
  if(userClickedPattern[lastIndex] === gamePattern[lastIndex])
  {
        console.log("success");
        if(userClickedPattern.length === currentLevel)
            {
                setTimeout(nextSequence,1000);
                userClickedPattern = [];
            }
  }
  else
  {
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}




function startOver()
{
    level = 0;
    gamePattern = [];
    startGame = false;
    userClickedPattern = [];
}