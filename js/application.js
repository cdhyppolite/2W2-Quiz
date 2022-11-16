/*///////////////////////////////////////////////////////////////////////
                            LES VARIABLES
///////////////////////////////////////////////////////////////////////*/

//Référence au document...pour raccourcir les scripts
let d = document;
//Le no de la prochaine question
let noQuestion = 1;
//Le nombre de bonnes réponses
let noBonnesReponses = 0;

//On met le mot quiz dans  l'interface en haut du pied de page
//avec un délai cumulatif
let elmDiv;
let compteur = 0;
for (uneLettre of "RAINBOW") {
    elmDiv = document.createElement("div");
    elmDiv.innerText = uneLettre;
    elmDiv.classList.add("lettre");

    //Gestion du délai d'animation
    elmDiv.style.animationDelay = compteur + "s";
    compteur += 0.5;

    //Le footer
    let leFooter = d.querySelector("footer");
    let noeudParent = leFooter.parentNode;
    noeudParent.insertBefore(elmDiv, leFooter);
}
document.querySelector("button").addEventListener("click", enleverIntro);