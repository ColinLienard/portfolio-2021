let listSoftwares = document.querySelector(".list-softwares");
let listLanguages = document.querySelector(".list-languages");
let softwares = [
    "illustrator",
    "photoshop",
    "premiere",
    "after effect",
    "indesign",
    "figma"
];
let languages = [
    "html",
    "css",
    "javascript",
    "php",
    "mysql"
];

let renderLists = function(type, array, container) {
    array.forEach(element => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let span = document.createElement("span");
    
        img.src = "data/svg/" + type + "/" + element + ".svg";
        img.alt = "";
        span.textContent = element;
    
        li.appendChild(img);
        li.appendChild(span);
        container.appendChild(li);
    });
};

renderLists("softwares", softwares, listSoftwares);
renderLists("languages", languages, listLanguages);