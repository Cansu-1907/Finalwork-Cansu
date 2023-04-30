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

popupBackground.addEventListener("click", (e) => {
  e.preventDefault();
  popupBackground.style.display = "none";
  adminAchievementPopup.style.display = "none";
});

adminAchievementOptionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminAchievementOptionContainer.forEach((container) => {
      if (container.classList.item(1) == e.target.classList.item(2)) {
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
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminAchievementPopup.innerHTML = `
          <form class="form">
          <div>
            <h1 id="delete-h1">Delete Achievement</h1>
            <p>${e.target.classList.item(1)}</p>
          </div>
          <div>
            <button class="cancel-button">Cancel</button>
            <button class="delete-button" type="input">Delete</button>
          </div>
        </form>`;
    adminAchievementPopup.style.display = "block";
  });
});

adminAddAchievementButton.addEventListener("click", (e) => {
  e.preventDefault();
  adminAchievementOptionContainer.forEach((container) => {
    container.style.display = "none";
  });
  // console.log(e.target.classList.item(1));
  popupBackground.style.display = "block";
  adminAchievementPopup.innerHTML = `
            <form id="add-tutorial-form" class="form">
            <div>
              <h1 id="add-tutorial-h1">Add achievement</h1>
            </div>
              <div id="add-achievement-input-container">
              <input type="text" placeholder="Achievement name" required />
              <input type="text" placeholder="Description" required />
              <select name="color">
                <option value="none">Background-color</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
              </select>
              <select name="trophy">
                <option value="none">Trophy</option>
                <option value="red">Silver</option>
                <option value="green">Gold</option>
              </select>
              </div>
            <button class="add-tutorial-button">Submit</button>
          </form>`;
  adminAchievementPopup.style.display = "block";
});
