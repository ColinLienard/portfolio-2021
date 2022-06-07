let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".menu");
let menuContent = document.querySelector(".menu-container").children;
let menuBackground = document.querySelector(".menu-background");

let menuToggle = function() {
    if(menu.classList.length == 1) {
        for(let i = 0 ; i < menuContent.length ; i++) {
            let timeBetween = 400;
            let delay = timeBetween / 2 * i + 400;
    
            menuContent[i].style.opacity = 0;
            setTimeout(() => {
                menuContent[i].style.opacity = 1;
            }, timeBetween + delay);
    
            menuContent[i].animate([
                {
                    transform: "translateX(2rem)",
                    opacity: 0
                },
                {
                    transform: "translateX(0)",
                    opacity: 1
                }
            ], {duration: timeBetween, easing: "ease-out", delay: delay});
        }
    }

    hamburger.classList.toggle("menu-open");
    menu.classList.toggle("menu-open");
    menuBackground.classList.toggle("menu-open");
};

let scrollTo = function(destination) {
    destination.scrollIntoView({behavior: "smooth"});
};

hamburger.addEventListener("click", menuToggle);

menu.addEventListener("click", (e) => {
    let target = e.target.textContent;
    if(target == "Accueil")
        scrollTo(document.querySelector("header"));
    else if(target == "Portfolio")
        scrollTo(document.querySelector("#portfolio"));
    else if(target == "À propos de moi")
        scrollTo(document.querySelector("#about-me"));
    else if(target == "Contact")
        scrollTo(document.querySelector("#contact"));
    menuToggle();
});

menuBackground.addEventListener("click", () => {
    menuToggle();
});

document.querySelector("#button-portfolio").addEventListener("click", () => {
    scrollTo(document.querySelector("#portfolio"));
});

document.querySelector("#button-cv").addEventListener("click", () => {
    window.open("data/pdf/CV-ColinLIENARD.pdf");
});