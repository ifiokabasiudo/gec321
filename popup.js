// Get the popup element
const popup = document.getElementById('popup');

// Get the session form and username input
const sessionForm = document.getElementById('sessionForm');
const usernameInput = document.getElementById('usernameInput');

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username !== '') {
    // Perform AJAX request to save the username to the database
    // Replace the AJAX call with your actual implementation

    // Once the username is successfully saved, grant access
    grantAccess();
  }
}

// Function to grant access to the user
function grantAccess() {
  // Remove the popup from the DOM
  popup.remove();

  // Enable access to the page or perform other actions
}
  // Show the popup when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    popup.classList.add('show');
  });
  
  // Add event listener for form submission
  sessionForm.addEventListener('submit', handleFormSubmit);