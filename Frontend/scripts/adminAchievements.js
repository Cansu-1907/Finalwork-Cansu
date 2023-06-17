import logout from "./logout.js";
import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl, getFrontendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("Admin")) {
  console.log("logged");
} else {
  window.location.href = `${getFrontendBaseUrl()}/pages/unauthorized.html`;
}

const achievementsItemsContainer = document.getElementById(
  "achievements-items-container"
);

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

renderAchievements(achievements, achievementsItemsContainer);

function renderAchievements(data, container) {
  let achievementString = "";
  data.forEach((achievement) => {
    achievementString += `
    <div class="achievements-grid-item ${achievement.backgroundColor}-achievement">
          <div
            class="achievements-grid-item-img-container ${achievement.backgroundColor}-achievement-trophy"
          >
            <img src="../images/trophy-${achievement.trophy}.png" />
          </div>
          <div class="achievements-grid-item-information-container">
            <div class="achievements-grid-item-information-subcontainer">
              <h2>${achievement.achievementName}</h2>
              <p>${achievement.description}</p>
            </div>
            <div class="achievements-grid-item-done-container">
              <span
                class="material-icons admin-achievement-option-buttons" data-achievement-id="${achievement._id}" data-achievement-name="${achievement.achievementName}"
              >
                more_vert
              </span>
              <div
                class="admin-achievement-option-container"
                style="display: none" data-achievement-id="${achievement._id}"
              >
                <p class="admin-delete-achievement-buttons" data-achievement-id="${achievement._id}" >
                  Delete achievement
                </p>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  container.innerHTML = achievementString;
}

const adminAchievementOptionButtons = document.querySelectorAll(
  ".admin-achievement-option-buttons"
);

const adminAchievementOptionContainer = document.querySelectorAll(
  ".admin-achievement-option-container"
);

const adminAddAchievementButton = document.getElementById(
  "admin-add-achievement-button"
);

const adminDeleteAchievementButtons = document.querySelectorAll(
  ".admin-delete-achievement-buttons"
);

const adminAchievementPopup = document.getElementById(
  "admin-achievement-popup"
);

const popupBackground = document.getElementById("popup-background");

const adminLogoutForm = document.getElementById("admin-logout-form");
logout(adminLogoutForm);

popupBackground.addEventListener("click", (e) => {
  e.preventDefault();
  popupBackground.style.display = "none";
  adminAchievementPopup.style.display = "none";
});

adminAchievementOptionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      "pressedAchievementId",
      e.target.dataset.achievementId
    );
    sessionStorage.setItem(
      "pressedAchievementName",
      e.target.dataset.achievementName
    );

    adminAchievementOptionContainer.forEach((container) => {
      if (container.dataset.achievementId == e.target.dataset.achievementId) {
        if (container.style.display == "block") {
          container.style.display = "none";
        } else {
          container.style.display = "block";
        }
      }
    });
  });
});

adminDeleteAchievementButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminAchievementOptionContainer.forEach((container) => {
      container.style.display = "none";
    });

    popupBackground.style.display = "block";
    adminAchievementPopup.innerHTML = `
          <form class="form" id="delete-achievement-form">
          <div>
            <h1 id="delete-h1">Delete Achievement</h1>
            <p>${sessionStorage.getItem("pressedAchievementName")}</p>
          </div>
          <div>
            <button class="cancel-button">Cancel</button>
            <button class="delete-button" type="input">Delete</button>
          </div>
        </form>`;
    adminAchievementPopup.style.display = "block";

    const deleteAchievementForm = document.getElementById(
      "delete-achievement-form"
    );
    const cancelButton = deleteAchievementForm.querySelector(".cancel-button");

    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      adminAchievementPopup.style.display = "none";
      popupBackground.style.display = "none";
    });

    deleteAchievementForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const achievementId = sessionStorage.getItem("pressedAchievementId");

      fetch(`${getBackendBaseUrl()}/achievements/${achievementId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Achievement deleted successfully.");
            location.reload();
          } else {
            alert("Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});

adminAddAchievementButton.addEventListener("click", (e) => {
  e.preventDefault();
  adminAchievementOptionContainer.forEach((container) => {
    container.style.display = "none";
  });

  const addAchievementForm = document.createElement("form");
  addAchievementForm.id = "add-achievement-form";
  addAchievementForm.classList.add("form");

  const heading = document.createElement("h1");
  heading.textContent = "Add Achievement";

  const addAchievementInputContainer = document.createElement("div");
  addAchievementInputContainer.id = "add-achievement-input-container";

  const achievementNameInput = document.createElement("input");
  achievementNameInput.type = "text";
  achievementNameInput.placeholder = "Achievement name";
  achievementNameInput.name = "achievement-name";
  achievementNameInput.required = true;

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.placeholder = "Description";
  descriptionInput.name = "achievement-description";
  descriptionInput.required = true;

  const backgroundColorSelect = document.createElement("select");
  backgroundColorSelect.name = "achievement-backgroundColor";
  const backgroundColorOptionNone = document.createElement("option");
  backgroundColorOptionNone.value = "none";
  backgroundColorOptionNone.textContent = "Background-color";
  backgroundColorSelect.appendChild(backgroundColorOptionNone);
  const backgroundColorOptionRed = document.createElement("option");
  backgroundColorOptionRed.value = "red";
  backgroundColorOptionRed.textContent = "Red";
  backgroundColorSelect.appendChild(backgroundColorOptionRed);
  const backgroundColorOptionGreen = document.createElement("option");
  backgroundColorOptionGreen.value = "green";
  backgroundColorOptionGreen.textContent = "Green";
  backgroundColorSelect.appendChild(backgroundColorOptionGreen);
  const backgroundColorOptionBlue = document.createElement("option");
  backgroundColorOptionBlue.value = "blue";
  backgroundColorOptionBlue.textContent = "Blue";
  backgroundColorSelect.appendChild(backgroundColorOptionBlue);
  const backgroundColorOptionYellow = document.createElement("option");
  backgroundColorOptionYellow.value = "yellow";
  backgroundColorOptionYellow.textContent = "Yellow";
  backgroundColorSelect.appendChild(backgroundColorOptionYellow);

  const trophySelect = document.createElement("select");
  trophySelect.name = "achievement-trophy";
  const trophyOptionNone = document.createElement("option");
  trophyOptionNone.value = "none";
  trophyOptionNone.textContent = "Trophy";
  trophySelect.appendChild(trophyOptionNone);
  const trophyOptionBronze = document.createElement("option");
  trophyOptionBronze.value = "bronze";
  trophyOptionBronze.textContent = "Bronze";
  trophySelect.appendChild(trophyOptionBronze);
  const trophyOptionSilver = document.createElement("option");
  trophyOptionSilver.value = "silver";
  trophyOptionSilver.textContent = "Silver";
  trophySelect.appendChild(trophyOptionSilver);
  const trophyOptionGold = document.createElement("option");
  trophyOptionGold.value = "gold";
  trophyOptionGold.textContent = "Gold";
  trophySelect.appendChild(trophyOptionGold);

  const conditionContainer = document.createElement("div");
  conditionContainer.id = "condition-container";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.classList.add("add-tutorial-button");

  const conditionDiv = document.createElement("div");
  conditionDiv.classList.add("condition");

  const conditionTypeSelect = document.createElement("select");
  conditionTypeSelect.classList.add("condition-type");
  conditionTypeSelect.name = "condition-type";

  const conditionTypeOptions = [
    "Save to gallery",
    "Save to device",
    "Watch tutorial(s)",
  ];
  conditionTypeOptions.forEach((option) => {
    const conditionTypeOption = document.createElement("option");
    conditionTypeOption.value = option;
    conditionTypeOption.textContent = option;
    conditionTypeSelect.appendChild(conditionTypeOption);
  });

  const conditionValueInput = document.createElement("input");
  conditionValueInput.type = "number";
  conditionValueInput.classList.add("condition-value");
  conditionValueInput.placeholder = "Value";
  conditionValueInput.name = "condition-value";

  conditionDiv.appendChild(conditionTypeSelect);
  conditionDiv.appendChild(conditionValueInput);
  conditionContainer.appendChild(conditionDiv);

  addAchievementForm.appendChild(heading);
  addAchievementForm.appendChild(addAchievementInputContainer);
  addAchievementInputContainer.appendChild(achievementNameInput);
  addAchievementInputContainer.appendChild(descriptionInput);
  addAchievementInputContainer.appendChild(backgroundColorSelect);
  addAchievementInputContainer.appendChild(trophySelect);
  addAchievementInputContainer.appendChild(conditionContainer);
  addAchievementForm.appendChild(submitButton);

  adminAchievementPopup.innerHTML = "";
  adminAchievementPopup.appendChild(addAchievementForm);
  popupBackground.style.display = "block";
  adminAchievementPopup.style.display = "block";

  addAchievementForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const conditions = Array.from(
      conditionContainer.querySelectorAll(".condition")
    );
    const conditionData = conditions.map((condition) => {
      const conditionType = condition.querySelector(".condition-type").value;
      const conditionValue = condition.querySelector(".condition-value").value;

      return {
        type: conditionType,
        value: conditionValue,
      };
    });

    const data = {
      achievementName: e.target.elements["achievement-name"].value,
      description: e.target.elements["achievement-description"].value,
      backgroundColor: e.target.elements["achievement-backgroundColor"].value,
      trophy: e.target.elements["achievement-trophy"].value,
      conditions: conditionData,
    };

    console.log(data);

    fetch(`${getBackendBaseUrl()}/achievements`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Congratulations! You created a new achievement.");
          location.reload();
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again.");
      });
  });
});
