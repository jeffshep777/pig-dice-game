// challenge three with some custom changes

var scores, roundScore, activePlayer, gamePlaying;

init();


// roll button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {

    //1.random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    //2.display the result
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";

    var diceDomTwo = document.querySelector(".diceTwo");
    diceDomTwo.style.display = "block";
    diceDomTwo.src = "dice-" + diceTwo + ".png";


    // 3. update the round score if the rolled number was not doubles
    if (dice === diceTwo) {
      // player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    }  else {
      roundScore += (dice + diceTwo);
      document.querySelector("#current-" + activePlayer).textContent = roundScore;

    }

  }
});


// hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI to reflect score
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".diceTwo").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});


// next player function
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".diceTwo").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".diceTwo").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
