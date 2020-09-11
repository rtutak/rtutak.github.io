const imageHandler = document.querySelector(".imageMyself");
const navHandler = document.querySelector(".options");
const overlayHandler = document.querySelector(".overlayNav");
const hamburgerHandler = document.querySelector(".hamburger");
const exitOverlayHandler = document.querySelector(".exitOverlay");
const liHandler = document.querySelectorAll(".overlayNav li");

window.addEventListener("load", () => {
  document.querySelector(".loadingContainer").classList.add("hidden");

  var textWrapper = document.querySelector(".letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: false })
    .add({
      targets: ".line",
      translateX: [
        0,
        document.querySelector(".letters").getBoundingClientRect().width + 10,
      ],
      easing: "easeOutExpo",
      duration: 1000,
      delay: 1000,
    })
    .add({
      targets: ".letter",
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: "-=775",
      delay: (el, i) => 34 * (i + 1),
    });
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
