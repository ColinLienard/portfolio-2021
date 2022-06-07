let params = new URLSearchParams(window.location.search);

if(params.get("mailsend") == "yes") {
    let form = document.querySelector("form");
    let response = document.querySelector(".mailsend");
    form.style.display = "none";
    response.textContent = "Votre e-mail a bien été envoyé !";
    response.style.display = "block";
}

else if(params.get("mailsend") == "no") {
    let response = document.querySelector(".mailsend");
    response.textContent = "Veuillez remplir tous les champs !";
    response.style.display = "block";
}

else if(params.get("mailsend") == "specialcharacters") {
    let response = document.querySelector(".mailsend");
    response.textContent = "Veuillez ne pas utiliser de caractères spéciaux.";
    response.style.display = "block";
}

else if(params.get("mailsend") == "problem") {
    let response = document.querySelector(".mailsend");
    response.textContent = "Il y a eu un problème...";
    response.style.display = "block";
}
