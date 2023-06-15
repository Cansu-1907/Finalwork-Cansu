import logout from "./logout.js";
import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl, getFrontendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("Admin")) {
  console.log("logged");
} else {
  window.location.href = `${getFrontendBaseUrl()}/pages/unauthorized.html`;
}

const adminCategoriesContainer = document.getElementById(
  "admin-categories-container"
);

const categories = await fetch(`${getBackendBaseUrl()}/categories`, {
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

let categoriesString = "";
for (const category of categories) {
  const tutorials = await fetch(
    `${getBackendBaseUrl()}/tutorials/category/${category._id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Something went wrong.");
    }
  });

  let categoryItemsString = "";
  tutorials.forEach((tutorial) => {
    const thumbnailBlob = new Blob([new Uint8Array(tutorial.thumbnail.data)], {
      type: "image/png",
    });
    const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
    console.log(tutorial.videoUrl);
    categoryItemsString += `
      <div class="category-item">
          <img src="${thumbnailUrl}" />
          <p>${tutorial.tutorialName}</p>
        <div class="admin-category-options">
          <span class="material-icons admin-edit-tutorial-buttons" data-tutorial-name="${tutorial.tutorialName}" data-tutorial-id="${tutorial._id}">
              edit
          </span>
          <hr />
          <span class="material-icons admin-delete-tutorial-buttons" data-tutorial-name="${tutorial.tutorialName}" data-tutorial-id="${tutorial._id}">
            delete
          </span>
        </div>
      </div>
    `;
  });
  categoriesString += `
    <div class="category-container">
      <div class="category-h2-container">
        <h2>${category.categoryName}</h2>
        <div>
          <span data-category-id="${category._id}" class="material-icons admin-category-option-buttons">
            more_vert
          </span>
          <div data-category-id="${category._id}"
            class="admin-category-option-container"
            style="display: none"
          >
            <div class="admin-category-option-upper-subcontainer">
              <p data-category-id="${category._id}" data-category-name="${category.categoryName}" class="admin-edit-category-buttons">
                Edit category name
              </p>
              <p data-category-id="${category._id}" data-category-name="${category.categoryName}" class="admin-delete-category-buttons">
                Delete category
              </p>
            </div>
            <hr />
            <p data-category-id="${category._id}" data-category-name="${category.categoryName}" class="admin-add-tutorial-buttons">Add tutorial</p>
          </div>
        </div>
      </div>
      <div class="category-items-container">
        ${categoryItemsString}
      </div>
    </div>
  `;
}

adminCategoriesContainer.innerHTML = categoriesString;

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

const adminLogoutForm = document.getElementById("admin-logout-form");
logout(adminLogoutForm);

popupBackground.addEventListener("click", (e) => {
  e.preventDefault();
  popupBackground.style.display = "none";
  adminCategoryPopup.style.display = "none";
});

adminCategoryOptionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    adminCategoryOptionContainer.forEach((container) => {
      if (container.dataset.categoryId == e.target.dataset.categoryId) {
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
  popupBackground.style.display = "block";
  adminCategoryPopup.innerHTML = `
          <form id="add-category-form" class="form">
          <div>
            <h1 id="add-tutorial-h1">Add category</h1>
          </div>
            <input type="text" name="category-name" placeholder="Category name" required />
          <button class="add-tutorial-button">Submit</button>
        </form>`;
  adminCategoryPopup.style.display = "block";
  const adminAddCategoryForm = document.getElementById("add-category-form");
  adminAddCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      categoryName: e.target.elements["category-name"].value,
    };

    fetch(`${getBackendBaseUrl()}/categories`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == 201) {
        alert("Congratulations! You created a new category.");
        location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  });
});

adminEditCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("pressedCategoryId", e.target.dataset.categoryId);
    sessionStorage.setItem(
      "pressedCategoryName",
      e.target.dataset.categoryName
    );
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });

    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
    <form id="edit-category-form" class="form">
    <div>
      <h1>Edit category name</h1>
      <p>${sessionStorage.getItem("pressedCategoryName")}</p>
    </div>
    <input type="text" id="new-category-name" placeholder="New category name" required />
    <button type="submit">Submit</button>
  </form>`;
    adminCategoryPopup.style.display = "block";

    const editCategoryForm = document.getElementById("edit-category-form");
    editCategoryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const categoryId = sessionStorage.getItem("pressedCategoryId");
      const newCategoryName =
        document.getElementById("new-category-name").value;

      const data = {
        categoryName: newCategoryName,
      };

      fetch(`${getBackendBaseUrl()}/categories/${categoryId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Category name updated successfully.");
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

adminDeleteCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("pressedCategoryId", e.target.dataset.categoryId);
    sessionStorage.setItem(
      "pressedCategoryName",
      e.target.dataset.categoryName
    );
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
      <form class="form" id="delete-category-form">
      <div>
        <h1 id="delete-h1">Delete category</h1>
        <p>${sessionStorage.getItem("pressedCategoryName")}</p>
      </div>
      <div>
        <button class="cancel-button">Cancel</button>
        <button class="delete-button" type="input">Delete</button>
      </div>
    </form>`;
    adminCategoryPopup.style.display = "block";

    const deleteCategoryForm = document.getElementById("delete-category-form");
    const cancelButton = deleteCategoryForm.querySelector(".cancel-button");

    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      adminCategoryPopup.style.display = "none";
      popupBackground.style.display = "none";
    });

    deleteCategoryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const categoryId = sessionStorage.getItem("pressedCategoryId");

      fetch(`${getBackendBaseUrl()}/categories/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Category deleted successfully.");
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

adminAddTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("pressedCategoryId", e.target.dataset.categoryId);
    sessionStorage.setItem(
      "pressedCategoryName",
      e.target.dataset.categoryName
    );
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
        <form id="add-tutorial-form" class="form">
        <div>
          <h1 id="add-tutorial-h1">Add tutorial</h1>
          <p>${sessionStorage.getItem("pressedCategoryName")}</p>
        </div>
        <div id="add-tutorial-input-container">
            <input type="text" placeholder="Tutorial name" name="tutorial-name" required />
            <div>
                <label for="new-tutorial-thumbnail">Thumbnail</label>
                <input type="file" id="new-tutorial-thumbnail" name="tutorial-thumbnail" required />
            </div>
            <div>
            <label for="new-tutorial-video">Video Url</label>
            <input type="text" id="new-tutorial-video" name="tutorial-video-url" placeholder="https://www.youtube.com/..." required />
        </div>
        </div>
        <button class="add-tutorial-button">Submit</button>
      </form>`;
    adminCategoryPopup.style.display = "block";

    const addTutorialForm = document.getElementById("add-tutorial-form");
    console.log(addTutorialForm);
    addTutorialForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fileInput = document.getElementById("new-tutorial-thumbnail");
      const file = fileInput.files[0];

      try {
        const thumbnail = await readFileAsBase64(file);

        const data = {
          tutorialName: e.target.elements["tutorial-name"].value,
          thumbnail,
          videoUrl: e.target.elements["tutorial-video-url"].value,
          categoryId: sessionStorage.getItem("pressedCategoryId"),
        };

        console.log(data);

        fetch(`${getBackendBaseUrl()}/tutorials`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status === 201) {
              alert("Congratulations! You created a new tutorial.");
              location.reload();
            } else {
              alert("Something went wrong.");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again.");
          });
      } catch (error) {
        console.log(error);
        alert("An error occurred while processing the thumbnail file.");
      }
    });
  });
});

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Thumbnail = reader.result.split(",")[1];
      resolve(base64Thumbnail);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file."));
    };

    reader.readAsDataURL(file);
  });
}

adminEditTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      "adminPressedTutorialId",
      e.target.dataset.tutorialId
    );
    sessionStorage.setItem(
      "adminPressedTutorialName",
      e.target.dataset.tutorialName
    );
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
      <form class="form" id="edit-tutorial-form">
      <div>
        <h1>Edit tutorial name</h1>
        <p>${sessionStorage.getItem("adminPressedTutorialName")}</p>
      </div>
      <input type="text" id="new-tutorial-name" placeholder="New tutorial name" required />
      <button type="input">Submit</button>
    </form>`;
    adminCategoryPopup.style.display = "block";

    const editTutorialForm = document.getElementById("edit-tutorial-form");
    editTutorialForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const tutorialId = sessionStorage.getItem("adminPressedTutorialId");
      const newTutorialName =
        document.getElementById("new-tutorial-name").value;

      const data = {
        tutorialName: newTutorialName,
      };

      fetch(`${getBackendBaseUrl()}/tutorials/${tutorialId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Tutorial name updated successfully.");
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

adminDeleteTutorialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      "adminPressedTutorialId",
      e.target.dataset.tutorialId
    );
    sessionStorage.setItem(
      "adminPressedTutorialName",
      e.target.dataset.tutorialName
    );
    adminCategoryOptionContainer.forEach((container) => {
      container.style.display = "none";
    });
    popupBackground.style.display = "block";
    adminCategoryPopup.innerHTML = `
        <form class="form" id="delete-tutorial-form">
        <div>
          <h1 id="delete-h1">Delete tutorial</h1>
          <p>${sessionStorage.getItem("adminPressedTutorialName")}</p>
        </div>
        <div>
          <button class="cancel-button">Cancel</button>
          <button class="delete-button" type="input">Delete</button>
        </div>
      </form>`;
    adminCategoryPopup.style.display = "block";

    const deleteTutorialForm = document.getElementById("delete-tutorial-form");
    const cancelButton = deleteTutorialForm.querySelector(".cancel-button");

    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      adminCategoryPopup.style.display = "none";
      popupBackground.style.display = "none";
    });

    deleteTutorialForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const tutorialId = sessionStorage.getItem("adminPressedTutorialId");

      fetch(`${getBackendBaseUrl()}/tutorials/${tutorialId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Tutorial deleted successfully.");
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
