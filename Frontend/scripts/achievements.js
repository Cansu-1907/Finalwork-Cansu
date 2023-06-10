import { isAuthenticated, hasRole } from "./authHelpers.js";

if (isAuthenticated() && hasRole("User")) {
  console.log("logged");
} else {
  window.location.href = "http://127.0.0.1:5500/pages/unauthorized.html";
}
