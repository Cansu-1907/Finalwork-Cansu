import logout from "./logout.js";
import disableNavigation from "./disableNavigation.js";

disableNavigation();
const form = document.getElementById("login-form");
const logoutForm = document.getElementById("logout-form");
const loggedUserH1 = document.getElementById("logged-user");

logout(logoutForm);

if (sessionStorage.getItem("loggedUser")) {
  form.style.display = "none";
  loggedUserH1.innerHTML = sessionStorage.getItem("loggedUser");
  logoutForm.style.display = "flex";
} else {
  form.style.display = "flex";
  logoutForm.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    email: e.target.elements["login-email"].value,
    password: e.target.elements["login-password"].value,
  };
  console.log(data);

  fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (response.status == 401) {
        alert("Invalid email or password.");
      } else if (response.status == 200) {
        return response.json();
      } else {
        alert("Something went wrong.");
      }
    })
    .then((data) => {
      sessionStorage.setItem("loggedUser", data.loggedUser);
      sessionStorage.setItem("role", data.role);
      if (data.role === "Admin") {
        window.location.href =
          "http://127.0.0.1:5500/admin/adminCategories.html";
      } else {
        window.location.href = "http://127.0.0.1:5500/";
      }
    });
});
