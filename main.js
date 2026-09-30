// @ts-check
const savedTheme = localStorage.getItem("theme");
/** @type {NodeListOf<HTMLButtonElement>} */
const themeButtons = document.querySelectorAll(".theme-button");

[...themeButtons].forEach((button) => {
  if (savedTheme) {
    button.ariaPressed =
      button.dataset.themeChoice === savedTheme ? "true" : "false";
  }

  button.addEventListener("click", function () {
    const theme = button.dataset.themeChoice;

    if (!theme) return;

    [...themeButtons].forEach((b) => (b.ariaPressed = "false"));
    localStorage.setItem("theme", theme);
    button.ariaPressed = "true";
    document.documentElement.dataset.theme = theme;
  });
});

const isReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const videos = document.querySelectorAll("video");
if (!isReducedMotion) {
  [...videos].forEach((video) => video.play().catch(() => {}));
}
