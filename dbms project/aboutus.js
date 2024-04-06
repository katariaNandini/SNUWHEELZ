 // Function to toggle visibility of additional information
  function toggleMoreInfo() {
    var moreInfo = document.getElementById("more-info");
    if (moreInfo.style.display === "none") {
      moreInfo.style.display = "block";
    } else {
      moreInfo.style.display = "none";
    }
  }
  
  // Event listener to call displayWelcomeMessage function when the page is loaded
  window.addEventListener("load", displayWelcomeMessage);
  
  // Event listener to call toggleMoreInfo function when the "Show More" button is clicked
  var showMoreButton = document.getElementById("show-more-button");
  showMoreButton.addEventListener("click", toggleMoreInfo);