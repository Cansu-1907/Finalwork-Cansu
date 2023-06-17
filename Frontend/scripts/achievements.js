import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl, getFrontendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
} else {
  window.location.href = `${getFrontendBaseUrl()}/pages/unauthorized.html`;
}

const achievementsItemsContainer = document.getElementById(
  "achievements-items-container"
);

const userData = await fetch(`${getBackendBaseUrl()}/user/stats`, {
  method: "GET",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    alert("Something went wrong.");
  }
});

console.log(userData);

const achievements = await fetch(`${getBackendBaseUrl()}/achievements`, {
  method: "GET",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((response) => {
  if (response.status == 200) {
    return response.json();
  } else {
    alert("Something went wrong.");
  }
});

renderAchievements(achievements, achievementsItemsContainer, userData);

function renderAchievements(data, container, userData) {
  let achievementString = "";
  data.forEach((achievement) => {
    let isAchievementCompleted = false;

    if (
      achievement.conditions.some(
        (condition) =>
          condition.type === "Save to gallery" &&
          userData.savedToGallery >= condition.value
      ) ||
      achievement.conditions.some(
        (condition) =>
          condition.type === "Save to device" &&
          userData.savedToDevice >= condition.value
      ) ||
      achievement.conditions.some(
        (condition) =>
          condition.type === "Watch tutorial(s)" &&
          userData.tutorialsWatched >= condition.value
      )
    ) {
      isAchievementCompleted = true;
    }

    achievementString += `
      <div class="achievements-grid-item ${
        achievement.backgroundColor
      }-achievement">
        <div class="achievements-grid-item-img-container ${
          achievement.backgroundColor
        }-achievement-trophy">
          <img src="../images/trophy-${achievement.trophy}.png" />
        </div>
        <div class="achievements-grid-item-information-container">
          <div class="achievements-grid-item-information-subcontainer">
            <h2>${achievement.achievementName}</h2>
            <p>${achievement.description}</p>
          </div>
          ${
            isAchievementCompleted
              ? '<div class="achievements-grid-item-done-container"><img src="../images/done.png" /></div>'
              : ""
          }
        </div>
      </div>
    `;
  });

  container.innerHTML = achievementString;
}
