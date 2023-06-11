import { getBackendBaseUrl, getFrontendBaseUrl } from "./utils.js";

export default function logout(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`${getBackendBaseUrl()}/users/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      sessionStorage.removeItem("loggedUser");
      sessionStorage.removeItem("role");
      if (response.status == 200) {
        // alert("Successfully logged out");
        window.location.href = `${getFrontendBaseUrl()}/pages/login.html`;
        return response.json();
      } else {
        alert("Something went wrong.");
      }
    });
  });
}
