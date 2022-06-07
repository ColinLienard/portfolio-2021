const button = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const menuText = document.querySelectorAll('.menu-text');
const hamburger = document.getElementById('hamburger');

let menuToggle = function(){
    menu.classList.toggle('menu-open');
    hamburger.classList.toggle('hamburger-open');
    document.body.classList.toggle('overflow-y-hidden');
};

button.addEventListener('click', menuToggle);

menuText.forEach(function(text){
    text.addEventListener('click', menuToggle);
});

//////////////////////////////////////////////////

const cards = document.querySelectorAll('.card');
const popups = document.querySelectorAll('.popup');
const popupBackground = document.getElementById('popup-background');
const crosses = document.querySelectorAll('.cross');
let currentCard = -1;

let popupToggle = function(card) {
    if(currentCard == -1) {
        currentCard = card.id;
        document.body.classList.toggle('overflow-y-hidden');
        popupBackground.classList.toggle('visible');
        document.getElementById('popup-' + currentCard).classList.toggle('visible');
    }
    else {
        document.body.classList.toggle('overflow-y-hidden');
        popupBackground.classList.toggle('visible');
        document.getElementById('popup-' + currentCard).classList.toggle('visible');
        currentCard = -1;
    };
};

cards.forEach(function(card) {
    card.addEventListener('click', function() {
        popupToggle(card);
    });
});

crosses.forEach(function(cross) {
    cross.addEventListener('click', popupToggle);
});

//////////////////////////////////////////////////

const clipboardSVG = document.querySelector('.clipboard');
const clipboardText = document.querySelector('.clipboard-text');
const mail = document.querySelector('.mail');

clipboardSVG.addEventListener('click', function() {
    navigator.clipboard.writeText(mail.innerText);
    clipboardText.innerText = 'Copié !';
});