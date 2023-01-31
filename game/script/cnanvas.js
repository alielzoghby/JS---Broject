const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 560;

////////////////////////DOM ELEMENT//////////////////////

const lives = document.querySelector(".live");
const gameSco = document.querySelectorAll(".scoreValue");

///////////////////////SOUND////////////////////////////
let playsound = true;

const BRICK_HIT = new Audio();
BRICK_HIT.src = "../assets/sounds/brick_hit.mp3";

const WALL_HIT = new Audio();
WALL_HIT.src = "../assets/sounds/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "../assets/sounds/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "../assets/sounds/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "../assets/sounds/win.mp3";

///////////////////////Winner&Loser/////////////////////////

const loser = document.getElementById("loser");
const winner = document.getElementById("winner");
var playAgain = document.getElementById("playAgain");

///////////////////////VARIABLES///////////////////////////

let level = 1;
let level_max = 6;
let leftArrow = false;
let rightArrow = false;
let kickBall = false;
let startgame = 0;
let LIFE = 3;
let gameScore = 0;
let PADDEL_WIDTH = 120;
const PADDEL_HEIGHT = 20;
const PADDEL_MARGIN_BATTOM = 30;

//

const BALL_RADIUS = 9;

let bricks = [];
let colors = ["blue", "yellow", "red", "gray", "blue", "yellow", "red"];
let rowCount = 1;
let colCount = Math.floor((canvas.offsetWidth - 160) / 80);
let offsetTop = 13;
let offsetLeft = 12;
let numBricks = 0;
let yellowBrick;
let blueBrick;
let redBrick;
let grayBrick;
let shpball;

var endGame = false;

/////////////////////////////////////////////////////bounus////////////////////////
let luck = 3;
let allPower = [
  "../assets/img/power/width.png",
  "../assets/img/power/balls.png",
  "../assets/img/power/width.png",
  "../assets/img/power/width.png",
  "../assets/img/power/heart.png",
  "../assets/img/power/balls.png",
  "../assets/img/power/width.png",
  "../assets/img/power/width.png",
];
let numb;
let arrBou = [];
let baddelWidthFlag = false;
let ti;

////////////////////////////////////////////////////////////////////////////////////

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
  speed: 5,
  dx: 5 * (Math.random() * 2 - 1),
  dy: -5,
};

let balls = [ball];

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
}, 500);

canvas.addEventListener("click", () => {
  kickBall = true;
});

function drawPaddel() {
  if (startgame == 1) {
    ctx.fillStyle = "#444e67";
    ctx.fillRect(paddel.x, paddel.y, paddel.width, paddel.height);
    ctx.strokeStyle = "#8ba0ff";
    ctx.strokeRect(paddel.x, paddel.y, paddel.width, paddel.height);
  }
}

function shapeBAll() {
  shpball = new Image(12, 12);
  shpball.src = "../assets/img/balls/pngwing.com (1).png";
}
shapeBAll();

function drawBall() {
  if (startgame == 1) {
    balls.forEach((e) => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#8ba0ff";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
      ctx.drawImage(shpball, e.x - 10, e.y - 10);
    });
  }
}

function movePandde() {
  if (leftArrow && paddel.x > 0) paddel.x -= paddel.dx;
  else if (rightArrow && paddel.x + paddel.width < canvas.width)
    paddel.x += paddel.dx;
}

function moveBall() {
  balls.forEach((e) => {
    if (kickBall) {
      e.x += e.dx;
      e.y += e.dy;
    } else {
      e.x = paddel.x + paddel.width / 2;
    }
  });
}

function restBall() {
  balls = [
    {
      x: canvas.width / 2,
      y: paddel.y - BALL_RADIUS,
      radius: BALL_RADIUS,
      speed: 6,
      dx: 6 * (Math.random() * 2 - 1),
      dy: -6,
    },
  ];

  kickBall = false;
}

function restPanddel() {
  paddel.x = canvas.width / 2 - PADDEL_WIDTH / 2;
  paddel.y = canvas.height - PADDEL_HEIGHT - PADDEL_MARGIN_BATTOM;
}

//////////////////////////////////////////////////////////////////////breaks

function initialize() {
  if (startgame == 1) {
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
        if (brick.color === "gray") brick.status = 3;
        else numBricks += 1;
        bricks[c][r] = brick;
      }
    }
  }
}

function blue() {
  blueBrick = new Image();
  blueBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  blueBrick.src = "../assets/img/breaks/blue.png";
}
function yellow() {
  yellowBrick = new Image();
  yellowBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  yellowBrick.src = "../assets/img/breaks/yellow.png";
}

function red() {
  redBrick = new Image();
  redBrick.onload = function () {
    setInterval(function () {
      drawBricks();
    }, 1000 / 30);
  };
  redBrick.src = "../assets/img/breaks/red.png";
}

