//Variables
let roue1 = d.querySelector(".roue");
let roue2 = d.querySelectorAll(".roue")[1];
let roueChoisie;
//Degré de rotation pour l'animation
let degreRotation = 0;
//No d'identifiant de la requête d'animation en cours
let requeteID = 0;

//Boutons et écouteurs d'événement
//Boutons et écouteurs d'événement
//let lesBoutons = d.querySelectorAll(".bouton");
roue1.addEventListener("click", partirOuArreterAnimation);
roue2.addEventListener("click", partirOuArreterAnimation);

//Les fonctions
function tournerRoue() {
    //Incrémenter le degré de rotation
    degreRotation += 5;

    if (roueChoisie == true) {
        roue2.style.transform = `rotate(${degreRotation}deg) scale(0.4)`;
    } else {
        roue1.style.transform = `rotate(${degreRotation}deg) scale(0.4)`;
    }
    //Partir une autre requête d'animation
    requeteID = requestAnimationFrame(tournerRoue);
}


function partirAnimation() {
    //Partir une première requête d'animation
    //SI l'animation ne jouait pas déjà
    if (requeteID == 0) {
        requeteID = requestAnimationFrame(tournerRoue);
    }
}

function arreterAnimation() {
    //Arrêter l'animation
    cancelAnimationFrame(requeteID);
    //Ajuster le no de la requête à 0
    requeteID = 0;
}

function partirOuArreterAnimation() {
    //Partir une première requête d'animation, s'il n'y a pas de requête en cours déjà
    
    if (event.target == roue2) {
        roueChoisie = true;
    } else {
        roueChoisie = false;
    }

    if (requeteID == 0) {
        requeteID = requestAnimationFrame(tournerRoue);
    } else {
        //Sinon, arrêter l'animation
        cancelAnimationFrame(requeteID);
        //Ajuster le no de la requête à 0
        requeteID = 0;
    }
}
