const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 560;

////////////////////////DOM ELEMENT//////////////////////
const lives = document.querySelector(".live");
const gameSco = document.querySelector(".scoreValue");

///////////////////////IMAGE////////////////////////////
const img = new Image();
img.src = "../img/wp2572370.jpg";

///////////////////////SOUND////////////////////////////
let playsound = true;

const BRICK_HIT = new Audio();
BRICK_HIT.src = "assets/sounds/brick_hit.mp3";

const WALL_HIT = new Audio();
WALL_HIT.src = "assets/sounds/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "assets/sounds/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "assets/sounds/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "assets/sounds/win.mp3";

///////////////////////VARIABLES///////////////////////////
let level = 1;

let leftArrow = false;
let rightArrow = false;
let kickBall = false;
let LIFE = 5;
let gameScore = 0;
let PADDEL_WIDTH = 120;
const PADDEL_HEIGHT = 20;
const PADDEL_MARGIN_BATTOM = 30;

//

const BALL_RADIUS = 9;

let bricks = [];
let colors = ["blue", "yellow", "red"];
let rowCount = 4;
let colCount = Math.floor((canvas.offsetWidth - 160) / 80);
let offsetTop = 30;
let offsetLeft = 15;
let numBricks = 0;
let yellowBrick;
let blueBrick;
let redBrick;
let shpball;

const paddel = {
  x: canvas.width / 2 - PADDEL_WIDTH / 2,
  y: canvas.height - PADDEL_HEIGHT - PADDEL_MARGIN_BATTOM,
  width: PADDEL_WIDTH,
  height: PADDEL_HEIGHT,
  dx: 5,
};

const ball = {
  x: canvas.width / 2,
  y: paddel.y - BALL_RADIUS,
  radius: BALL_RADIUS,
  speed: 5 * level,
  dx: 5 * (Math.random() * 2 - 1) * level,
  dy: -5 * level,
};

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) leftArrow = true;
  else if (event.keyCode == 39) rightArrow = true;
  else if (event.keyCode == 32) kickBall = true;
});

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) leftArrow = false;
  else if (event.keyCode == 39) rightArrow = false;
});

setTimeout(() => {
  ["mousemove", "touchmove"].forEach((el) => {
    canvas.addEventListener(el, (e) => {
      paddel.x = e.clientX - 75;
    });
  });
}, 1000);
canvas.addEventListener("click", () => {
  kickBall = true;
});

// function shapePaddel() {
//   shpPaddel = new Image();
//   shpPaddel.src = "../—Pngtree—wooden board plant title box_5780929 (2).png";
// }
// shapePaddel();

function drawPaddel() {
  ctx.fillStyle = "#444e67";
  ctx.fillRect(paddel.x, paddel.y, paddel.width, paddel.height);
  ctx.strokeStyle = "#8ba0ff";
  ctx.strokeRect(paddel.x, paddel.y, paddel.width, paddel.height);
  // ctx.drawImage(shpPaddel, paddel.x, paddel.y);
}

function shapeBAll() {
  shpball = new Image(12, 12);
  shpball.src = "../pngwing.com (1).png";
}
shapeBAll();

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#8ba0ff";
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.closePath();
  ctx.drawImage(shpball, ball.x - 10, ball.y - 10);
}

function movePandde() {
  //if(kickBall)
  {
    if (leftArrow && paddel.x > 0) paddel.x -= paddel.dx;
    else if (rightArrow && paddel.x + paddel.width < canvas.width)
      paddel.x += paddel.dx;
  }
}
function moveBall() {
  if (kickBall) {
    ball.x += ball.dx;
    ball.y += ball.dy;
  } else {
    ball.x = paddel.x + paddel.width / 2;
  }
}

function ballWallCollision() {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
    if (playsound) WALL_HIT.play();
  }
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
    if (playsound) WALL_HIT.play();
  }
  if (ball.y + ball.radius > canvas.height) {
    if (playsound) LIFE_LOST.play();
    LIFE--;

    restBall();
    restPanddel();
    if (LIFE <= 0) {
      lose();
    }
  }
}

function restBall() {
  ball.x = canvas.width / 2;
  ball.y = paddel.y - BALL_RADIUS;
  ball.dx = 5 * (Math.random() * 2 - 1) * level;
  ball.dy = -5 * level;
  kickBall = false;
  ball.speed = 5 * level;
}

function restPanddel() {
  paddel.x = canvas.width / 2 - PADDEL_WIDTH / 2;
  paddel.y = canvas.height - PADDEL_HEIGHT - PADDEL_MARGIN_BATTOM;
}

