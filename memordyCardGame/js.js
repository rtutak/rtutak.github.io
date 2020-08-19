// Audio
const flipCardAudio = new Audio("sounds/cardFlipAudio.mp3");
const successAudio = new Audio("sounds/successAudio.mp3");
const unflipAudio = new Audio("sounds/unflipAudio.wav");
const endGameAudio = new Audio("sounds/endGameAudio.wav");

function audio(audioName) {
  audioName.pause();
  audioName.currentTime = 0;
  audioName.play();
}

const cards = document.querySelectorAll(".singleCard");
const starsHandler = document.querySelector(".starsIcons");
const overlayElement = document.getElementById("overlayBox");
const overlayVisibility = document.getElementById("overlay");
const movesHandler = document.getElementsByClassName("movesCount");
const timerDOM = document.getElementsByClassName("timer");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, bestScore;
let movesCounter = 0;
let matchedItems = 0;
let hasStarted = 0;
let timerStarted = 0;
let second = 1;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (!hasStarted) hasStarted = true;
  if (hasStarted && timerStarted == 0) {
    startTimer();
    timerStarted = 1;
  }
  this.classList.add("flip");
  if (!hasFlippedCard) {
    audio(flipCardAudio);
    hasFlippedCard = true;
    firstCard = this;
    //6 moves = game finished
    movesCounter++;
    return;
  }
  secondCard = this;
  audio(flipCardAudio);
  checkForMatch();
  updateMoves();
}

function checkForMatch() {
  //if isMatch = true
  let isMatch = firstCard.dataset.color === secondCard.dataset.color;
  if (isMatch) {
    audio(successAudio);
    disableCards();
    matchedItems++;
    if (matchedItems === 6) {
      //star rating based on movesCounter and time
      if (movesCounter < 20 && second < 40) {
        starsHandler.style.width = "100%";
      } else if (movesCounter < 20 && second > 40) {
        starsHandler.style.width = "80%";
      } else if (movesCounter > 20 && movesCounter < 30) {
        starsHandler.style.width = "60%";
      } else if (movesCounter > 30 && movesCounter < 40) {
        starsHandler.style.width = "40%";
      } else {
        starsHandler.style.width = "20%";
      }
      overlayOn();
      clearInterval(timerInterval);
    }
  } else {
    unflipCards();
  }
}

function updateMoves() {
  for (let i = 0; i < movesHandler.length; i++) {
    movesHandler[i].innerHTML = movesCounter;
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
// removing flip after
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
    audio(unflipAudio);
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}
function startTimer() {
  timerInterval = setInterval(() => {
    for (let i = 0; i < timerDOM.length; i++) {
      timerDOM[i].innerHTML = second + " secs";
    }
    second++;
  }, 1000);
}
function resetTimer() {
  clearInterval(timerInterval);
  for (let i = 0; i < timerDOM.length; i++) {
    timerDOM[i].innerHTML = "0 secs";
  }
  hasStarted = 0;
  timerStarted = 0;
  second = 1;
}

function overlayOn() {
  audio(endGameAudio);
  moveOverlay();
}

function moveOverlay() {
  let pos = 0;
  overlayVisibility.style.display = "flex";
  let id = setInterval(() => {
    if (pos == 20) {
      clearInterval(id);
    } else {
      pos += 1;
      overlayElement.style.top = `${pos}vh`;
    }
  }, 20);
}

//Event listeners
document.getElementById("rightSide").addEventListener("click", () => {
  overlayVisibility.style.display = "none";
  resetBoard();
  //shuffle();
  cards.forEach((el) => el.classList.remove("flip"));
  cards.forEach((card) => card.addEventListener("click", flipCard));
  movesCounter = 0;
  matchedItems = 0;
  updateMoves();
  resetTimer();
});

cards.forEach((card) => card.addEventListener("click", flipCard));
window.addEventListener("load", shuffle);
