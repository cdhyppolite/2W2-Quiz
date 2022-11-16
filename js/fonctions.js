/*///////////////////////////////////////////////////////////////////////
                            LES FONCTIONS
///////////////////////////////////////////////////////////////////////*/

function enleverIntro() {
    //On enlève le conteneur de l'intro

    let intro = document.querySelector("main.intro");
    intro.parentNode.removeChild(intro);

    //On enlève l'écouteur qui gère la fin de l'intro et le bouton
    d.querySelector("button").removeEventListener("click", enleverIntro);
    let bouton = document.querySelector("button");
    bouton.parentNode.removeChild(bouton);

    //On met le conteneur du quiz visible
    d.querySelector(".quiz").style.display = "block";

    //On affiche la première question
    afficherQuestion(quiz.question1);
}

function afficherQuestion(question) {
    //On récupère les balises où seront affichées les infos
    let quiz = document.querySelector("main.quiz");
    let section = document.querySelector("section");

    //Titre
    let titreQuestion = document.getElementById("titreQuestion");
    titreQuestion.innerHTML = question.texte;

    //Choix
    let unChoix;
    let texteDuChoix;

    //Les choix de réponse
    let nbReponses = question.choix.length;
    let lesChoixDeReponses = d.querySelector("#lesChoix");

    //Modifier la position sur l'axe des Y et l'opacité
    section.classList.remove("afficherSection");
    //Faire réaparaître le texte par le bas
    setTimeout(questionVisible, 125);

    //Boucle for pour récupérer la valeur des choix de réponses 
    for (let i = 0; i < question.choix.length; i++) {

        //on crée un élément choix
        unChoix = d.createElement("div");
        //on créé un objet texte pour le choix
        texteDuChoix = d.createTextNode(question.choix[i]);
        //ajout du texte comme enfant
        unChoix.appendChild(texteDuChoix);
        //ajout d'une classe choix
        unChoix.classList.add("choix");

        unChoix.style.backgroundColor = "#e5e5e5";
        //si c'est la bonne réponse...
        if (i == question.bonneReponse) {
            //affecte la valeur vraie
            unChoix.reponse = true;
        } else {
            //..sinon affecte la valeur fausse
            unChoix.reponse = false;
        }

        //On met un écouteur pour vérifier la réponse choisie
        unChoix.addEventListener("mousedown", verifierReponse);
        lesChoixDeReponses.appendChild(unChoix);
    }

    //Ajuster les cases
    if (nbReponses == 2) {
        d.querySelectorAll(".choix")[0].style.gridColumn = "1 / span 2";
        d.querySelectorAll(".choix")[1].style.gridColumn = "1 / span 2";
    } else if (nbReponses == 3) {
        d.querySelectorAll(".choix")[2].style.gridColumn = "1 / span 2";
    }
    d.querySelector("body").style.backgroundImage = "url('images/rainbowRoad" + noQuestion + ".jpg')";
}

function questionVisible() {
    document.querySelector("section").classList.add("afficherSection");
}

function verifierReponse(event) {

    let lesChoix = d.querySelectorAll(".choix");

    //si c'est la bonne réponse...
    if (event.target.reponse) {
        //ajoute 1 au compteur de bonnes réponses
        noBonnesReponses++;
        //Augementer la barre de bonnes réponses
        let pourcentage = (noBonnesReponses / quiz.nbQuestions) * 100;
        d.querySelector(".barreReponse").style.width = pourcentage + "vw";
        //affiche feedback positif
        event.target.classList.add("bonChoix");
        event.target.style.backgroundColor = "";
    } else {
        //sinon affiche feedback négatif
        event.target.classList.add("mauvaisChoix");
        event.target.style.backgroundColor = "";
        lesChoix[quiz["question" + noQuestion].bonneReponse].classList.add("bonChoix");
        lesChoix[quiz["question" + noQuestion].bonneReponse].style.backgroundColor = "";

        //Augementer la barre de mauvaises réponses
        let tailleErreur = (1 / quiz.nbQuestions) * 100;
        let tailleActuel = (d.querySelector(".barreErreur").style.width).replaceAll("vw", "");
        d.querySelector(".barreErreur").style.width = Number(tailleActuel) + Number(tailleErreur) + "vw";
    }

    //empêche d'autres choix
    for (let unChoix of lesChoix) {
        unChoix.removeEventListener("mousedown", verifierReponse);
    }

    //affiche message pour continuer
    d.querySelector("footer").innerHTML += "<p>Cliquez ici pour continuer</p>";
    //pour permettre la suite
    d.querySelector("footer").addEventListener("click", gererProchaineQuestion);
}

