import disableNavigation from "./disableNavigation.js";

disableNavigation();

const form = document.getElementById("sign-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    firstName: e.target.elements["sign-first-name"].value,
    lastName: e.target.elements["sign-last-name"].value,
    email: e.target.elements["sign-email"].value,
    password: e.target.elements["sign-password"].value,
  };
  console.log(data);

  fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status == 500) {
      alert("Sorry, that email is already taken.");
    } else if (response.status == 201) {
      alert("Congratulations! Your account has been successfully created.");
      window.location.href = "http://127.0.0.1:5500/pages/login.html";
    } else {
      alert("Something went wrong.");
    }
  });
});
