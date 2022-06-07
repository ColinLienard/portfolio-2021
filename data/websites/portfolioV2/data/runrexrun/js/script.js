let container = undefined;
let game = undefined;
let dino = undefined;
let winds = undefined;
let gameOver = undefined;
let winText = undefined;
let cactus = undefined;
let cactusAnimation = undefined;
let button = undefined;
let score = undefined;
let bestScore = undefined;
let scoreValue = 0;
let bestScoreValue = 0;

let gameStarted = "no";
let jumpReady = true;

let runInterval = undefined;
let runTimeout = undefined;
let birdInterval = undefined;
let birdTimeout = undefined;
let runCactusTimeout = undefined;
let scoreInterval = undefined;
let isAliveInterval = undefined;

let init = function() {
    container = document.querySelector(".container");
    game = document.querySelector(".game");
    dino = document.querySelector(".dino");
    winds = document.querySelectorAll(".wind");
    gameOver = document.querySelector("#gameOver");
    winText = document.querySelector("#win");
    cactus = document.querySelector(".cactus");
    button = document.querySelector("button");
    score = document.querySelector("#score");
    bestScore = document.querySelector("#bestScore");
    
    // localStorage.clear();
    if(localStorage.getItem("bestScore"))
        bestScoreValue = localStorage.getItem("bestScore");
    bestScore.textContent = bestScoreValue;

    game.addEventListener("touchstart", jump);
    game.addEventListener("mousedown", jump);
    document.body.addEventListener("keydown", (e) => {
        if(e.keyCode == "32")
            jump();
    });
    button.addEventListener("click", () => {
        button.blur();
        endGame();
    });
};

let randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

let jump = function() {
    if(gameStarted == "no") {
        container.style.backgroundColor = "#A9EBFF";
        winds.forEach(wind => {
            wind.style.display = "block";
        });
        scoreValue = 0;
        scoreInterval = setInterval(() => {
            scoreValue++;
            score.textContent = scoreValue;
            if(scoreValue == 1000)
                win();
        }, 100);
        runCactus();
        isAliveInterval = setInterval(isAlive, 10);
        dino.classList.remove("dino-dead");
        gameOver.style.opacity = 0;
        button.textContent = "Recommencer";
        gameStarted = "yes";
    }
    if(jumpReady == true) {
        jumpReady = false;
        runStop();
        dino.classList.add("dino-jump");
        setTimeout(() => {
            dino.classList.remove("dino-jump");
        }, 300);
        setTimeout(() => {
            if(gameStarted == "yes")
                runStart();
            jumpReady = true;
        }, 600);
    }
};

let runStart = function() {
    let run = function() {
        dino.src = "data/dinoRun1.svg";
        runTimeout = setTimeout(() => {
            dino.src = "data/dinoRun2.svg";
        }, 150);
    }
    run();
    runInterval = setInterval(run, 300);
};

let runStop = function() {
    clearInterval(runInterval);
    clearTimeout(runTimeout);
    dino.src = "data/dino.svg";
};

let runCactus = function() {
    cactus.style.display = "block";
    let duration = 1600;
    let timeBetween = 0;
    let value = 0;

    let start = function() {
        let random = randomNumber(1, 7);
        clearInterval(birdInterval);
        clearTimeout(birdTimeout);
        
        if(random < 4) {
            cactus.src = "data/cactus1.svg";
            cactus.style.width = "23px";
            cactus.style.bottom = "0";
        }
        else if(random < 6) {
            cactus.src = "data/cactus2.svg";
            cactus.style.width = "48px";
            cactus.style.bottom = "0";
        }
        else if(random == 6 && scoreValue > 200) {
            cactus.src = "data/bird.svg";
            cactus.style.width = "42px";
            cactus.style.bottom = "80px";
            
            let run = function() {
                cactus.src = "data/bird1.svg";
                birdTimeout = setTimeout(() => {
                    cactus.src = "data/bird2.svg";
                }, 150);
            }
            run();
            birdInterval = setInterval(run, 300);
        }

        if(scoreValue < 200)
            value = 40;
        else if(scoreValue < 300)
            value = 12;
        else if(scoreValue > 500)
            value = 0;
        duration -= value;
        timeBetween = duration + 200;

        runCactusTimeout = setTimeout(() => {
            cactusAnimation = cactus.animate([
                {
                    left: "100%",
                },
                {
                    left: "-10%",
                }
            ], {duration: duration});

            backgroundColor();
            start();
        }, timeBetween);
    }
    start();
};

let backgroundColor = function() {
    if(scoreValue > 200 && scoreValue < 500)
        container.style.backgroundColor = "#98FF96";
    else if(scoreValue > 500)
        container.style.backgroundColor = "#FFD2A9";
};

let isAlive = function() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let cactusWidth = parseInt(window.getComputedStyle(cactus).getPropertyValue("width"));
    let cactusHeight = parseInt(window.getComputedStyle(cactus).getPropertyValue("height"));

    if(cactusWidth == 23) {
        if(cactusLeft < 48 && cactusLeft > 8 && dinoBottom <= cactusHeight)
            endGame();
    }
    else if(cactusWidth == 48) {
        if(cactusLeft < 48 && cactusLeft > -12 && dinoBottom <= cactusHeight)
            endGame();
    }
    else {
        if(cactusLeft < 48 && cactusLeft > -30 && dinoBottom >= 52)
            endGame();
    }
};

let endGame = function() {
    if(gameStarted == "yes") {
        gameStarted = "no";
        winds.forEach(wind => {
            wind.style.display = "none";
        });
        runStop();
        clearTimeout(runCactusTimeout);
        clearInterval(scoreInterval);
        clearInterval(isAliveInterval);
        if(scoreValue > bestScoreValue) {
            bestScoreValue = scoreValue;
            bestScore.textContent = bestScoreValue;
            localStorage.setItem("bestScore", bestScoreValue);
        }
        cactus.style.display = "none";
        cactus.style.left = "100%";
        dino.classList.add("dino-dead");
        gameOver.style.opacity = 1;
    }
    else if(gameStarted == "no") {
        jump();
    }
    else if(gameStarted == "win") {
        gameStarted = "no";
        winds.forEach(wind => {
            wind.style.display = "none";
        });
        runStop();
        container.style.backgroundColor = "#A9EBFF";
        winText.style.opacity = 0;
    }
};

let win = function() {
    gameStarted = "win";
    clearTimeout(runCactusTimeout);
    clearInterval(scoreInterval);
    clearInterval(isAliveInterval);
    bestScore.textContent = "1000";
    localStorage.setItem("bestScore", 1000);
    cactus.style.display = "none";
    winText.style.opacity = 1;
};

init();