function gererProchaineQuestion() {
    //vide pied de page
    d.querySelector("footer p").parentNode.removeChild(d.querySelector("footer p"));
    //enlève l'écouteur
    d.querySelector("footer").removeEventListener("click", gererProchaineQuestion);

    //On incrémente le no de la prochaine question à afficher
    noQuestion++;

    //dans tous les cas, on enlève les choix
    let aEnlever = d.querySelectorAll(".choix");
    let leurParent = aEnlever[0].parentNode;

    while (leurParent.hasChildNodes()) {
        //console.log(leurParent.firstChild);
        leurParent.removeChild(leurParent.firstChild);
    }

    //S'il reste une question on l'affiche, sinon c'est la fin du jeu...
    if (noQuestion <= quiz.nbQuestions) {
        //On identifie la prochaine question et on l'affiche

        document.querySelector("section").classList.remove("afficherSection");
        let prochaineQuestion = quiz["question" + noQuestion];
        afficherQuestion(prochaineQuestion);
    } else {
        afficherFinJeu();
    }
}

function afficherFinJeu() {

    //On enlève le quiz de l'affichage et on affiche la fin du jeu
    d.querySelector(".afficherSection").style.visibility = "hidden";

    //Message de résultat
    let leResultat;

    //on affiche le score
    leResultat = `<p>Vous avez obtenu ${noBonnesReponses} bonnes réponses sur ${quiz.nbQuestions}</p>`

    //on vérifie le meilleur score et on l'affiche
    //on sauvegarde le meilleur score si nécessaire

    let meilleurScore = localStorage.getItem("leMeilleur");

    if (meilleurScore == null) {
        leResultat += `<p>C'est un record!!</p>`
        localStorage.setItem("leMeilleur", noBonnesReponses);
    }

    if (meilleurScore < noBonnesReponses) {
        leResultat += `<p>C'est un record!!</p>`
        localStorage.setItem("leMeilleur", noBonnesReponses)
    } else {
        leResultat += `<p>Le meilleur résultat est: ${meilleurScore}</p>`
    }

    d.querySelector("#fin").innerHTML = leResultat;

    if (noBonnesReponses <= 1) {
        d.querySelector("#fin").innerHTML = (d.querySelector("#fin").innerHTML).replaceAll("bonnes réponses", "bonne réponse");
    }



    //on offre la possibilité de reprendre le quiz
    let unBouton = d.createElement("button");
    let sonTexte = d.createTextNode("Cliquez ici pour recommencer");
    unBouton.appendChild(sonTexte);
    unBouton.addEventListener("click", pourRecommencer);
    d.querySelector("footer").appendChild(unBouton);

    //..et on affiche le tout
    d.querySelector("#fin").style.visibility = "visible";
}

function pourRecommencer() {
    //Ré-initialisation
    noQuestion = 1;
    noBonnesReponses = 0;
    d.querySelector(".barreReponse").style.width = "0vw";
    d.querySelector(".barreErreur").style.width = "0vw";
    afficherQuestion(quiz.question1);

    //vide et cache la fin
    let laFin = d.querySelector("#fin");
    while (laFin.hasChildNodes()) {
        laFin.removeChild(laFin.firstChild);
    }
    laFin.style.visibility = "hidden";

    let bouton = document.querySelector("button");
    bouton.parentNode.removeChild(bouton);

    //On affiche la première question
    document.querySelector("section").style.visibility = "visible";
}