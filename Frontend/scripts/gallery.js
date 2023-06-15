import { isAuthenticated, hasRole } from "./authHelpers.js";
import { getBackendBaseUrl } from "./utils.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
} else {
  window.location.href = "http://127.0.0.1:5500/pages/unauthorized.html";
}

const favoriteFilterBtn = document.getElementById("favorite-filter-btn");

const galleryItemsContainer = document.getElementById(
  "gallery-items-container"
);

const drawings = await fetch(`${getBackendBaseUrl()}/drawings`, {
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
sessionStorage.setItem("favoriteFilter", "off");
renderDrawings(drawings, galleryItemsContainer);

favoriteFilterBtn.addEventListener("change", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("favoriteFilter") === "off") {
    sessionStorage.setItem("favoriteFilter", "on");
  } else {
    sessionStorage.setItem("favoriteFilter", "off");
  }

  const favoriteFilterValue = sessionStorage.getItem("favoriteFilter") === "on";

  let filteredDrawings;
  if (favoriteFilterValue) {
    filteredDrawings = drawings.filter((drawing) => drawing.favorite === true);
  } else {
    filteredDrawings = drawings;
  }
  renderDrawings(filteredDrawings, galleryItemsContainer);
});

function renderDrawings(data, container) {
  let drawingItemsString = "";
  data.forEach((drawing) => {
    const drawingBlob = new Blob([new Uint8Array(drawing.drawing.data)], {
      type: "image/png",
    });
    const drawingUrl = URL.createObjectURL(drawingBlob);
    const favoriteIcon = drawing.favorite ? "favorite" : "favorite_outline";

    drawingItemsString += `
    <div class="gallery-grid-item">
    <div class="gallery-grid-item-img-container">
      <img src="${drawingUrl}" />
    </div>
    <div class="gallery-grid-item-information-container">
      <p>${drawing.drawingName}</p>
      <span class="material-icons favorite-button" data-drawing-id="${drawing._id}" data-drawing-favorite="${drawing.favorite}"> ${favoriteIcon} </span>
    </div>
  </div>
    `;
  });

  container.innerHTML = drawingItemsString;

  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(
        `${getBackendBaseUrl()}/drawings/${
          e.target.dataset.drawingId
        }/toggle-favorite`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.status == 200) {
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
}
