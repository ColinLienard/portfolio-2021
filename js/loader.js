document.body.classList.toggle("no-scroll");
let preload = document.querySelector(".preload");

window.addEventListener("load", function() {
    setTimeout(() => {
        preload.classList.add("loaded");
        document.body.classList.toggle("no-scroll");
        setTimeout(() => {
            preload.style.display = "none";
        }, 1000);
    }, 1500);
});