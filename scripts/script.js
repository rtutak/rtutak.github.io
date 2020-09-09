const imageHandler = document.querySelector(".imageMyself");
const navHandler = document.querySelector(".options");
const overlayHandler = document.querySelector(".overlayNav");
const hamburgerHandler = document.querySelector(".hamburger");
const exitOverlayHandler = document.querySelector(".exitOverlay");
const liHandler = document.querySelectorAll(".overlayNav li");

window.addEventListener("load", () => {
  document.querySelector(".loadingContainer").classList.add("hidden");
});

overlayToggle = () => {
  let status = window
    .getComputedStyle(overlayHandler)
    .getPropertyValue("display");

  status = "none"
    ? (overlayHandler.style.display = "block")
    : (overlayHandler.style.display = "none");
};
exitOverlay = () => {
  overlayHandler.style.display = "none";
};
hamburgerHandler.addEventListener("click", () => {
  overlayToggle();
});
exitOverlayHandler.addEventListener("click", () => {
  exitOverlay();
});
//loop through li elements in overlay nav
for (let i = 0; i < liHandler.length; i++) {
  liHandler[i].addEventListener("click", () => {
    exitOverlay();
  });
}
