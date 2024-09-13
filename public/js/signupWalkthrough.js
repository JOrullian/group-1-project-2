const signupPages = document.querySelectorAll('.signup-page');
const loginPopup = $('#login-popup-container');
const mainContainer = $('#main-container');
const signupBtn = document.getElementById('signup-button');
const translateAmount = 100;
let translate = 0;

slide = (direction) => {

    direction === "next" ? translate -= translateAmount : translate += translateAmount;

    signupPages.forEach(
        signupPages => (signupPages.style.transform = `translateX(${translate}%)`)
    );

};

signupBtn.addEventListener('click', (event) => {
    event.preventDefault();

    console.log('yeehaw')

    loginPopup.remove();

    mainContainer.append(
        `<main class="signup-main-container">
            <div class="signup-pages">
                <div class="signup-page">
                    <div class="signup-page-window">
                        <img class="signup-player-icon" src="../public/icons/signup-player-icon.svg">
                        <h1 class="signup-walkthrough-title">Let's get to know<br/> <span class="special-you-style">you!</span></h1>
                        <div class="signup-btn-container">
                            <button class="signup-walkthrough-btn" onclick="slide('next')">Let's go!</button>
                        </div>
                    </div>
                </div>
                <div class="signup-page">
                    <div class="signup-page-window">
                        <h1 class="signup-walkthrough-title">What's your name?</h1>
                        <input placeholder="First name only" class="signup-walkthrough-inputs" type="text">
                        <div class="signup-btn-container">
                            <button class="signup-walkthrough-btn" onclick="slide('back')">Back</button>
                            <button class="signup-walkthrough-btn" onclick="slide('next')">Next</button>
                        </div>
                    </div>
                </div>
                <div class="signup-page">
                    <div class="signup-page-window">
                        <h1 class="signup-walkthrough-title">What city are you from?</h1>
                        <input placeholder="Ex. Dallas, TX" class="signup-walkthrough-inputs" type="text">
                        <div class="signup-btn-container">
                            <button class="signup-walkthrough-btn" onclick="slide('back')">Back</button>
                            <button class="signup-walkthrough-btn" onclick="slide('next')">Next</button>
                        </div>
                    </div>
                </div>
                <div class="signup-page">
                    <div class="signup-page-window">
                        <h1 class="signup-walkthrough-title">Which sport do you enjoy most?</h1>
                        <p class="dont-worry">Don't worry, you'll see other games as well :)</p>
                        <select class="signup-selection-container">
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
                            <button class="signup-walkthrough-btn" onclick="slide('back')">Back</button>
                            <button class="signup-walkthrough-btn" onclick="slide('next')">Next</button>
                        </div>
                    </div>
                </div>
                <div class="signup-page">
                    <div class="signup-page-window">
                        <h1 class="signup-walkthrough-title">How often do<br/> you play?</h1>
                        <div>
                            <select class="signup-selection-container">
                                <option value="" disabled selected>Please select</option>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="multiple-days">Multiple days a week</option>
                                <option value="everyday">Every day!</option>
                            </select>
                        </div>
                        <div class="signup-btn-container">
                            <button class="signup-walkthrough-btn" onclick="slide('back')">Back</button>
                            <button class="signup-walkthrough-btn" onclick="slide('next')">Next</button>
                        </div>
                    </div>
                </div>
                <div class="signup-page five">
                    <div class="signup-page-window">
                        <h1 class="signup-walkthrough-title">Create a username and password</h1>
                        <div class="signup-creds-container">
                            <input class="signup-walkthrough-inputs" placeholder="Username" type="text">
                            <input class="signup-walkthrough-inputs" placeholder="Password" type="password">
                            <input class="signup-walkthrough-inputs" placeholder="Confirm password" type="password">
                        </div>
                        <a href="/dashboard">
                            <button class="signup-walkthrough-btn">Let's play!</button>
                        </a>
                    </div>
                </div>
            </div>
        </main>`
    );
});