function ballPaddelCollision() {
  if (
    ball.x < paddel.x + paddel.width &&
    ball.x > paddel.x &&
    ball.y + ball.radius < paddel.y + paddel.height &&
    ball.y + ball.radius > paddel.y
  ) {
    if (playsound) PADDLE_HIT.play();
    let collidePoint = ball.x - (paddel.x + paddel.width / 2);
    collidePoint = collidePoint / (paddel.width / 2);
    let angel = (collidePoint * Math.PI) / 3;
    ball.dx = ball.speed * Math.sin(angel);
    ball.dy = -ball.speed * Math.cos(angel);
  }
}

//////////////////////////////////////////////////////////////////////breaks

function initialize() {
  for (var c = 0; c < colCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < rowCount; r++) {
      var brick = {
        width: 80,
        height: 60,
        padding: 10,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        status: 2,
      };
      bricks[c][r] = brick;
      numBricks += 1;
    }
  }
}

// draw bricks
function drawBricks() {
  for (var c = 0; c < colCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      var brick = bricks[c][r];
      if (brick.status == 2 || brick.status == 1) {
        brick.x = c * (brick.width + brick.padding) + offsetLeft;
        brick.y = r * (brick.height + brick.padding) + offsetTop;
        if (brick.color === "blue") {
          if (brick.status == 1) {
            ctx.drawImage(blueBrick, brick.x, brick.y);
          } else {
            ctx.drawImage(blueBrick, brick.x, brick.y);
          }
        } else if (brick.color === "yellow") {
          if (brick.status == 1) {
            ctx.drawImage(yellowBrick, brick.x, brick.y);
          } else {
            ctx.drawImage(yellowBrick, brick.x, brick.y);
          }
        } else if (brick.color === "red") {
          if (brick.status == 1) {
            ctx.drawImage(redBrick, brick.x, brick.y);
          } else {
            ctx.drawImage(redBrick, brick.x, brick.y);
          }
        } else {
          roundedRect(
            ctx,
            brick.x,
            brick.y,
            brick.width,
            brick.height,
            2,
            brick.color
          );
        }
      }
    }
  }
}

///////////////////////COLLISION FUNCTIONS////////////////////////////

function ballWallCollision() {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
    if (playsound) WALL_HIT.play();
  }
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
    if (playsound) WALL_HIT.play();
  }
  if (ball.y + ball.radius > canvas.height) {
    LIFE--;
    if (playsound) LIFE_LOST.play();
    restBall();
    restPanddel();
  }
}

function blue() {
  blueBrick = new Image();
  blueBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  blueBrick.src = "../img/blue.png";
}

function yellow() {
  yellowBrick = new Image();
  yellowBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  yellowBrick.src = "../img/yellow.png";
}

function red() {
  redBrick = new Image();
  redBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  redBrick.src = "../img/red.png";
}

function ballPaddelCollision() {
  if (
    ball.x < paddel.x + paddel.width &&
    ball.x > paddel.x &&
    ball.y + ball.radius < paddel.y + paddel.height &&
    ball.y + ball.radius > paddel.y
  ) {
    if (playsound) PADDLE_HIT.play();
    let collidePoint = ball.x - (paddel.x + paddel.width / 2);
    collidePoint = collidePoint / (paddel.width / 2);
    let angel = (collidePoint * Math.PI) / 3;
    ball.dx = ball.speed * Math.sin(angel);
    ball.dy = -ball.speed * Math.cos(angel);
  }
}

function ballBrickCollision() {
  for (var c = 0; c < colCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      var brick = bricks[c][r];
      if (brick.status == 1 || brick.status == 2) {
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          if (playsound) BRICK_HIT.play();
          brick.status -= 1;
          ball.dy *= -1;
          gameScore += 10;
          numBricks -= 1;
          if (numBricks == 0) {
            win();
          }
        }
      }
    }
  }
}

initialize();

blue();

yellow();

red();

////////////////////////
function resetGame() {
  restBall();
  restPanddel();
  initialize();
  drawBricks();
  LIFE = 5;
  gameScore = 0;
}

function restScore() {
  gameSco.textContent = gameScore;
  lives.textContent = LIFE;
}

function draw() {
  drawPaddel();
  drawBall();
}
function update() {
  drawBricks();
  movePandde();
  moveBall();
  ballWallCollision();
  ballPaddelCollision();
  ballBrickCollision();
  restScore();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();

function lose() {}

function win() {}

// function baddelWidth{
//   setTimeout(() => {
//       paddel.width = 220;
//       console.log("first");
//       setTimeout(() => {
//         paddel.width = 120;
//         console.log("second");
//       }, 10000);
//     }, 0);
// }

// function lifeIncress() {
//   LIFE += 1;
// }
