const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", starGame);

function starGame() {
  //   game.fillRect(100, 25, 100, 100);
  //   game.clearRect(120, 45, 60, 60);
  //   game.font = "15px Verdana";
  //   game.fillStyle = "purple";
  //   game.textAlign = "left";
  //   game.fillText("Platzi", 130, 80);
  let canvasSize;
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  const elementSize = canvasSize / 10;

  game.font = elementSize + "px Verdana";
  game.textAlign = "";

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis["X"], elementSize * i, elementSize);
  }
}
