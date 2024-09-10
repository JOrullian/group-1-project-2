document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("login-modal");
  const closeModal = document.querySelector(".close-btn");

  // Function to check login status
  const checkLoginStatus = async () => {
    const response = await fetch("/api/users/check-login");
    const data = await response.json();
    return data.logged_in;
  };

  // Show the modal when the user wants to log in or sign up
  document.getElementById("login-btn").addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close the modal when the user clicks the close button
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when the user clicks anywhere outside the modal
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Handle More Info button click
  document
    .querySelector(".more-info-btn")
    .addEventListener("click", async () => {
      const isLoggedIn = await checkLoginStatus(); // Check if the user is logged in
      if (!isLoggedIn) {
        // If user is not logged in, show the login modal
        modal.style.display = "block";
      } else {
        // If user is logged in, proceed with the More Info action
        showMoreInfo(); // Replace with your actual "More Info" page URL
      }
    });

  // Existing login/signup form handlers
  const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    if (name && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);

  // Function to show the "More Info" content
  const showMoreInfo = () => {
    // Replace this with the actual logic to display "More Info" content
    alert("Displaying more info!");
  };
});
