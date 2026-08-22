(function () {
  const VALID_USERNAME = "qa_name";
  const VALID_PASSWORD = "qa_pass";
  const AUTH_KEY = "isAuthenticated";

  const page = document.body.dataset.page;

  if (page === "login") {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        window.location.href = "index.html";
      } else {
        errorMessage.hidden = false;
      }
    });
  }

  if (page === "home") {
    if (sessionStorage.getItem(AUTH_KEY) !== "true") {
      window.location.href = "login.html";
      return;
    }

    document.getElementById("logout-button").addEventListener("click", () => {
      sessionStorage.removeItem(AUTH_KEY);
      window.location.href = "login.html";
    });
  }
})();
