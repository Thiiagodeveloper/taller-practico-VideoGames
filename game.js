const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize; //tam de canvas
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPositon = {
  x: undefined,
  y: undefined,
};
let enemyPositons = [];

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
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //elementoSize = al tamano del canvas divido en 10, esto es para que el elemento o objeto sea proporcional al tamano del canvas
  elementSize = canvasSize / 10;
  startGame();
}
//function para conmenzar juego, renderizar mapa
function startGame() {
  //Tamano de elementos
  game.font = elementSize + "px Verdana"; // agregando el tamano el elemento
  game.textAlign = "end"; // aliniando el elemento en el canvas

  //mapa del juego
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  //Tiempo de Juego
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split("\n"); //Accediendo a las filas, donde eliminamos los elementos vacios y los saltos de linea
  const mapRowCols = mapRows.map((row) => row.trim().split("")); // creando un array bidimensional con los caracteres individuales
  console.log({ map, mapRows, mapRowCols });

  showLives();

  //limpiando el arreglo de enemigos para que no se dupliquen por moviemiento
  enemyPositons = [];
  //Limpiando Canvas
  game.clearRect(0, 0, canvasSize, canvasSize);

  //Recorriendo array multidimensional, de filas y columnas === index para obtener posiciones
  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);

      //Mos
      if (col == "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX / elementSize;
        playerPosition.y = posY / elementSize;
        console.log({ playerPosition });
      } else if (col == "I") {
        giftPositon.x = posX / elementSize;
        giftPositon.y = posY / elementSize;
      } else if (col == "X") {
        enemyPositons.push({
          x: posX / elementSize,
          y: posY / elementSize,
        });
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
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPositon.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPositon.y.toFixed(3);
  const gitfCollision = giftCollisionX && giftCollisionY;

  if (gitfCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositons.find((enemy) => {
    const enemyCollisonX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisonY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisonX && enemyCollisonY;
  });

  if (enemyCollision) {
    console.log("Chocaste con un enemigo");
    levelOver();
  }

  game.fillText(
    emojis["PLAYER"],
    playerPosition.x * elementSize,
    playerPosition.y * elementSize
  );
}
//PASANDO DE NIVEL
function levelWin() {
  console.log("Subiste de nivel");
  level++;
  startGame();
}
function levelOver() {
  console.log("Perdiste");
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function gameWin() {
  console.log("Terminaste El Juego");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "SUPERASTE EL RECORD";
    } else {
      pResult.innerHTML = "Lo sieto no superaste el record :(";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Primera vez?, Pero ahora trata de superar tu tiempo:)";
  }

  console.log({ recordTime, playerTime });
}

function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
  // const heartArray = Array(lives).fill(emojis["HEART"]); // [1,2,3]
  // console.log(heartArray);

  // spanLives.innerHTML = "";
  // heartArray.forEach((heart) => (spanLives.append = heart));
}
function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}
function moveBykeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  console.log("Arriba");
  if (playerPosition.y > 1) {
    playerPosition.y -= 1;
  } else {
    console.log("OUT");
  }
  startGame();
}
function moveLeft() {
  console.log("Izquierda");
  if (playerPosition.x > 1) {
    playerPosition.x -= 1;
  } else {
    console.log("OUT");
  }
  startGame();
}
function moveRight() {
  console.log("Derecha");
  if (playerPosition.x < 10) {
    playerPosition.x += 1;
  } else {
    console.log("OUT");
  }
  startGame();
}
function moveDown() {
  console.log("Abajo");
  if (playerPosition.y < 10) {
    playerPosition.y += 1;
  } else {
    console.log("OUT");
  }
  startGame();
}
//
