/* ---------------------------- Variables  ---------------------------- */
let affichage = document.getElementById("resultat");
let img = document.getElementById("obj_img");
let nom = document.getElementById("obj_nom");
let bouton_calcul = document.getElementById("bouton_calcul");
let bouton_lancement = document.getElementById("bouton_lancement");
let prix;
let prix_joueur;
let nb_random;
let nb_tentatives;
let obj_no;
let obj_last;
let objet_nom = ['Chaise', 'Costume d\'halloween', 'Barbecue', 'Guitare', 'Sac à main'];
let objet_img = ['chaise.png', 'costume-haloween.png', 'grill.png', 'guitare.png', 'sac-a-main.png'];
var audio_gagne = new Audio("./sounds/gagne.mp3");
var audio_perdu = new Audio("./sounds/perdu.mp3");
/* ----------------------------- Initialisation du jeu ---------------------------- */
function fc_lancement() {
    while (obj_no == obj_last) {
        obj_no = gen_random(5); // tirage d'un objet au hasard (si le même que précédent on retire)
    }
    nb_tentatives = 0;
    prix = gen_random(100) + 1; // generation d'un prix aleatoire
    console.log("le prix de l'objet est: " + prix);
    //console.log(obj_no);
    nom.innerHTML =
        ` <div>${objet_nom[obj_no]} </div>`; // affichage nom
    img.innerHTML =
        ` <img class="couche img-fluid rounded d-block mx-auto"  src=./images/${objet_img[obj_no]} alt=${objet_nom[obj_no]} width=65%>`; // affichage image
    obj_last = obj_no;
    affichage.innerHTML =
        `<div class="alert alert-dark bg-black" role ="alert"></div>`;
}
/* -------------------------------- fonction verification -------------------------------- */
function fc_verification() {
    prix_joueur = document.getElementById("input_prix").value;
    nb_tentatives++;
    if (prix_joueur == prix) {
        affichage.innerHTML =
            `<div class="alert alert-success " role ="alert"><strong>BRAVO !   ${prix_joueur}   € était le prix exact (tentative no.${nb_tentatives})
             Relancez le jeu</strong></div>`;
        audio_gagne.play();
    } else {
        affichage.innerHTML =
            `<div class="alert alert-info " role ="alert"><strong>Continuez !   ${prix_joueur}   € n'est pas le prix exact (tentative no.${nb_tentatives})</strong></div>`;
        audio_perdu.play();
    }

    if (nb_tentatives > 9) {
        affichage.innerHTML =
            `<div class="alert alert-warning " role ="alert"><strong>PERDU ! vous avez epuisé vos 10 tentatives</strong></div>`;
        audio_perdu.play();
    }
}
/* ---------------- fonction génération d'un nombre aléatoire --------------- */
function gen_random(max) {
    return Math.floor(Math.random() * Math.floor(max))
}
/* ---------------------------------- Appel fonction sur click --------------------------------- */

bouton_calcul.addEventListener("click", fc_verification, false);
bouton_lancement.addEventListener("click", fc_lancement, false);