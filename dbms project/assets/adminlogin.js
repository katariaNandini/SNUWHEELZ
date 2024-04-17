const loginForm = document.getElementById("adminlogin-form");
const loginButton = document.getElementById("adminlogin-form-submit");
const loginErrorMsg = document.getElementById("adminlogin-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})