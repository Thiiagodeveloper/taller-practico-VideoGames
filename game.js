const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", starGame);

function starGame() {
  game.fillRect(100, 25, 100, 100);
  game.clearRect(120, 45, 60, 60);
  game.font = "15px Verdana";
  game.fillStyle = "purple";
  game.textAlign = "left";
  game.fillText("Platzi", 130, 80);
}
