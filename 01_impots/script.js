/* ---------------------------- Variables locale ---------------------------- */
let age;
let sexe;
let Boutoncalc = document.getElementById("bouton_calcul");
let affichage = document.getElementById("resultat");
/* -------------------------------- Fonction -------------------------------- */
function fc_calcul_impot() {

    age = document.getElementById("age_input").value;
    sexe = document.getElementById("sexe_input").value;
    // imposable si (Femme ET 35 >= age >= 18) OU (Homme ET age >=20)
    if ((sexe == "F" && age >= 18 && age <= 35) || (sexe == "H" && age >= 20)) {
        affichage.innerHTML =
            '<div class="alert alert-warning" role ="alert">Vous êtes imposable !</div>';
    } else {
        affichage.innerHTML =
            '<div class="alert alert-success" role ="alert">Vous êtes non imposable !</div>';
    }

}
// demarrage fonction sur click du "bouton_calcul"
Boutoncalc.addEventListener("click", fc_calcul_impot, false);