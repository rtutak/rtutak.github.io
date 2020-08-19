const buttonHighscores = document.querySelector(
  ".contaniner__highscores__button"
);

const timeline = gsap.timeline({ defaults: { duration: 1.2 } });

timeline
  .from(".container__logo__text", { opacity: 0, y: -100 })
  .from(".container__logo__stars", {
    y: -100,
    ease: "bounce",
  });

// function gsapAnimation() {
//   gsap.from(".container__logo__stars", {
//     duration: 1.5,
//     y: -100,
//     ease: "bounce",
//   });
// }
