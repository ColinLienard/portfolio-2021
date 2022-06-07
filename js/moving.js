let banner1 = document.querySelector(".banner-1");
let banner2 = document.querySelector(".banner-2");
let maxLeft = banner1.offsetWidth - 100;

let randomNumber = function(min, max) {
    return parseInt(Math.floor(Math.random() * (max - min) ) + min);
};

let move = function(element) {
    let random = randomNumber(1, 3);
    let rotation = "";
    if(random == 1)
        rotation = "-";
    rotation += randomNumber(90, 180);
    let duration = randomNumber(4000, 8000);

    element.style.left = randomNumber(0, maxLeft) + "px";

    element.animate([
        {
            top: "120%"
        },
        {
            top: "-70%",
            transform: "rotate(" + rotation + "deg)"
        }
    ], {duration: duration, easing: "linear", iterations: 1});

    setTimeout(() => {
        move(element);
    }, duration);
};

document.querySelectorAll(".moving").forEach(moving => {
    move(moving);
});