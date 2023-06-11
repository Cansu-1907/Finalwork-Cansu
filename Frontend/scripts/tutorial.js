import canvas from "./canvas.js";
import popup from "./popup.js";
import { isAuthenticated, hasRole } from "./authHelpers.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
} else {
  window.location.href = "http://127.0.0.1:5500/pages/unauthorized.html";
}

canvas("tutorialPage");
popup();

const tutorialName = sessionStorage.getItem("pressedTutorialName");
const tutorialVideo = sessionStorage.getItem("pressedTutorialVideo");
const tutorialH1Container = document.getElementById("tutorial-h1-container");
const tutorialVideoContainer = document.getElementById(
  "tutorial-video-container"
);

tutorialH1Container.innerHTML = `<h1>${tutorialName}</h1>`;
tutorialVideoContainer.innerHTML = `
<iframe src="${tutorialVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`;
