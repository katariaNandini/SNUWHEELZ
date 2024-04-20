loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        // Redirect to admin.html upon successful login
        window.location.href = "admin.html";
    } else {
        // Display error message
        loginErrorMsg.style.opacity = 1;
    }
});
