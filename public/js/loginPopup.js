const mainContainer = $('#main-container');
const pageContainer = document.querySelector('#page-container');
const homeNavBtn = $('#nav-home');
const eventNavBtn = $('#nav-event');
const exploreNavBtn = $('#nav-explore');
const navProfileBtn = $('#nav-profile');


const showLoginPopup = () => {
    mainContainer.append(
        `<div id="login-popup-container" class="login-popup-container">
            <div class="login-popup-window">
                <div class="popup-login-side">
                    <img id="login-close-btn" class="login-close-btn" src="icons/close-btn-icon.svg">
                    <div class="login-window">
                        <h1 class="login-form-title">Welcome to<br /><span class="login-brand-name">QuickMatch</span></h1>
                        <form id="login-form" class="login-form">
                            <input class="username-input login-inputs" type="text" placeholder="Username" required>
                            <input class="password-input login-inputs" type="password" placeholder="Password" required>
                            <button id="login-button" class="login-button">Login</button>
                        </form>
                    </div>
                </div>
                <div class="popup-signup-side">
                    <div class="signup-window">
                        <h1 class="signup-form-title">Need an account?</h1>
                        <button id="signup-button" class="signup-button">Sign Up!</button>
                    </div>
                </div>
            </div>
        </div>`
    );

    const loginPopUpCont = $('#login-popup-container');
    const loginExitBtn = $('#login-close-btn');
    const loginForm = $('#login-form');
    const signupBtn = $('#signup-button');

    signupBtn.on('click', (event) => {
        event.preventDefault();

        loginPopUpCont.remove();

        mainContainer.append(
            `<main class="signup-main-container">
                <div class="signup-pages">
                    <div class="signup-page">
                        <div class="signup-page-window">
                            <img class="signup-player-icon" src="icons/signup-player-icon.svg">
                            <h1 class="signup-walkthrough-title">Let's get to know<br/> <span class="special-you-style">you!</span></h1>
                            <div class="signup-btn-container">
                                <button class="signup-walkthrough-btn" data-direction="next">Let's go!</button>
                            </div>
                        </div>
                    </div>
                    <div class="signup-page">
                        <div class="signup-page-window">
                            <h1 class="signup-walkthrough-title">What's your name?</h1>
                            <input placeholder="First name only" class="signup-walkthrough-inputs" type="text" required>
                            <div class="signup-btn-container">
                                <button class="signup-walkthrough-btn" data-direction="back">Back</button>
                                <button class="signup-walkthrough-btn" data-direction="next">Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="signup-page">
                        <div class="signup-page-window">
                            <h1 class="signup-walkthrough-title">What city are you from?</h1>
                            <input placeholder="Ex. Dallas, TX" class="signup-walkthrough-inputs" type="text" required>
                            <div class="signup-btn-container">
                                <button class="signup-walkthrough-btn" data-direction="back">Back</button>
                                <button class="signup-walkthrough-btn" data-direction="next">Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="signup-page">
                        <div class="signup-page-window">
                            <h1 class="signup-walkthrough-title">Which sport do you enjoy most?</h1>
                            <p class="dont-worry">Don't worry, you'll see other games as well :)</p>
                            <select class="signup-selection-container" required>
                                <option value="" disabled selected>Pick a sport!</option>
                                <option value="basketball">Basketball</option>
                                <option value="soccer">Soccer</option>
                                <option value="football">Football</option>
                                <option value="pickleball">Pickleball</option>
                                <option value="tennis">Tennis</option>
                                <option value="raquetball">Raquetball</option>
                                <option value="baseball">Baseball</option>
                                <option value="volleyball">Volleyball</option>
                                <option value="lacrosse">Lacrosse</option>
                                <option value="hockey">Hockey</option>
                            </select>
                            <div class="signup-btn-container">
                                <button class="signup-walkthrough-btn" data-direction="back">Back</button>
                                <button class="signup-walkthrough-btn" data-direction="next">Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="signup-page">
                        <div class="signup-page-window">
                            <h1 class="signup-walkthrough-title">How often do<br/> you play?</h1>
                            <div>
                                <select class="signup-selection-container" required>
                                    <option value="" disabled selected>Please select</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="multiple-days">Multiple days a week</option>
                                    <option value="everyday">Every day!</option>
                                </select>
                            </div>
                            <div class="signup-btn-container">
                                <button class="signup-walkthrough-btn" data-direction="back">Back</button>
                                <button class="signup-walkthrough-btn" data-direction="next">Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="signup-page five">
                        <div class="signup-page-window">
                            <h1 class="signup-walkthrough-title">Create a username and password</h1>
                            <div class="signup-creds-container">
                                <input class="signup-walkthrough-inputs" placeholder="Username" type="text" required>
                                <input class="signup-walkthrough-inputs" placeholder="Password" type="password" required>
                                <input class="signup-walkthrough-inputs" placeholder="Confirm password" type="password" required>
                            </div>
                            <a href="/dashboard">
                                <button class="signup-walkthrough-btn">Let's play!</button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>`
        );

        let currentPageIndex = 0; // Track the current page
        const translateAmount = 16.66666667; // Assuming you want to slide 100% per page
        const signupPagesContainer = document.querySelector('.signup-pages'); // Container of all pages
        const signupPages = document.querySelectorAll('.signup-page');
        const maxPageIndex = signupPages.length - 1; // Calculate the maximum page index

        const slide = (direction) => {
            if (direction === "next" && currentPageIndex < maxPageIndex) {
                currentPageIndex++;
            } else if (direction === "back" && currentPageIndex > 0) {
                currentPageIndex--;
            }
            
            // Calculate the translate value based on the current page index
            const translate = -currentPageIndex * translateAmount;

            // Apply the transform to the container, not individual pages
            signupPagesContainer.style.transform = `translateX(${translate}%)`;
        };

        const nextButtons = document.querySelectorAll('.signup-walkthrough-btn'); // Select all buttons

        // Loop over each button and assign the slide behavior
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const direction = button.getAttribute('data-direction'); // Get direction from data attribute
                if (direction) {
                    slide(direction); // Call slide function with the correct direction
                }
            });
        });
    });

    loginExitBtn.on('click', () => {
        loginPopUpCont.remove();
    });

    loginExitBtn.on('click', (event) => {
        event.preventDefault();
        loginPopUpCont.remove();
    });
    
    loginForm.on('submit', async (event) => {
        event.preventDefault();

        const usernameInput = $('.username-input').val();
        const passwordInput = $('.password-input').val();

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
}

homeNavBtn.on('click', async () => {
    const response = await fetch('/api/users/check-login');

    if (response.ok === true) {
        window.location.href = '/dashboard';
    } else {
        showLoginPopup();
    }
});
eventNavBtn.on('click', async () => {
    const response = await fetch('/api/users/check-login');

    if (response.ok === true) {
        window.location.href = '/createEvent';
    } else {
        showLoginPopup();
    }
});
exploreNavBtn.on('click', async () => {
    const response = await fetch('/api/users/check-login');

    if (response.ok === true) {
        window.location.href = '/explore';
    } else {
        showLoginPopup();
    }
});
navProfileBtn.on('click', async () => {
    const response = await fetch('/api/users/check-login');

    if (response.ok === true) {
        window.location.href = '/profile';
    } else {
        showLoginPopup();
    }
});

pageContainer.addEventListener('click', async (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    } else {
        const response = await fetch('/api/users/check-login');

        if (response.ok === true) {
            return;
        } else {
            showLoginPopup();
        }
    }
});