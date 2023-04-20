export default function popup() {
  const popupBackground = document.getElementById("popup-background");
  const popup = document.getElementById("popup");

  popupBackground.addEventListener("click", (e) => {
    e.preventDefault();
    popupBackground.style.display = "none";
    popup.style.display = "none";
  });
}
