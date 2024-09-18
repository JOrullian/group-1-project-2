const windowWidth = $(window).width(); 

if(windowWidth > 600) {
    $('.nav-title').css('opacity', '0');

    const navTitle = $('.nav-title');

    $('.navbar').mouseover(function(){
        $('.nav-title').css('opacity', '1');
    });
    $('.navbar').mouseout(function(){
        $('.nav-title').css('opacity', '0');
    });
}

// Select the navbar and the body
const navbar = document.querySelector('.navbar');
const body = document.querySelector('body');

// Add event listeners for hover
navbar.addEventListener('mouseenter', () => {
  body.classList.add('navbar-hovered');
});

navbar.addEventListener('mouseleave', () => {
  body.classList.remove('navbar-hovered');
});