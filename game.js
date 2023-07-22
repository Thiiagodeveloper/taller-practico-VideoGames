const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize; //tamano de canvas
let elementSize;
const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener("keydown", moveBykeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

//Function para que el canvas sea responsive
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //elementoSize = al tamano del canvas divido en 10, esto es para que el elemento o objeto sea proporcional al tamano del canvas
  elementSize = canvasSize / 10;
  starGame();
}

//function para conmenzar juego, renderizar mapa
function starGame() {
  //Tamano de elementos
  game.font = elementSize + "px Verdana"; // agregando el tamano el elemento
  game.textAlign = "end"; // aliniando el elemento en el canvas

  //mapa del juego
  const map = maps[0];
  const mapRows = map.trim().split("\n"); //Accediendo a las filas, donde eliminamos los elementos vacios y los saltos de linea
  const mapRowCols = mapRows.map((row) => row.trim().split("")); // creando un array bidimensional con los caracteres individuales
  console.log({ map, mapRows, mapRowCols });

  game.clearRect(0, 0, canvasSize, canvasSize);

  //Recorriendo array multidimensional, de filas y columnas === index para obtener posiciones
  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);

      //Mos
      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ posX, posY, playerPosition });
        }
      }
      //Mostrando el emoji o elemento en su posicion
      game.fillText(emoji, posX, posY);
    });
  });
  //Mostrando el jugador
  movePlayer();
}
//MOVIMIENTOS DEL JUGADOR
function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function moveBykeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  console.log("Arriba");
  playerPosition.y -= elementSize;
  starGame();
}
function moveLeft() {
  console.log("Izquierda");
  playerPosition.x -= elementSize;
  starGame();
}
function moveRight() {
  console.log("Derecha");
  playerPosition.x += elementSize;
  starGame();
}
function moveDown() {
  playerPosition.y += elementSize;
  starGame();
}
//
