/* ---------------------------- Variables locale ---------------------------- */
let age_input;
let sexe_input;
let Boutoncalc = document.getElementById("bouton_calcul");
let affichage = document.getElementById("resultat");
/* -------------------------------- Fonction -------------------------------- */
function fc_calcul_impot() {

    age_input = document.getElementById("age_input").value;
    sexe_input = document.getElementById("sexe_input").value;
    // imposable si (Femme ET 35 >= age >= 18) OU (Homme ET age >=20)
    if ((sexe_input == "F" && age_input >= 18 && age_input <= 35) || (sexe_input == "H" && age_input >= 20)) {
        affichage.innerHTML =
            '<div class="alert alert-warning" role ="alert">Vous êtes imposable !</div>';
    } else {
        affichage.innerHTML =
            '<div class="alert alert-success" role ="alert">Vous êtes non imposable !</div>';
    }
}
// demarrage fonction sur click du "bouton_calcul"
Boutoncalc.addEventListener("click", fc_calcul_impot, false);