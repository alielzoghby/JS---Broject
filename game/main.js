const menu = document.querySelector(".nav");
const div = document.createElement("div");
const pause = document.createElement("div");
const score = document.createElement("div");
const icon = document.createElement("div");
const mainMenu = document.createElement("i");
const sound = document.createElement("i");
const mute = document.createElement("i");
const reset = document.createElement("i");
const anc = document.createElement("a");
const go = document.createElement("i");
const BG = document.querySelector("audio");
BG.volume = 0.2;

menu.onclick = function () {
  ///new div
  div.classList.add("menu");

  //pause
  pause.innerHTML = "PAUSE";
  div.appendChild(pause);

  //score
  score.innerHTML = `YOUR SCORE<span class="scoreValue">${gameScore}</span>`;
  div.appendChild(score);

  //icons

  //icon 1
  anc.href = "../index.html";
  mainMenu.classList.add("fa-solid", "fa-bars");
  anc.appendChild(mainMenu);
  icon.appendChild(anc);

  //icon 2
  sound.classList.add("fa-solid", "fa-music");

  mute.classList.add("fa-solid", "fa-volume-xmark");

  //event icon 2 sound
  sound.onclick = function () {
    icon.replaceChild(mute, sound);
    BG.pause();
    playsound = false;
  };
  mute.onclick = function () {
    icon.replaceChild(sound, mute);
    BG.play();
    playsound = true;
  };

  if (playsound) {
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
    glag = 1;
  };

  // add all icons
  div.appendChild(icon);

  document.body.classList.add("back");
  document.body.appendChild(div);
};
