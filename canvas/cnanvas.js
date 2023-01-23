const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width=900;
canvas.height=600;
///////////////////////////////////////////////////
const img = new Image()
img.src="../img/wp2572370.jpg";

let leftArrow = false ;
let rightArrow = false;
let kickBall = false;
let LIFE = 3;
const PADDEL_WIDTH = 120;
const PADDEL_HEIGHT = 20;
const PADDEL_MARGIN_BATTOM = 30;

const BALL_RADIUS = 10;

const paddel = 
{
    x : canvas.width/2 - PADDEL_WIDTH/2,
    y : canvas.height - PADDEL_HEIGHT - PADDEL_MARGIN_BATTOM,
    width : PADDEL_WIDTH,
    height : PADDEL_HEIGHT,
    dx : 5
}

const ball = {
    x : canvas.width/2,
    y : paddel.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 5,
    dx : 5 * (Math.random() * 2 - 1),
    dy : -5
}

document.addEventListener("keydown",function(event){
    if(event.keyCode==37)
        leftArrow=true;
    else if(event.keyCode==39)
        rightArrow=true;
    else if(event.keyCode==32)
        kickBall=true;
});

document.addEventListener("keyup",function(event){
    if(event.keyCode==37)
        leftArrow=false;
    else if(event.keyCode==39)
        rightArrow=false;
});


function drawPaddel(){
ctx.fillStyle = "#444e67";
ctx.fillRect(paddel.x,paddel.y,paddel.width,paddel.height);
ctx.strokeStyle= "#8ba0ff"; 
ctx.strokeRect(paddel.x,paddel.y,paddel.width,paddel.height);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle = "#8ba0ff";
    ctx.fill();
    ctx.strokeStyle= "#444e67"; 
    ctx.stroke();
    ctx.closePath();
}

function movePandde(){
    //if(kickBall)
    {
        if(leftArrow && paddel.x > 0)
            paddel.x-=paddel.dx;
        else if(rightArrow && paddel.x + paddel.width < canvas.width)
            paddel.x+=paddel.dx;
    }

}

function moveBall(){
    if(kickBall)
    {
        ball.x+=ball.dx;
        ball.y+=ball.dy;
    }
    else
    {
        ball.x=paddel.x+paddel.width/2;
    }
}

function ballWallCollision(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0)
        ball.dx *= -1;
    if(ball.y - ball.radius < 0)
        ball.dy *= -1;
    if(ball.y+ball.radius > canvas.height)
    {
        LIFE--;
        restBall();
        restPanddel();
    }
}

function restBall(){
    ball.x = canvas.width/2;
    ball.y = paddel.y - BALL_RADIUS;
    ball.dx = 5 * (Math.random() * 2 - 1);
    ball.dy = -5;
    kickBall=false;
}

function restPanddel(){
   paddel.x = canvas.width/2 - PADDEL_WIDTH/2;
   paddel.y = canvas.height - PADDEL_HEIGHT - PADDEL_MARGIN_BATTOM;
}

function ballPaddelCollision(){
    if(ball.x < paddel.x + paddel.width  && ball.x > paddel.x && 
       ball.y+ball.radius < paddel.y + paddel.height && ball.y+ball.radius > paddel.y)
    {
        let collidePoint = ball.x - (paddel.x + paddel.width/2)
        collidePoint = collidePoint / (paddel.width/2);
        let angel = collidePoint*Math.PI/3;
        ball.dx = ball.speed * Math.sin(angel);
        ball.dy = -ball.speed * Math.cos(angel);
    }

}
function draw(){
    drawPaddel();
    drawBall();
}

function update(){
    movePandde();
    moveBall();
    ballWallCollision();
    ballPaddelCollision();
}

function loop(){
    ctx.drawImage(img,0,0);
    draw();
    update();

    requestAnimationFrame(loop);
}

loop();
