const ulElement = document.querySelector(".section__highscores__list__ul");
const highScoresButton = document.querySelector(
  ".contaniner__highscores__button"
);
const sectionHighscores = document.querySelector(".section__highscores__list");
const hiddenMsg = document.querySelector(".section__highscores__hiddenMsg");

function showHighScores() {
  toggleHighScoresButton();
  const highScoresLS = JSON.parse(localStorage.getItem("highScores")) || [];
  if (highScoresLS.length == 0) {
    hiddenMsg.style.visibility = "visible";
    sectionHighscores.style.visibility = "hidden";
    highScoresButton.innerHTML = "Show highscores";
    //info text on the bottom dissapear after 2secs
    setTimeout(() => {
      hiddenMsg.style.visibility = "hidden";
    }, 2000);
  } else {
    //map through array from localStorage containing best times and render them as <li> element
    ulElement.innerHTML = highScoresLS
      .map((score, index) => {
        return `<li class="highScore">${
          index + 1
        }<span class="arrow"></span><span class="score">${score} s</span></li>`;
      })
      .join("");
    //refresh
    let container = ulElement;
    let content = container.innerHTML;
    container.innerHTML = content;
  }
}

function toggleHighScoresButton() {
  if (sectionHighscores.style.visibility === "hidden") {
    gsap.from(".section__highscores__list", { opacity: 0, duration: 1.2 });
    sectionHighscores.style.visibility = "visible";
    highScoresButton.innerHTML = "Hide highscores";
  } else {
    sectionHighscores.style.visibility = "hidden";
    highScoresButton.innerHTML = "Show highscores";
  }
}
highScoresButton.addEventListener("click", showHighScores);
window.addEventListener("load", showHighScores);
