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
                    <img id="login-close-btn" class="login-close-btn" src="../../public/icons/close-btn-icon.svg">
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
                        <button id="signup-button" class="signup-button">Sign Up!</button>                    
                    </div>
                </div>
            </div>
        </div>`
        );
        const loginPopUpCont = $('#login-popup-container');
        const loginExitBtn = $('#login-close-btn')
        
        loginExitBtn.on('click', () => {
            loginPopUpCont.remove();
        })

    }
})

/* <div class="login-popup-container">
    <div class="login-popup-window">
        <div class="popup-login-side">
            <img class="login-close-btn" src="../../public/icons/close-btn-icon.svg">
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
                <button id="signup-button" class="signup-button">Sign Up!</button>                    
            </div>
        </div>
    </div>
</div> */