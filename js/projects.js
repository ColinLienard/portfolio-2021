let M = {
    data: null
};

let C = {
    init: function() {
        V.init();
        C.searchData(() => {
            V.renderList(M.data);
            V.handlerClick();
        });
    },

    searchData: function(callback) {
        fetch("data/json/projects.json").then((response) => {
            response.json().then((json) => {
                M.data = json;
                callback();
            });
        });
    },

    handlerPopup: function(id) {
        M.data.forEach(element => {
            if(element.title == id)
                V.renderPopup(element);
        });
    }
};

let V = {
    containerAll: undefined,
    projects: undefined,
    scrollable: undefined,
    popup: undefined,
    cross: undefined,

    template: undefined,
    popupImage: undefined,
    popupBackground: undefined,
    popupTitle: undefined,
    popupArea: undefined,
    popupSubtext: undefined,
    popupDescription: undefined,
    popupLink: undefined,

    init: function() {
        V.containerAll = document.querySelector(".containerAll");

        let template = document.querySelector("template");
        V.template = document.importNode(template.content, true);

        V.popup = V.template.querySelector(".popup");
        V.popupImage = V.template.querySelector(".popup-image");
        V.popupBackground = V.template.querySelector(".popup-background");
        V.scrollable = V.template.querySelector(".scrollable");
        V.cross = V.template.querySelector(".cross");
        V.popupTitle = V.template.querySelector(".popup-title");
        V.popupArea = V.template.querySelector(".popup-area");
        V.popupSubtext = V.template.querySelector(".popup-subtext");
        V.popupDescription = V.template.querySelector(".popup-description");
        V.popupLink = V.template.querySelector(".popup-link");

        document.querySelector("#portfolio").appendChild(V.template);
    },

    renderList: function(data) {
        data.forEach(project => {
            let projectContainer = document.createElement("li");
            let img = document.createElement("img");
            let h3 = document.createElement("h3");
            let span = document.createElement("span");

            img.src = "data/images/" + project.image;
            img.alt = "";
            h3.textContent = project.title;
            span.textContent = project.area;
            projectContainer.classList.add("project-container");
            projectContainer.classList.add("reveal");
            projectContainer.id = project.title;

            projectContainer.appendChild(img);
            projectContainer.appendChild(h3);
            projectContainer.appendChild(span);
            V.containerAll.appendChild(projectContainer);
        });
        reveal();
    },

    handlerClick: function() {
        V.projects = document.querySelectorAll(".project-container");
        V.projects.forEach(project => {
            project.addEventListener("click", () => {
                C.handlerPopup(project.id);
                V.togglePopup();
            })
        });
        V.cross.addEventListener("click", V.togglePopup);
    },

    togglePopup: function() {
        V.popup.classList.toggle("popup-visible");
        document.body.classList.toggle("no-scroll");
    },

    renderPopup: function(data) {
        let height = window.innerHeight - V.popupImage.offsetHeight;
        V.scrollable.style.height = height.toString() + "px";

        V.popupImage.src = "data/images/" + data.image;
        V.popupBackground.style.backgroundColor = data.color;
        V.popupBackground.style.height = V.popupImage.offsetHeight + "px";
        V.popupTitle.textContent = data.title;
        V.popupArea.textContent = data.area;
        V.popupSubtext.textContent = data.subtext;
        V.popupDescription.textContent = data.description;
        V.popupLink.textContent = "Lien vers " + data.title + ".";
        V.popupLink.href = data.link;
    }
};

C.init();