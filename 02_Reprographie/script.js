/* ---------------------------- Variables locale ---------------------------- */
let nbcopies;
let prixtotal;
let Boutoncalc = document.getElementById("bouton_calcul");
let affichage = document.getElementById("resultat");
/* -------------------------------- Fonction -------------------------------- */
function fc_calcul() {
    nbcopies = document.getElementById("nb_input").value;
    if (nbcopies <= 10) {
        prixtotal = (nbcopies) * 0.1;
    } else {
        if (nbcopies <= 30) {
            prixtotal = (nbcopies - 10) * 0.09 + 1;
        } else {
            prixtotal = (nbcopies - 30) * 0.08 + 2.8;
        }
        prixtotal = strip(prixtotal);
    }
    affichage.innerHTML =
        `<div class="alert alert-success" role ="alert">${prixtotal} €</div>`;
}
/* ----------------------------- Fonction strip ----------------------------- */
// Parfois on se retrouve avec de très nombreuses décimales (ex: 2.34999999999 au lieu de  2.35)
// cette fonction résoud le problème
function strip(number) {
    return (parseFloat(number).toFixed(2));
}
/* ---------------------------------- Appel --------------------------------- */
Boutoncalc.addEventListener("click", fc_calcul, false);