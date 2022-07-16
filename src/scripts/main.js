let button = document.querySelector('#hamburger__container');
let menu = document.querySelector('#fullscreen-menu');  
let hamburger = document.querySelector('#hamburger')
let body = document.querySelector('body');

// let toggleMenu = function() {
    
//     button.classList.toggle('hamburger__container--active');
//     hamburger.classList.toggle('hamburger--active')
//     menu.classList.toggle('fullscreen-menu--open');
    // body.classList.toggle('body-active-menu');
// };

// button.addEventListener('click', clickMenu => {
//     clickMenu.preventDefault();
//     button.classList.toggle('hamburger__container--active');
//     hamburger.classList.toggle('hamburger--active')
//     menu.classList.toggle('fullscreen-menu--open');
//     body.classList.toggle('body-active-menu');
//     // $('.menu__link').on('click', clickMenu);
// });   
// $('.menu__link').on('click', clickMenu);

let toggleMenu = function(e) {
    e.preventDefault();
    button.classList.toggle('hamburger__container--active');
    hamburger.classList.toggle('hamburger--active')
    menu.classList.toggle('fullscreen-menu--open');
    body.classList.toggle('locked');
}

button.addEventListener('click', toggleMenu);   
$('.fullscreen-menu__link').on('click', toggleMenu);
