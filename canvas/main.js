const gameSco = document.querySelector(".scoreValue");
const lives = document.querySelector(".live");
const menu = document.querySelector(".nav");
const music = document.querySelector("audio");
const div = document.createElement("div");
const pause = document.createElement("div");
const score = document.createElement("div");
const icon = document.createElement("div");
const mainMenu = document.createElement("i");
const sound = document.createElement("i");
const mute = document.createElement("i");
const reset = document.createElement("i");
const go = document.createElement("i");

let flagIcon = 1;
gameSco.textContent = gameScore;
lives.textContent = LIFE;

menu.onclick = function () {
  ///new div
  div.classList.add("new-menu");

  //pause
  pause.innerHTML = "PAUSE";
  div.appendChild(pause);

  //score
  score.innerHTML = `YOUR SCORE<span class="scoreValue">${gameScore}</span>`;
  div.appendChild(score);

  //icons

  //icon 1
  mainMenu.classList.add("fa-solid", "fa-bars");
  icon.appendChild(mainMenu);

  //icon 2
  sound.classList.add("fa-solid", "fa-music");

  mute.classList.add("fa-solid", "fa-volume-xmark");

  //event icon 2 sound
  sound.onclick = function () {
    icon.replaceChild(mute, sound);
    music.pause();
    flagIcon = 0;
  };
  mute.onclick = function () {
    icon.replaceChild(sound, mute);
    music.play();
    flagIcon = 1;
  };

  if (flagIcon) {
    icon.appendChild(sound);
  } else {
    icon.appendChild(mute);
  }

  //icon 3
  reset.classList.add("fa-solid", "fa-arrow-rotate-right");
  icon.appendChild(reset);

  reset.onclick = function () {
    resetGame();
    div.remove();
    document.body.classList.remove("back");
  };

  //icon 4

  go.classList.add("fa-solid", "fa-share");
  icon.appendChild(go);
  ///event icon 4 return to game
  go.onclick = () => {
    div.remove();
    document.body.classList.remove("back");
  };

  // add all icons
  div.appendChild(icon);

  document.body.classList.add("back");
  document.body.appendChild(div);
};
