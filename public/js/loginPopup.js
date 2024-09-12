const moreInfoBtn = document.getElementById('more-info-btn');
const mainContainer = $('#main-container');

let userLoggedIn = false

moreInfoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(userLoggedIn === true) {
        console.log('User logged in!')
    } else if(userLoggedIn === false) {
        mainContainer.append(
        `<div id="login-popup-container" class="login-popup-container">
            <div class="login-popup-window">
                <div class="popup-login-side">
                    <img id="login-close-btn" class="login-close-btn" src="icons/close-btn-icon.svg">
                    <div class="login-window">
                        <h1 class="login-form-title">Welcome to<br/><span class="login-brand-name">QuickMatch</span></h1>
                        <form id="login-form" class="login-form">
                            <input class="login-inputs" type="text" placeholder="Username" required>
                            <input class="login-inputs" type="password" placeholder="Password" required>
                            <button id="login-button" class="login-button">Login</button>
                        </form>                            
                    </div>
                </div>
                <div class="popup-signup-side">
                    <div class="signup-window">
                        <h1 class="signup-form-title">Need an account?</h1>
                        <a href="../signup-walkthrough.html">
                            <button id="signup-button" class="signup-button">Sign Up!</button>
                        </a>                    
                    </div>
                </div>
            </div>
        </div>`
        );
        const loginPopUpCont = $('#login-popup-container');
        const loginExitBtn = $('#login-close-btn');
        const loginForm = $('#login-form');
        
        loginExitBtn.on('click', () => {
            loginPopUpCont.remove();
        });

        loginForm.on('submit', async (event) => {
            event.preventDefault();

            const username = $('#username-input').val();
            const password = $('#password-input').val();

            try {
                // Send a POST request to the login endpoint
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password })
                });

                const data = await response.json();

                if (response.ok) {
                    // If login is successful
                    userLoggedIn = true;
                    console.log('User logged in:', data);

                    loginPopUpCont.remove();
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
    }
});