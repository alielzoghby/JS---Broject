const game = document.querySelector(".game");
const gameSpace = document.querySelector(".game-space");
const bord = document.querySelector(".bord");
const ball = document.querySelector(".ball");

class Bord {
  constructor() {
    let position = 0;
  }

  movmentBord() {
    window.addEventListener("mousemove", function (e) {
      this.position = e.offsetX;

      if (e.target.nodeName == "DIV") {
        bord.style.transform = "none";
        bord.style.right = `auto`;
        console.log(e.offsetX);
        if ((e.offsetX * 100) / innerWidth < 1) {
          bord.style.left = `0px`;
        } else if ((e.offsetX * 100) / innerWidth > 95) {
          bord.style.left = `auto`;
          bord.style.right = `0px`;
        } else {
          bord.style.left = `${this.position}px`;
        }
      }
    });
  }
}

const move = new Bord();
move.movmentBord();
