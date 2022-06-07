let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".menu");
let menuChildren = document.querySelectorAll(".menuChild");

hamburger.addEventListener("click", menuToggle);

function menuToggle() {
    hamburger.classList.toggle("hamburger-open");
    menu.classList.toggle("menu-open");
    document.body.classList.toggle('overflow-y-hidden');
}

menuChildren.forEach(children => {
    children.addEventListener("click", () => {
        setTimeout(menuToggle, 300);
    });
});