// draw bricks
function drawBricks() {
  if (startgame == 1) {
    for (var c = 0; c < colCount; c++) {
      for (var r = 0; r < rowCount; r++) {
        var brick = bricks[c][r];
        if (brick.status == 2 || brick.status == 1 || brick.status == 3) {
          brick.x = c * (brick.width + brick.padding) + offsetLeft;
          brick.y = r * (brick.height + brick.padding) + offsetTop;
          if (brick.color === "blue") {
            if (brick.status == 1) {
              ctx.drawImage(blueBrick, brick.x, brick.y);
            } else {
              drawRect("#1d31ce", "#001bff", brick.x, brick.y);
            }
          } else if (brick.color === "yellow") {
            if (brick.status == 1) {
              ctx.drawImage(yellowBrick, brick.x, brick.y);
            } else {
              drawRect("#F7fb26", "#Fff100", brick.x, brick.y);
            }
          } else if (brick.color === "red") {
            if (brick.status == 1) {
              ctx.drawImage(redBrick, brick.x, brick.y);
            } else {
              drawRect("#Be2528", "#Ff0005", brick.x, brick.y);
            }
          } else if (brick.color === "gray") {
            if (brick.status == 3) {
              drawRect("#454545", "#454545", brick.x, brick.y);
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
}

function drawRect(color, border, xx, yy) {
  let w = 79;
  let h = 39;
  let x = xx + 15;
  let y = yy + 15;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.stroke();
}

blue();

yellow();

red();

///////////////////////COLLISION FUNCTIONS////////////////////////////

function ballWallCollision() {
  balls.forEach((e, i) => {
    if (e.x + e.radius > canvas.width || e.x - e.radius < 0) {
      e.dx *= -1;
      if (playsound) WALL_HIT.play();
    }
    if (e.y - e.radius < 0) {
      e.dy *= -1;
      if (playsound) WALL_HIT.play();
    }
    if (e.y + e.radius > canvas.height) {
      balls.splice(i, 1);
      if (balls.length == 0) {
        if (playsound) LIFE_LOST.play();
        LIFE--;
        paddel.width = 120;
        restBall();
        restPanddel();

        if (LIFE <= 0) {
          lose();
        }
      }
    }
  });
}

function ballPaddelCollision() {
  balls.forEach((e) => {
    if (
      e.x < paddel.x + paddel.width &&
      e.x > paddel.x &&
      e.y + e.radius < paddel.y + paddel.height &&
      e.y + e.radius > paddel.y
    ) {
      if (playsound) PADDLE_HIT.play();
      let collidePoint = e.x - (paddel.x + paddel.width / 2);
      collidePoint = collidePoint / (paddel.width / 2);
      let angel = (collidePoint * Math.PI) / 3;
      e.dx = e.speed * Math.sin(angel);
      e.dy = -e.speed * Math.cos(angel);
    }
  });
}

function ballBrickCollision() {
  balls.forEach((e) => {
    for (var c = 0; c < colCount; c++) {
      for (var r = 0; r < rowCount; r++) {
        var brick = bricks[c][r];
        if (brick.status == 1 || brick.status == 2 || brick.status == 3) {
          if (
            e.x + e.radius > brick.x &&
            e.x - e.radius < brick.x + brick.width &&
            e.y + e.radius > brick.y &&
            e.y - e.radius < brick.y + brick.height
          ) {
            if (e.x < brick.x || e.x > brick.x + brick.width) {
              e.dx *= -1;
            } else {
              e.dy *= -1;
            }
            if (playsound) BRICK_HIT.play();
            if (brick.status === 3) return;
            if (brick.status == 1) numBricks -= 1;
            brick.status -= 1;
            gameScore += 10;
            if (brick.status == 0) {
              generatePowers(brick);
            }
          }
        }
      }
    }
  });
}

////////////////////////
function resetGame() {
  restBall();
  restPanddel();
  drawBricks();
  LIFE = 3;
  gameScore = 0;
  paddel.width = 120;
  numBricks = 0;
  clearInterval(ti);
  initialize();
}

function restScore() {
  gameSco.forEach((e) => (e.textContent = gameScore));
  lives.textContent = LIFE;
}

function draw() {
  drawPaddel();
  drawBall();
  drawBricks();
}
function update() {
  if (startgame == 1) {
    movePandde();
    moveBall();
    ballWallCollision();
    ballPaddelCollision();
    ballBrickCollision();
    win();
    lose();
    powerPaddelCollision();
    restScore();
    dropPower();
    movePower();
  }
}
function loop() {
  if (endGame === true) {
    requestAnimationFrame(loop);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
  }
}

initialize();
loop();

function restart() {
  window.location.href = "./canvas.html";
}

function goToHome() {
  window.location.href = "../index.html";
}

function GoToNextLevel() {
  winner.style.display = "none";
  document.body.classList.remove("back");
  endGame = false;
  let islevelDone = true;
  for (let c = 0; c < colCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      islevelDone = islevelDone && bricks[c][r].status != 2;
    }
  }
  if (islevelDone) {
    if (level > level_max) {
      endGame = true;
      return;
    }
    rowCount++;
    ball.speed += 0.5;
    level++;
    restBall();
    restPanddel();
    initialize();
    clearInterval(ti);
    paddel.width = 120;
    arrBou.length=0;
  }
}
function lose() {
  if (LIFE <= 0) {
    endGame = true;
    loser.style.display = "block";
    document.body.classList.add("back");
  }
}

function win() {
  if (numBricks === 0) {
    endGame = true;
    winner.style.display = "block";
    document.body.classList.add("back");
  }
}

// //////////////////////////////Bouns/////////////////////////////////

function generatePowers(brick) {
  numb = Math.floor(Math.random() * luck);
  if (numb === luck - 1) {
    let increseBall = new Image();
    increseBall.src = allPower[Math.floor(Math.random() * 8)];
    brick.img = increseBall;
    brick.dy = 3;
    arrBou.push(brick);
    dropPower();
  }
}

function dropPower() {
  if (kickBall && gameScore != 0) {
    arrBou.forEach((e) => {
      ctx.drawImage(e.img, e.x + 44, e.y + 55);
    });
  }
}

function movePower() {
  arrBou.forEach((e) => {
    e.y += e.dy;
  });
}