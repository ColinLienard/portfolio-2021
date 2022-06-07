let text = document.querySelector(".changing-text");
let textContent1 = "UI/UX designer.";
let textContent2 = "développeur<br>front-end.";
let textContent3 = "web designer.";
let timeBetween = 4000;
let animationDuration = 600;

let changeTextContent = function() {
    setTimeout(() => {
        animate();
        setTimeout(() => {
            text.innerHTML = textContent2;
        }, animationDuration / 2);
    }, timeBetween);
    setTimeout(() => {
        animate();
        setTimeout(() => {
            text.innerHTML = textContent3;
        }, animationDuration / 2);
    }, timeBetween * 2);
    setTimeout(() => {
        animate();
        setTimeout(() => {
            text.innerHTML = textContent1;
        }, animationDuration / 2);
    }, timeBetween * 3);
};

let animate = function() {
    text.animate([
        {
            transform: "translateY(0)",
            opacity: 1
        },
        {
            transform: "translateY(.5rem)",
            opacity: 0
        },
        {
            transform: "translateY(-.5rem)",
            opacity: 0
        },
        {
            transform: "translateY(0)",
            opacity: 1
        }
    ], {duration: animationDuration, easing: "ease-in-out"});
};

changeTextContent();
setInterval(() => {
    changeTextContent();
}, timeBetween * 3);