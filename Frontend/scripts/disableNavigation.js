import { isAuthenticated } from "./authHelpers.js";

export default function disableNavigation() {
  if (!isAuthenticated()) {
    const categoriesLink = document.getElementById("categories-link");
    const galleryLink = document.getElementById("gallery-link");
    const achievementsLink = document.getElementById("achievements-link");

    categoriesLink.style.cursor = "not-allowed";
    galleryLink.style.cursor = "not-allowed";
    achievementsLink.style.cursor = "not-allowed";

    categoriesLink.removeAttribute("href");
    galleryLink.removeAttribute("href");
    achievementsLink.removeAttribute("href");

    categoriesLink.addEventListener("click", preventNavigation);
    galleryLink.addEventListener("click", preventNavigation);
    achievementsLink.addEventListener("click", preventNavigation);
  }
}

function preventNavigation(event) {
  event.preventDefault();
}
