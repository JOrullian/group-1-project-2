document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-btn');
    
    // Show the modal when user wants to log in or sign up
    document.getElementById('login-btn').addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    // Close the modal when the user clicks the close button
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close the modal when the user clicks anywhere outside the modal
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Existing login/signup form handlers
    const loginFormHandler = async (event) => {
      event.preventDefault();
      const email = document.querySelector('#email-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();
      if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert(response.statusText);
        }
      }
    };
  
    const signupFormHandler = async (event) => {
      event.preventDefault();
      const name = document.querySelector('#name-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
      if (name && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert(response.statusText);
        }
      }
    };
  
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
    document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  });
  