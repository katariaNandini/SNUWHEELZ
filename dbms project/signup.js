const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-form-submit");
const signupErrorMsg = document.getElementById("signup-error-msg");

signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm['confirm-password'].value;

    if (password !== confirmPassword) {
        // Show an error message if passwords don't match
        signupErrorMsg.textContent = "Passwords do not match";
        signupErrorMsg.style.opacity = 1;
    } else {
        // Reset any previous error messages
        signupErrorMsg.textContent = "";
        signupErrorMsg.style.opacity = 0;

        // Submit the form
        signupForm.submit();
    }
});

// Function to validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
