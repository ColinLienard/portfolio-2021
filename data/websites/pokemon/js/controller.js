import V from "./view.js";
import M from "./model.js";

const C = {
    init: (cellSize) => {
        V.init(cellSize);
        V.createMap(M[M.currentMap], "6", "3", "Left");
    },

    /*getPos: function(e) {
        let characterPos = e.target.id.split(",");
        let x = characterPos[0];
        let y = characterPos[1];

        V.goTo(x, y);
    },*/

    getDirection: (direction) => {
        if(V.canMove) {
            let tmpX = V.characterPos.x;
            let tmpY = V.characterPos.y;

            if(direction == 37 && V.characterPos.x != 0) {
                tmpX--;
                V.characterPos.direction = "Left";
                V.character.src = "data/characters/mainCharacterLeft0.png";
            }
            else if(direction == 38 && V.characterPos.y != 0) {
                tmpY--;
                V.characterPos.direction = "Back";
                V.character.src = "data/characters/mainCharacterBack0.png";
            }
            else if(direction == 39 && V.characterPos.x != 6) {
                tmpX++;
                V.characterPos.direction = "Right";
                V.character.src = "data/characters/mainCharacterRight0.png";
            }
            else if(direction == 40 && V.characterPos.y != 6) {
                tmpY++;
                V.characterPos.direction = "Front";
                V.character.src = "data/characters/mainCharacterFront0.png";
            }

            let newPos = M[M.currentMap][tmpX + "," + tmpY];
            if(!newPos || newPos.go) {
                V.characterPos.x = tmpX;
                V.characterPos.y = tmpY;
                V.goTo(V.characterPos.direction);
            }
            else if(newPos.function) {
                if(newPos.character) {
                    if(V.characterPos.direction == "Front") M[M.currentMap][tmpX + "," + tmpY].characterDirection = "Back";
                    if(V.characterPos.direction == "Back") M[M.currentMap][tmpX + "," + tmpY].characterDirection = "Front";
                    if(V.characterPos.direction == "Left") M[M.currentMap][tmpX + "," + tmpY].characterDirection = "Right";
                    if(V.characterPos.direction == "Right") M[M.currentMap][tmpX + "," + tmpY].characterDirection = "Left";
                    V.createMap(M[M.currentMap]);
                }
                // if(newPos.param.includes("_")) {
                //     let params = newPos.param.split("_");
                //     eval(newPos.function)(params[0], params[1]);
                // }
                if(newPos.param4) eval(newPos.function)(newPos.param, newPos.param2, newPos.param3, newPos.param4);
                else if(newPos.param3) eval(newPos.function)(newPos.param, newPos.param2, newPos.param3);
                else if(newPos.param2) eval(newPos.function)(newPos.param, newPos.param2);
                else eval(newPos.function)(newPos.param);
            }
        }
    },

    getMapData: (id) => {
        M.currentMap = id;
        return M[id];
    },

    getFightData: (id) => {
        return M["fightData_" + id];
    },

    deleteCharacter: (opponentPos) => {
        delete M[M.currentMap][opponentPos];
        V.createMap(M[M.currentMap]);
    }
};

export default C;