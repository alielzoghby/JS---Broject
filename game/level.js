const lm= document.getElementById("lm");
const btn1= document.getElementById("btn1");
btn1.addEventListener("click", (e) => {
   lm.style.display="none"; 
           rowCount=1;
        level=1;
        ball.speed=6;
startgame=1;
  initialize();



})


const btn2= document.getElementById("btn2");
btn2.addEventListener("click", (e) => {
    lm.style.display="none"; 
           rowCount=2;
        level=2;
        ball.speed=6.5;
        startgame=1;
  initialize();
})

const btn3= document.getElementById("btn3");
btn3.addEventListener("click", (e) => {
    lm.style.display="none"; 
           rowCount=3;
        level=3;
        ball.speed=7;
        startgame=1;
  initialize();
})

const btn4= document.getElementById("btn4");
btn4.addEventListener("click", (e) => {
    lm.style.display="none"; 
           rowCount=4;
        level=4;
        ball.speed=7.5;
        startgame=1;
  initialize();
})

const btn5= document.getElementById("btn5");
btn5.addEventListener("click", (e) => {
    lm.style.display="none"; 
           rowCount=5;
        level=5;
        ball.speed=8;
        startgame=1;
  initialize();
})

const btn6= document.getElementById("btn6");
btn6.addEventListener("click", (e) => {
    lm.style.display="none"; 
           rowCount=6;
        level=6;
        ball.speed=8.5;
        startgame=1;
  initialize();
})