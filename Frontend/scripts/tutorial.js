import canvas from "./canvas.js";
import popup from "./popup.js";
import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
  fetch(`${getBackendBaseUrl()}/user/stats/increment-tutorials-watched`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Tutorials watched incremented successfully!");
      } else {
        console.log("Something went wrong.");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("An error occurred. Please try again.");
    });
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
