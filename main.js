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

/** @type {HTMLButtonElement | null} */
const copyButton = document.querySelector(".copy-button");
if (copyButton) {
  const email = copyButton.dataset.email ?? "";
  /** @type {HTMLElement} */
  const tooltip = copyButton.querySelector(".tooltip");
  /** @type {HTMLElement} */
  const copyStatus = document.querySelector(".copy-status");
  /** @type {number | undefined} */
  let resetTimer;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard refused: open the mail app instead.
      window.location.href = `mailto:${email}`;
      return;
    }

    tooltip.textContent = "Copied!";
    copyButton.classList.add("is-copied");
    copyStatus.textContent = "Email address copied";

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      tooltip.textContent = "Copy email";
      copyButton.classList.remove("is-copied");
      copyStatus.textContent = "";
    }, 1500);
  });
}
