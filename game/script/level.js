const lm = document.getElementById("lm");
const nav = document.getElementById("nav");
const btns = document.querySelectorAll(".btn");

btns.forEach((e) => {
  e.addEventListener("click", function () {
    lm.style.display = "none";
    nav.style.display = "flex";

    rowCount = this.attributes[2].value;
    level = this.attributes[3].value;
    ball.speed = this.attributes[4].value;

    startgame = 1;
    initialize();
  });
});
