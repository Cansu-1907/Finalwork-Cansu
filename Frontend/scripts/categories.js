import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl, getFrontendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
} else {
  window.location.href = "http://127.0.0.1:5500/pages/unauthorized.html";
}

const categoriesContainer = document.getElementById("categories-container");

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

  function handleCategoryItemClick(tutorial) {
    sessionStorage.setItem("pressedTutorialName", tutorial.tutorialName);
    sessionStorage.setItem("pressedTutorialVideo", tutorial.videoUrl);
    sessionStorage.setItem("pressedTutorialId", tutorial._id);
    window.location.href = "./tutorial.html";
  }

  let categoryItemsString = "";
  tutorials.forEach((tutorial) => {
    const thumbnailBlob = new Blob([new Uint8Array(tutorial.thumbnail.data)], {
      type: "image/png",
    });
    const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
    console.log(tutorial.videoUrl);
    categoryItemsString += `

      <div class="category-item" data-tutorial-name="${tutorial.tutorialName}  data-tutorial-video="${tutorial.videoUrl}">
          <a href="./tutorial.html">
            <img src="${thumbnailUrl}" data-tutorial-name="${tutorial.tutorialName}"  data-tutorial-video="${tutorial.videoUrl}" />
            <p data-tutorial-name="${tutorial.tutorialName}"  data-tutorial-video="${tutorial.videoUrl}">${tutorial.tutorialName}</p>
          </a>
      </div>
    `;
  });
  categoriesString += `
  <div class="category-container">
    <div class="category-h2-container">
      <h2>${category.categoryName}</h2>
    </div>
    <div class="category-items-container">
    ${categoryItemsString}
    </div>
  </div>
  `;
}

categoriesContainer.innerHTML = categoriesString;

const categoryItems = document.querySelectorAll(".category-item");
console.log(categoryItems);
categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log("clicked");
    console.log(e.target.dataset);
    sessionStorage.setItem(
      "pressedTutorialName",
      e.target.dataset.tutorialName
    );
    sessionStorage.setItem(
      "pressedTutorialVideo",
      e.target.dataset.tutorialVideo
    );
  });
});
