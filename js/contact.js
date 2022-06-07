let params = new URLSearchParams(window.location.search);

if(params.get("mailsend") == "yes") {
    document.querySelector("#mailsend").textContent = "Message envoyé !";
    document.querySelector("#contact").scrollIntoView();
    alert("Votre message a bien été envoyé.");
}

else if(params.get("mailsend") == "no") {
    document.querySelector("#mailsend").textContent = "Il y a eu un problème...";
    document.querySelector("#contact").scrollIntoView();
}