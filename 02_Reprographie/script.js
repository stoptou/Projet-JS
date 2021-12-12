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
    }
    affichage.innerHTML =
        `<div class="alert alert-success" role ="alert">${prixtotal} €</div>`;
}

/* ---------------------------------- Appel --------------------------------- */
Boutoncalc.addEventListener("click", fc_calcul, false);