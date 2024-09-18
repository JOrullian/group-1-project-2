const themeToggle = document.querySelector('#color-toggle');
const themeSettings = document.querySelector('.mode-toggle');
const themeSettingsHeader = document.querySelector('.mode-toggle');

let mode = 'light';

if (localStorage.getItem('mode') === 'dark') {
    mode = 'dark';
    themeSettings.setAttribute('class', 'dark');
} else {
    mode = 'light';
    themeSettings.setAttribute('class', 'light');
}

themeToggle.addEventListener('click', function (event) {
    event.stopPropagation()

    if (mode === 'light') {
        mode = 'dark';
        themeSettings.setAttribute('class', 'dark');
        localStorage.setItem('mode', 'dark')
    } else {
        mode = 'light';
        themeSettings.setAttribute('class', 'light');
        localStorage.setItem('mode', 'light')
    }
});

