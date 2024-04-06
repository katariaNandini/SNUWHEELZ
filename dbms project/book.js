const form = document.getElementById("contact-form-inner");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const mobileNo = document.getElementById("mobile-no");
const selectedLocation = document.getElementById("selected-location");
const selectedCycle = document.getElementById("selected-cycle");
const message = document.getElementById("message");

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    firstName.value === " " ||
    lastName.value === " " ||
    email.value === " " ||
    message.value === " " ||
    mobileNo.value === " " ||
    selectedCycle.value === " " ||
    selectedLocation.value === " "
  ) {
    alert("Please fill all the required fields");
  } else {
    alert("we received your query, we will contact you soon!");
  }

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  mobileNo.value = "";
  selectedLocation.value = "";
  selectedCycle.value = "";
  message.value = "";
};

form.addEventListener("submit", handleSubmit);