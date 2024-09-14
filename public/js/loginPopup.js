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



signupBtn.addEventListener('click', (event) => {
    event.preventDefault();

    loginPopUpCont.remove();
    document.location.replace("/signup-walkthrough")
})
//     let currentPageIndex = 0; // Track the current page
//     const translateAmount = 16.66666667; // Assuming you want to slide 100% per page
//     const signupPagesContainer = document.querySelector('.signup-pages'); // Container of all pages
//     const signupPages = document.querySelectorAll('.signup-page');
//     const maxPageIndex = signupPages.length - 1; // Calculate the maximum page index

//     const slide = (direction) => {
//         if (direction === "next" && currentPageIndex < maxPageIndex) { currentPageIndex++; } else if (direction === "back" &&
//             currentPageIndex > 0) {
//             currentPageIndex--;
//         }

//         // Calculate the translate value based on the current page index
//         const translate = -currentPageIndex * translateAmount;

//         // Apply the transform to the container, not individual pages
//         signupPagesContainer.style.transform = `translateX(${translate}%)`;
//     };

//     const nextButtons = document.querySelectorAll('.signup-walkthrough-btn'); // Select all buttons

//     // Loop over each button and assign the slide behavior
//     nextButtons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             const direction = button.getAttribute('data-direction'); // Get direction from data attribute
//             if (direction) {
//                 slide(direction); // Call slide function with the correct direction
//             }
//         });
//     });
// });
