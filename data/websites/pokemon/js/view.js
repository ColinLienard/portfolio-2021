import C from "./controller.js";

const V = {
    cellSize: undefined,
    game: undefined,

    fightContainer: undefined,
    fightCharacter :undefined,
    opponent: undefined,
    mainCharacterInfo: undefined,
    mainCharacterLifeNumber: undefined,
    mainCharacterFullLifeNumber: undefined,
    mainCharacterLifeBar: undefined,
    opponentInfo: undefined,
    opponentName: undefined,
    opponentLifeNumber: undefined,
    opponentFullLifeNumber: undefined,
    opponentLifeBar: undefined,
    lifeBarWidth: undefined,
    panel: undefined,
    skills: undefined,
    crossSkills: undefined,

    hide: undefined,

    buttons: undefined,

    messageContainer: undefined,
    messageText: undefined,
    
    character: undefined,
    characterPos: {
        x: undefined,
        y: undefined,
        direction: undefined,
    },
    canMove: true,

    init: (cellSize) => {
        V.cellSize = cellSize;
        V.game = document.querySelector(".game");

        V.fightContainer = document.querySelector(".fight");
        V.fightCharacter = document.querySelector(".fight-character");
        V.opponent = document.querySelector(".opponent");
        V.mainCharacterInfo = document.querySelector("#mainCharacterInfo");
        V.mainCharacterLifeNumber = document.querySelector("#mainCharacterLifeNumber");
        V.mainCharacterFullLifeNumber = document.querySelector("#mainCharacterFullLifeNumber");
        V.mainCharacterLifeBar = document.querySelector("#mainCharacterLifeBar");
        V.opponentInfo = document.querySelector("#opponentInfo");
        V.opponentName = document.querySelector("#opponentName");
        V.opponentLifeNumber = document.querySelector("#opponentLifeNumber");
        V.opponentFullLifeNumber = document.querySelector("#opponentFullLifeNumber");
        V.opponentLifeBar = document.querySelector("#opponentLifeBar");
        V.panel = document.querySelector(".panel");
        V.skills = document.querySelector(".skills");
        V.crossSkills = document.querySelector(".cross-skills");

        V.hide = document.querySelector(".hide");

        V.buttons = document.querySelectorAll(".direction");

        V.messageContainer = document.querySelector(".message-container");
        V.messageText = document.querySelector(".message-text");

        V.character = document.querySelector(".character");
        V.character.style.width = V.cellSize + "px";
        
        V.game.style.width = V.game.style.height = V.messageContainer.style.width = 7 * V.cellSize + "px";
        
        V.lifeBarWidth = mainCharacterLifeBar.offsetWidth;

        // V.createGrid();
        V.goTo();

        window.addEventListener("keydown", (e) => {
            if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
                C.getDirection(e.keyCode);
        });
        V.buttons.forEach(button => {
            button.addEventListener("click", () => {
                C.getDirection(button.id);
            })
        });
        
        V.panel.addEventListener("click", (e) => {
            if(e.target.id == "attack") {
                V.skills.classList.toggle("visible");
            }
            else if(e.target.id == "flee") {
                V.endFight();
                V.message("Vous avez fui le combat...");
            }
        });
        V.skills.addEventListener("click", () => {
            V.skills.classList.toggle("visible");
        });
    },

    getRandomInt: (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    },

    /*createGrid: () => {
        for(let y = 0 ; y < 7 ; y++) {
            for(let x = 0 ; x < 7 ; x++) {
                let cell = document.createElement("div");
                cell.style.width = cell.style.height = V.cellSize + "px";
                V.game.appendChild(cell);
            }
        }
    },*/

    createMap: (map, x, y, direction) => {
        V.game.style.backgroundImage = "url(data/maps/" + map.data.image + ")";
        V.fightContainer.style.backgroundImage = "url(data/maps/" + map.data.fightScene + ")";
        if(direction) {
            V.characterPos.direction = direction;

            V.characterPos.x = x;
            V.characterPos.y = y;
            let tmp = V.character.style.transitionProperty;
            V.character.style.transitionProperty = "none";
            setTimeout(() => { V.character.style.transitionProperty = tmp; }, 300);
            V.goTo(direction);
        }

        document.querySelectorAll(".toRemove").forEach(element => {
            V.game.removeChild(element);            
        });
        
        for(let cell in map) {
            if(map[cell].character) {
                let newCharacter = document.createElement("img");
                newCharacter.src = "data/characters/" + map[cell].character + map[cell].characterDirection + ".png";
                newCharacter.classList.add("character");
                newCharacter.classList.add("toRemove");
                newCharacter.style.width = V.cellSize + "px";
                let pos = map[cell].characterPos.split(",");
                newCharacter.style.left = pos[0] * V.cellSize + "px";
                newCharacter.style.bottom = (6 - pos[1]) * V.cellSize + "px";
                
                V.game.appendChild(newCharacter);
            }
        }
        
    },

    goTo: (direction) => {
        V.character.style.left = V.characterPos.x * V.cellSize + "px";
        V.character.style.bottom = (6 - V.characterPos.y) * V.cellSize + "px";
        
        V.canMove = false;

        V.character.src = "data/characters/mainCharacter" + direction + 1 + ".png";
        setTimeout(() => { V.character.src = "data/characters/mainCharacter" + direction + 2 + ".png" }, 150);
        setTimeout(() => {
            V.character.src = "data/characters/mainCharacter" + direction + 0 + ".png";
            V.canMove = true;
        }, 300);
    },

    message: (text, fn, param1, param2) => {
        V.messageContainer.classList.add("active");
        V.canMove = false;

        V.messageText.textContent = "";
        let i = 0;
        let letterByLetter = () => {
            if(i < text.length) {
                V.messageText.textContent += text.charAt(i);
                i++;
                setTimeout(letterByLetter, 20);
            }
        }
        letterByLetter();

        let closeMessage = () => {
            V.messageContainer.classList.remove("active");
            V.canMove = true;

            if(fn) {
                if(param2) eval(fn)(param1, param2);
                else eval(fn)(param1);
            }
        }

        V.messageContainer.addEventListener("click", closeMessage, { once: true });

        /*window.addEventListener("keydown", (e) => {
            if(e.keyCode == 13) closeMessage();
        }, { once: true });*/
    },

    changeMap: (id, x, y, direction) => {
        V.canMove = false;

        V.game.classList.toggle("visible");

        setTimeout(() => {
            V.canMove = true;
            V.createMap(C.getMapData(id), x, y, direction);
            V.game.classList.toggle("visible");
        }, 1000);
    },

    fight: (opponent, opponentPos) => {
        let fightDataMainCharacter = undefined;
        let fightDataOpponent = undefined;
        let mainCharacterUp = 0;
        let opponentUp = 0;

        let green = "#18C020";
        let orange = "#FCAB00";
        let red = "#FF5508";

        let initFight = () => {
            V.canMove = false;
            
            V.panel.classList.remove("hidden");
            
            fightDataMainCharacter =  C.getFightData("mainCharacter");
            fightDataOpponent = C.getFightData(opponent);

            if(V.mainCharacterLifeNumber.textContent == "") V.mainCharacterLifeNumber.textContent = fightDataMainCharacter.life;
            V.mainCharacterFullLifeNumber.textContent = "/" + fightDataMainCharacter.life;
            V.mainCharacterLifeBar.style.backgroundColor = green;

            V.opponentName.textContent = fightDataOpponent.name;
            V.opponentLifeNumber.textContent = fightDataOpponent.life;
            V.opponentFullLifeNumber.textContent = "/" + fightDataOpponent.life;
            V.opponentLifeBar.style.width = V.lifeBarWidth + "px";
            V.opponentLifeBar.style.backgroundColor = green;
    
            let i = 0;
            let flashs = () => {
                i++;
                V.hide.style.display = "block";
                setTimeout(() => {
                    V.hide.style.display = "none";
                    setTimeout(() => {
                        if(i < 3) flashs();
                    }, 200);
                }, 100);
            }
            flashs();

            setTimeout(() => {
                V.fightContainer.classList.add("visible");
    
                V.fightCharacter.style.width = 2 * V.cellSize + "px";
                V.fightCharacter.style.bottom = V.cellSize + "px";
                V.fightCharacter.style.left = "0";
    
                V.opponent.src = "data/characters/" + opponent + "Front.png";
                V.opponent.style.width = V.cellSize + "px";
                V.opponent.style.left = 5 * V.cellSize + "px";
                V.opponent.style.bottom = 3 * V.cellSize + "px";
                
                V.panel.style.top = ".25rem";
                V.mainCharacterInfo.style.left = "-4px";
                V.opponentInfo.style.right = "-4px";
            }, 1000);

            V.skills.innerHTML = "";
            for(let element in fightDataMainCharacter.skills) {
                let skill = fightDataMainCharacter.skills[element];
                let button = document.createElement("button");
                let h4 = document.createElement("h4");
                let p = document.createElement("p");
                
                h4.textContent = skill.name;
                p.textContent = skill.description;
    
                button.appendChild(h4);
                button.appendChild(p);
                V.skills.appendChild(button);
    
                button.addEventListener("click", () => {
                    useSkill(skill);
                })
            }
        }

        let useSkill = (skill) => {
            V.panel.classList.toggle("hidden");
            V.messageContainer.classList.remove("active");

            if(skill.type == "hit") {
                hitAnimation(V.fightCharacter, true);
                getHitAnimation(V.opponent, true);

                setTimeout(() => {
                    inflictDamages(opponentLifeNumber, opponentLifeBar, fightDataOpponent, skill, mainCharacterUp);
                }, 1000);
            }
            else if(skill.type == "powerUp") {
                powerUpAnimation(V.fightCharacter);

                mainCharacterUp += skill.value;
            }
            else if(skill.type == "heal") {
                healAnimation(V.fightCharacter);

                setTimeout(() => {
                    heal(mainCharacterLifeNumber, mainCharacterLifeBar, fightDataMainCharacter, skill);
                }, 1000);
            }
            else if(skill.type == "stealLife") {
                stealLifeAnimation(V.fightCharacter, true);
                getHitAnimation(V.opponent, true);

                setTimeout(() => {
                    inflictDamages(opponentLifeNumber, opponentLifeBar, fightDataOpponent, skill, mainCharacterUp);
                    heal(mainCharacterLifeNumber, mainCharacterLifeBar, fightDataMainCharacter, skill);
                }, 1000);
            }

            setTimeout(opponentTurn, 1500);
        }

        let opponentTurn = () => {
            if(opponentLifeNumber.textContent > 0) {
                let skill = fightDataOpponent.skills["skill" + (V.getRandomInt(Object.keys(fightDataOpponent.skills).length) + 1)];
                if(mainCharacterLifeNumber.textContent <= fightDataOpponent.skills.skill1.value + opponentUp) {
                    console.log("grosse frappe");
                    skill = fightDataOpponent.skills.skill1;
                }
                else if(skill.type == "heal" && opponentLifeNumber.textContent == fightDataOpponent.life) {
                    console.log("no heal");
                    for(let element in fightDataOpponent.skills) {
                        if(fightDataOpponent.skills[element].type == "powerUp")
                            skill = fightDataOpponent.skills[element];
                    }
                }

                let message = fightDataOpponent.name + " utilise " + skill.name + " ! ";

                if(skill.type == "hit") {
                    let exactNumber = skill.description.replace("*", skill.value + opponentUp);
                    message += exactNumber;
                    hitAnimation(V.opponent, false);
                    getHitAnimation(V.fightCharacter, false);

                    setTimeout(() => {
                        inflictDamages(mainCharacterLifeNumber, mainCharacterLifeBar, fightDataMainCharacter, skill, opponentUp);
                    }, 1000);
                }
                else if(skill.type == "powerUp") {
                    message += skill.description;
                    powerUpAnimation(V.opponent);

                    opponentUp += skill.value;
                }
                else if(skill.type == "heal") {
                    message += skill.description;
                    healAnimation(V.opponent);

                    setTimeout(() => {
                        heal(opponentLifeNumber, opponentLifeBar, fightDataOpponent, skill);
                    }, 1000);
                }

                V.message(message);

                setTimeout(() => { V.panel.classList.toggle("hidden") }, 1500);
            }
        }

        let inflictDamages = (characterLifeNumber, characterLifeBar, fightData, skill, characterUp) => {
            let newLifeNumber = characterLifeNumber.textContent - (skill.value + characterUp);
            let numberByNumber = () => {
                if(characterLifeNumber.textContent > newLifeNumber) {
                    characterLifeNumber.textContent--;
                    setTimeout(numberByNumber, 10);
                }
            }
            numberByNumber();

            let bar = characterLifeBar.offsetWidth - V.lifeBarWidth * ((skill.value + characterUp) / fightData.life);
            if(newLifeNumber > 0) {
                characterLifeBar.style.width = bar + "px";

                if(newLifeNumber <= fightData.life / 2) {
                    if(newLifeNumber <= fightData.life / 4) characterLifeBar.style.backgroundColor = red;
                    else characterLifeBar.style.backgroundColor = orange;
                }
            }
            else {
                characterLifeBar.style.width = "0";
                if(fightData.name != "Vous") opponentDie();
                else mainCharacterDie();
            }
        }

        let heal = (characterLifeNumber, characterLifeBar, fightData, skill) => {
            let newLifeNumber = parseInt(characterLifeNumber.textContent) + parseInt(skill.value);

            if(newLifeNumber >= fightData.life) {
                let numberByNumber = () => {
                    if(characterLifeNumber.textContent < fightData.life) {
                        characterLifeNumber.textContent++;
                        setTimeout(numberByNumber, 10);
                    }
                }
                numberByNumber();
                characterLifeBar.style.width = V.lifeBarWidth + "px";
            }
            else {
                let numberByNumber = () => {
                    if(characterLifeNumber.textContent < newLifeNumber) {
                        characterLifeNumber.textContent++;
                        setTimeout(numberByNumber, 10);
                    }
                }
                numberByNumber();
                let bar = characterLifeBar.offsetWidth + V.lifeBarWidth * (skill.value / fightData.life);
                characterLifeBar.style.width = bar + "px";
                
                if(characterLifeNumber.textContent > fightData.life / 4) {
                    if(characterLifeNumber.textContent > fightData.life / 2) characterLifeBar.style.backgroundColor = green;
                    else characterLifeBar.style.backgroundColor = orange;
                }
            }
        }

        let opponentDie = () => {
            dieAnimation(V.opponent);
            setTimeout(() => {
                V.message("Vous avez remporté le duel !");
                V.endFight();
            }, 1500);

            C.deleteCharacter(opponentPos);
        }

        let mainCharacterDie = () => {
            console.log("Tu es mort.");
            dieAnimation(V.fightCharacter);
        }

        let hitAnimation = (character, byPlayer) => {
            let a = "";
            let b = "";
            if(byPlayer == true) { a = "-"; b = "+"; }
            else { a = "+"; b = "-"; }
            character.animate([
                { transform: "translateX(" + a + ".25rem)" },
                { transform: "translateX(" + a + ".5rem)" },
                { transform: "translateX(" + a + ".75rem)" },
                { transform: "translateX(" + a + "1rem)" },
                { transform: "translateX(" + b + "2rem)" },
                { transform: "translateX(" + b + "1rem)" },
                { transform: "translateX(0)" }
            ], {duration: 1000});
        }
    
        let getHitAnimation = (character, byPlayer) => {
            let a = "";
            if(byPlayer == true) a = "+";
            else a = "-";
            character.animate([
                {
                    filter: "none",
                    transform: "translateX(0)"
                },
                {
                    filter: "invert(.4) grayscale(1) brightness(.4) sepia(1) hue-rotate(-50deg) saturate(4) contrast(2)",
                    transform: "translateX(" + a + "1rem)"
                },,
                {
                    filter: "none",
                    transform: "translateX(" + a + ".5rem)"
                },
                {
                    transform: "translateX(0)"
                }
            ], {duration: 300, delay: 1000});
        }

        let powerUpAnimation = (character) => {
            character.animate([
                {
                    filter: "none",
                    transform: "translateY(0)"
                },
                {
                    filter: "brightness(1.5) grayscale(.5)",
                    transform: "translateY(-.5rem)"
                },
                {
                    filter: "none",
                    transform: "translateY(0)"
                },
                {
                    filter: "brightness(1.5) grayscale(.5)",
                    transform: "translateY(-.5rem)"
                },
                {
                    filter: "none",
                    transform: "translateY(0)"
                },
            ], {duration: 1000});
        }

        let healAnimation = (character) => {
            character.animate([
                {
                    filter: "none",
                    transform: "scale(1)"
                },
                {
                    filter: "brightness(1.5) saturate(4)",
                    transform: "scale(1.05)"
                },
                {
                    filter: "none",
                    transform: "scale(1)"
                },
                {
                    filter: "brightness(1.5) saturate(4)",
                    transform: "scale(1.05)"
                },
                {
                    filter: "none",
                    transform: "scale(1)"
                },
            ], {duration: 1000});
        }
    
        let stealLifeAnimation = (character, byPlayer) => {
            let a = "";
            let b = "";
            if(byPlayer == true) { a = "-"; b = "+"; }
            else { a = "+"; b = "-"; }
            character.animate([
                { transform: "translateX(" + a + ".25rem)" },
                {
                    transform: "translateX(" + a + ".5rem)",
                    filter: "none"
                },
                { transform: "translateX(" + a + ".75rem)" },
                {
                    transform: "translateX(" + a + "1rem)",
                    filter: "brightness(1) saturate(3)",
                },
                {
                    transform: "translateX(" + b + "2rem)",
                    filter: "brightness(1.5) saturate(4)",
                },
                { transform: "translateX(" + b + "1rem)" },
                {
                    transform: "translateX(0)",
                    filter: "none"
                }
            ], {duration: 1000});
        }
    
        let dieAnimation = (character) => {
            character.animate([
                {
                    transform: "translateY(0) rotate(0)",
                    opacity: 1
                },
                {
                    transform: "translateY(100%) rotate(30deg)",
                    opacity: 0
                }
            ], {duration: 2000});
        }

        initFight();
    },

    endFight: () => {
        V.fightContainer.classList.remove("visible");
        V.fightCharacter.style.left = "-30%";
        V.opponent.style.left = "100%";
        V.panel.style.top = "-30%";
        V.mainCharacterInfo.style.left = "-60%";
        V.opponentInfo.style.right = "-60%";
    }
};

export default V;