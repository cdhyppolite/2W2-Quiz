
let etoileAnim = document.querySelector(".etoileAnim");

//Écouteur sur la scène sur le mousemove
window.addEventListener("mousemove", deplacerEtoile);

function deplacerEtoile(event) {
    //L'étoile suit les coordonnées de la souris
    etoileAnim.style.left = event.clientX + "px";
    etoileAnim.style.top = event.clientY + "px";
}
