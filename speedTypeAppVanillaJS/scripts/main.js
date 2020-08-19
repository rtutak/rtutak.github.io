const startButton = document.querySelector(".container__start__button");
const timeSpan = document.querySelector(".container_time--value");
const progressSpan = document.querySelector(".container_progress--value");
const wordToMatch = document.querySelector(".container__textToMatch");
const userInput = document.querySelector("#container__inputText");
const timerContainer = document.querySelector(".container__time");
const highScoresList = document.querySelector(".section__highscores__list");
const inputLabel = document.querySelector(".label");
const highScoresButtonText = document.querySelector(
  ".contaniner__highscores__button"
);

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const arrayWithWords = [
  "active",
  "ambitious",
  "arrogant",
  "bitter",
  "brave",
  "bright",
  "calm",
  "carefree",
  "careless",
  "caring",
  "charming",
  "childish",
  "clever",
  "cooperative",
  "courageous",
  "creative",
  "cruel",
  "decisive",
  "determined",
  "direct",
  "disloyal",
  "distrustful",
  "naughty",
  "stubborn",
  "emotional",
  "nervous",
  "rude",
  "honest",
  "untidy",
  "energetic",
  "dutiful",
  "faithful",
  "truthful",
  "creative",
  "dilligent",
  "diplomatic",
  "discreet",
  "fearless",
  "forceful",
  "impartial",
  "inventive",
  "rational",
  "tough",
  "sensitive",
  "sociable",
  "witty",
  "warmhearted",
  "sympathetic",
  "sincere",
  "reserved",
  "romantic",
  "powerful",
  "patient",
  "passionate",
  "optimistic",
];
let userIsPlaying = false;
let progressCounter = 0;
let timerStart = 0;
let timeFinish = 0;
let timeInMilis = 0;
let timeInSeconds = 0;
const amountOfWordsToMatch = 10;

function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function gameStart() {
  resetValues();
  inputLabel.style.visibility = "visible";
  highScoresButtonText.innerHTML = "Show highscores";
  highScoresList.style.visibility = "hidden";
  timerStart = performance.now();
  startButton.style.visibility = "hidden";
  timerContainer.style.visibility = "hidden";
  userIsPlaying = true;
  userInput.focus();
  wordToMatch.innerHTML = getRandomWord(arrayWithWords);
  userInput.addEventListener("input", matchingFunction);
}
function resetValues() {
  progressCounter = 0;
  progressSpan.innerHTML = 0;
  userInput.disabled = false;
  userInput.value = "";
  timeSpan.innerHTML = "";
}
function matchingFunction() {
  if (matchWords()) {
    //if words match then
    progressCounter++;
    progressSpan.innerHTML = progressCounter;
    if (progressCounter >= amountOfWordsToMatch) {
      //time measurement finish
      timerFinish = performance.now();
      //calculate time in miliseconds then convert to seconds
      timeInMilis = (timerFinish - timerStart).toFixed(1);
      timeInSeconds = (timeInMilis / 1000).toFixed(2);
      let result = timeInSeconds;
      timeSpan.innerHTML = result;
      gameFinished();
    } else {
      userInput.value = "";
      wordToMatch.innerHTML = getRandomWord(arrayWithWords);
    }
  }
}

function gameFinished() {
  saveHighscore();
  inputLabel.style.visibility = "hidden";
  timerContainer.style.visibility = "visible";
  userIsPlaying = false;
  wordToMatch.innerHTML = "";
  startButton.innerHTML = "Try again!";
  startButton.style.visibility = "visible";
  startButton.addEventListener("click", gameStart);
  userInput.value = "";
  userInput.disabled = true;
}

function saveHighscore() {
  const recentScore = parseFloat(timeSpan.innerHTML);
  highScores.push(recentScore);
  //sort an array by the lowest time
  highScores.sort((a, b) => a - b);
  //array contain only 5 values
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function matchWords() {
  if (
    wordToMatch.innerHTML != "" &&
    wordToMatch.innerHTML === userInput.value
  ) {
    return true;
  } else {
    return false;
  }
}

if (userIsPlaying == false) {
  startButton.addEventListener("click", gameStart);
}
