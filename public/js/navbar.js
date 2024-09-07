$('.nav-title').css('opacity', '0');

const navTitle = $('.nav-title');
console.log(navTitle);

$('.navbar').mouseover(function(){
    $('.nav-title').css('opacity', '1');
});
$('.navbar').mouseout(function(){
    $('.nav-title').css('opacity', '0');
});