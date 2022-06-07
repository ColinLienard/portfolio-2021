let M = {
    map1: {
        data: {
            image: "map1.png",
            fightScene: "fight1.png"
        },
        "3,0": {},
        "3,1": {},
        "2,2": {
            function: "V.message",
            param: "Voici le message."
        },
        "3,3": {},
        "3,4": {},
        "3,5": {},
        "2,5": {},
        "1,5": {
            function: "V.changeMap",
            param: "map2",
            param2: "0",
            param3: "0",
            param4: "Back"
        },
        "5,6": {
            character: "thief",
            characterDirection: "Front",
            characterPos: "5,6",
            function: "V.message",
            param: "Battons-nous FDP.",
            param2: "V.fight",
            param3: "thief",
            param4: "5,6"
        },
        "0,5": {},
        "6,0": {},
        "6,1": {},
        "6,5": {},
        "6,6": {}
    },

    map2: {
        data: {
            image: "map2.png",
            fightScene: "fight2.png"
        },
        "3,3": {
            character: "thief",
            characterDirection: "Front",
            characterPos: "3,3",
            function: "V.message",
            param: "Tu es petit.",
        },
        "6,0": {
            function: "V.changeMap",
            param: "map1",
            param2: "1",
            param3: "6",
            param4: "Front"
        }
    },

    fightData_mainCharacter: {
        name: "Vous",
        life: 100,
        skills: {
            skill1: {
                name: "Frappe",
                description: "Inflige 30pt de dégâts à l'adversaire.",
                type: "hit",
                value: 30
            },
            skill2: {
                name: "Rengorgement",
                description: "Procure +10pt de dégâts pendant ce combat.",
                type: "powerUp",
                value: 10
            },
            skill3: {
                name: "Auto-soin",
                description: "Soigne votre vie à hauteur de 20pv.",
                type: "heal",
                value: 20
            },
            skill4: {
                name: "Vol de vie",
                description: "Inflige 10pt de dégâts et vous restaure 10pv.",
                type: "stealLife",
                value: 10
            }
        }
    },

    fightData_thief: {
        name: "Voleur",
        life: 80,
        skills: {
            skill1: {
                name: "Coup de poing",
                description: "Il inflige *pt de dégâts.",
                type: "hit",
                value: 15
            },
            skill2: {
                name: "Rengorgement",
                description: "Il augmente son attaque de +5pt.",
                type: "powerUp",
                value: 5
            },
            skill3: {
                name: "Auto-soin",
                description: "Il se soigne à hauteur de 20pv.",
                type: "heal",
                value: 20
            }
        }
    },

    currentMap: "map1"
};

export default M;