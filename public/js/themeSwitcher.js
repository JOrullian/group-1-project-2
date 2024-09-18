const themeToggle = document.querySelector('#nav-mode');
const bodyElement = document.querySelector('body'); // Correctly target the body element

let mode = 'light';

// Check for saved theme preference
if (localStorage.getItem('mode') === 'dark') {
    mode = 'dark';
    bodyElement.classList.add('dark');  // Add 'dark' class if stored preference is dark
} else {
    bodyElement.classList.add('light'); // Default to 'light' class
}

// Add click event listener to toggle theme
themeToggle.addEventListener('click', function (event) {
    event.stopPropagation();

    // Toggle between light and dark modes
    if (mode === 'light') {
        mode = 'dark';
        bodyElement.classList.remove('light');
        bodyElement.classList.add('dark');  // Switch to dark theme
        localStorage.setItem('mode', 'dark');
    } else {
        mode = 'light';
        bodyElement.classList.remove('dark');
        bodyElement.classList.add('light'); // Switch to light theme
        localStorage.setItem('mode', 'light');
    }
});
