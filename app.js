const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const timeEL = document.querySelector(".time");
const board = document.querySelector(".board");
const animals = [
  "./images/giraffe-svgrepo-com.svg",
  "./images/snake-svgrepo-com.svg",
  "./images/lion-svgrepo-com.svg",
  "./images/macaw-svgrepo-com.svg",
  "./images/rhinoceros-svgrepo-com.svg",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("time-btn")) {
    time = parseInt(evt.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains("animal")) {
    score++;
    evt.target.remove();
    createRandomAnimal();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomAnimal();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEL.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Счет: <span class = "primary" >${score}</span></h1>`;
  timeEL.parentNode.classList.add("hide");
}

function createRandomAnimal() {
  const animal = document.createElement("div");
  const size = getRandomNumber(40, 100);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const randomAnimal = getRandomAnimal();
  animal.classList.add("animal");
  animal.style.width = `${size}px`;
  animal.style.height = `${size}px`;
  animal.style.top = `${y}px`;
  animal.style.left = `${x}px`;
  animal.style.backgroundImage = `url(${randomAnimal})`;
  board.append(animal);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomAnimal() {
  const index = Math.floor(Math.random() * animals.length);
  return animals[index];
}
