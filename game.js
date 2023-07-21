const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", starGame);

function starGame() {
  //   game.fillRect(0, 0, 100, 100);
  //   game.clearRect(50, 50, 50, 50);
  //   game.clearRect();

  game.font = "25px Verdana";
  game.fillStyle = "purple";
  game.textAlign = "left";
  game.fillText("Platzi", 50, 50);
}
