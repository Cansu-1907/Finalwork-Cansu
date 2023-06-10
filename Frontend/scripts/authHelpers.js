function isAuthenticated() {
  return sessionStorage.getItem("loggedUser") !== null;
}

function hasRole(role) {
  return sessionStorage.getItem("role") === role;
}

export { isAuthenticated, hasRole };
