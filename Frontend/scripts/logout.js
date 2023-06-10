export default function logout(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/users/logout", {
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
        window.location.href = "http://127.0.0.1:5500/pages/login.html";
        return response.json();
      } else {
        alert("Something went wrong.");
      }
    });
  });
}
