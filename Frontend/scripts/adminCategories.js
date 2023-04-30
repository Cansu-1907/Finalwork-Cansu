const adminCategoryOptionButtons = document.querySelectorAll(
  ".admin-category-option-buttons"
);

const adminCategoryOptionContainer = document.querySelectorAll(
  ".admin-category-option-container"
);

const adminAddCategoryButton = document.getElementById(
  "admin-add-category-button"
);

const adminEditCategoryButtons = document.querySelectorAll(
  ".admin-edit-category-buttons"
);

const adminDeleteCategoryButtons = document.querySelectorAll(
  ".admin-delete-category-buttons"
);

const adminAddTutorialButtons = document.querySelectorAll(
  ".admin-add-tutorial-buttons"
);

const adminEditTutorialButtons = document.querySelectorAll(
  ".admin-edit-tutorial-buttons"
);

const adminDeleteTutorialButtons = document.querySelectorAll(
  ".admin-delete-tutorial-buttons"
);

const adminCategoryPopup = document.getElementById("admin-category-popup");

const popupBackground = document.getElementById("popup-background");

popupBackground.addEventListener("click", (e) => {
  e.preventDefault();
  popupBackground.style.display = "none";
  adminCategoryPopup.style.display = "none";
});

adminCategoryOptionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
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

adminAddCategoryButton.addEventListener("click", (e) => {
  e.preventDefault();
  adminCategoryOptionContainer.forEach((container) => {
    container.style.display = "none";
  });
  // console.log(e.target.classList.item(1));
  popupBackground.style.display = "block";
  adminCategoryPopup.innerHTML = `
          <form id="add-tutorial-form" class="form">
          <div>
            <h1 id="add-tutorial-h1">Add category</h1>
          </div>
            <input type="text" placeholder="Category name" required />
          <button class="add-tutorial-button">Submit</button>
        </form>`;
  adminCategoryPopup.style.display = "block";
});

adminEditCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
    <form class="form">
    <div>
      <h1>Edit category name</h1>
      <p>${e.target.classList.item(1)}</p>
    </div>
    <input type="text" placeholder="New category name" required />
    <button type="input">Submit</button>
  </form>`;
    adminCategoryPopup.style.display = "block";
  });
});

adminDeleteCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
      <form class="form">
      <div>
        <h1 id="delete-h1">Delete category</h1>
        <p>${e.target.classList.item(1)}</p>
      </div>
      <div>
        <button class="cancel-button">Cancel</button>
        <button class="delete-button" type="input">Delete</button>
      </div>
    </form>`;
    adminCategoryPopup.style.display = "block";
  });
});

adminAddTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
        <form id="add-tutorial-form" class="form">
        <div>
          <h1 id="add-tutorial-h1">Add tutorial</h1>
          <p>${e.target.classList.item(1)}</p>
        </div>
        <div id="add-tutorial-input-container">
            <input type="text" placeholder="Tutorial name" required />
            <div>
                <label for="new-tutorial-thumbnail">Thumbnail</label>
                <input type="file" id="new-tutorial-thumbnail" required />
            </div>
            <div>
            <label for="new-tutorial-video">Video</label>
            <input type="file" id="new-tutorial-video" required />
        </div>
        </div>
        <button class="add-tutorial-button">Submit</button>
      </form>`;
    adminCategoryPopup.style.display = "block";
  });
});

adminEditTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
      <form class="form">
      <div>
        <h1>Edit tutorial name</h1>
        <p>${e.target.classList.item(1)}</p>
      </div>
      <input type="text" placeholder="New tutorial name" required />
      <button type="input">Submit</button>
    </form>`;
    adminCategoryPopup.style.display = "block";
  });
});

adminDeleteTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    // console.log(e.target.classList.item(1));
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
        <form class="form">
        <div>
          <h1 id="delete-h1">Delete tutorial</h1>
          <p>${e.target.classList.item(1)}</p>
        </div>
        <div>
          <button class="cancel-button">Cancel</button>
          <button class="delete-button" type="input">Delete</button>
        </div>
      </form>`;
    adminCategoryPopup.style.display = "block";
  });
});
