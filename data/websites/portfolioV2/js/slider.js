let M = {
    data: undefined,

    active: 0,
    getData: function(){
        return M.data[M.active]
    }
}

let C = {
    init: function(id){
        C.searchData(function() {
            V.render(M.getData());
        });
        V.init(id);
        C.handler_click();
    },

    searchData: function(callback) {
        fetch("data/json/projects.json").then((response) => {
            response.json().then((json) => {
                M.data = json;

                callback();
            });
        });
    },

    handler_click: function() {
        V.arrow_left.addEventListener("click", C.previous);
        V.arrow_right.addEventListener("click", C.next);
    },

    previous: function() {
        if(M.active != 0) {
            M.active--;
            V.render(M.getData());
        }
    },

    next: function() {
        if(M.active + 1 != M.data.length) {
            M.active++;
            V.render(M.getData());
        }
    }
}

let V = {
    article: undefined,
    title: undefined,
    number: undefined,
    image: undefined,
    image_link: undefined,
    description: undefined,
    link: undefined,
    arrow_left: undefined,
    arrow_right: undefined,

    init: function(id){
        let container = document.querySelector(id);
        let template = document.querySelector("template");
        V.project = document.importNode(template.content,true);

        V.article = V.project.querySelector(".project");
        V.title = V.project.querySelector("h3");
        V.number = V.project.querySelector(".project-number")
        V.image = V.project.querySelector(".image");
        V.image_link = V.project.querySelector(".image-link");
        V.description = V.project.querySelector(".description");
        V.link = V.project.querySelector(".link");
        V.arrow_left = document.getElementById("arrow_left");
        V.arrow_right = document.getElementById("arrow_right");

        container.appendChild(V.project);
    },

    render: function(data){
        V.article.classList.toggle("project-switch")

        if(M.active == 0)
            V.arrow_left.style.opacity = ".5";
        else
            V.arrow_left.style.opacity = "1";
        
        if(M.active + 1 == M.data.length)
            V.arrow_right.style.opacity = ".5";
        else
            V.arrow_right.style.opacity = "1";

        setTimeout(() => {
            V.title.textContent = data.title;
            V.number.textContent = (M.active + 1) + " / " + M.data.length;
            V.image.src = "data/images/" + data.image;
            V.image_link.href = "data/images/" + data.image;
            V.description.textContent = data.description + "\n\n";
            if(data.link != "") {
                V.link.textContent = "Lien vers " + data.title + ".";
                V.link.href = data.link;
            }
            else
                V.link.textContent = data.link;
        }, 300);
        
        setTimeout(() => {
            V.article.classList.toggle("project-switch")
        }, 300);
    },
}

C.init("#section-2");