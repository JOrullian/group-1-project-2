const loginPopUpCont = document.querySelector('#login-popup-container');
const loginExitBtn = document.querySelector('#login-close-btn');
const loginForm = document.querySelector('#login-form');

loginExitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    loginPopUpCont.remove();
    document.location.replace("/")
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const usernameInput = $('.username-input').val();
    const passwordInput = $('.password-input').val();

    console.log(usernameInput)
    console.log(passwordInput)

    try {
        // Send a POST request to the login endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();
        console.log(response)
        if (response.ok) {
            // If login is successful
            userLoggedIn = true;
            console.log('User logged in:', data);

            loginPopUpCont.remove();
            document.location.replace("/dashboard")
        } else {
            // If login fails, show an error message
            console.error('Login failed:', data.message);
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});

