const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementSize;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10;
  starGame();
}

function starGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  for (let i = 1; i <= 10; i++) {
    for (let z = 1; z <= 10; z++) {
      game.fillText(emojis["X"], elementSize * i, elementSize * z);
    }
  }
}
