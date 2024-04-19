document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");
    const passwordField = document.getElementById("password-field");
    const confirmPasswordField = document.getElementById("confirm-password-field");
    const signupErrorMsg = document.getElementById("signup-error-msg");

    // Function to handle form submission
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        // // Check if passwords match
        // if (password !== confirmPassword) {
        //     // Show error message
        //     signupErrorMsg.textContent = "Passwords do not match";
        //     signupErrorMsg.style.display = "block";
        // } else {
        //     // Clear error message and submit form
        //     signupErrorMsg.textContent = "";
        //     signupErrorMsg.style.display = "none";
        //     signupForm.submit();
        // }
    });
});
