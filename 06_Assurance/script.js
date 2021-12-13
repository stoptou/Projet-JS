/* ---------------------------- Variables  ---------------------------- */
let affichage = document.getElementById("resultat");
let age;
let duree_permis;
let accidents;
let client_depuis;
let bonus;
let tarif = 0;

/* -------------------------------- Fonction -------------------------------- */
function fc_verification() {
    age = document.getElementById("age").value;
    duree_permis = document.getElementById("nb_annees_permis").value;
    accidents = document.getElementById("nb_accidents").value;
    client_depuis = document.getElementById("nb_annees_ass").value;
    let plusde25ans = +(age > 25); // le "+" devant permet de TRANSFORMER LE BOOLEAN EN INTEGER (False/true en 0/1)  
    let conducteurconfirme = +(duree_permis > 2); // pour pouvoir me passer des test "if" par la suite
    let clientplusunan = +(client_depuis > 1);

    bonus = (1 * plusde25ans + 1 * conducteurconfirme + 1 * clientplusunan) - accidents; // TESTS REMPLACÉS PAR OPÉRATIONS

    //console.log("+25 : confirmé : +1an     " + plusde25ans + ":" + conducteurconfirme + ":" + clientplusunan + "     bonus =  " + bonus);

    if (accidents <= 3) {
        switch (bonus) {
            case 3:
                tarif = "BLEU";
                couleur = 0x00bfff;
                affichage.innerHTML =
                    `<div class="alert alert-primary bg-primary" role ="alert"><strong>${tarif}</strong></div>`;
                break;
            case 2:
                tarif = "VERT";
                couleur = 0x4de619;
                affichage.innerHTML =
                    `<div class="alert alert-success bg-success" role ="alert"><strong>${tarif}</strong></div>`;
                break;
            case 1:
                tarif = "ORANGE";
                couleur = 0xff9900;
                affichage.innerHTML =
                    `<div class="alert alert-warning bg-warning" role ="alert"><strong>${tarif}</strong></div>`;
                break;
            case 0:
                tarif = "ROUGE";
                couleur = 0xff0000;
                affichage.innerHTML =
                    `<div class="alert alert-danger bg-danger" role ="alert"><strong>${tarif}</strong></div>`;
                break;
            case -1:
                tarif = "REFUSE";
                couleur = 0x0000;
                affichage.innerHTML =
                    `<div class="alert alert-dark bg-black" role ="alert"><strong>${tarif}</strong></div>`;
                break;
            default:
        }

    } else {
        tarif = "REFUSE"; // refusé s'il a eu plus de 3 accidents
        couleur = 0x0000;
        affichage.innerHTML =
            `<div class="alert alert-dark bg-black" role ="alert"><strong>${tarif}</strong></div>`;


    }

}

/* ---------------------------------- Appel fonction sur keydown --------------------------------- */

bouton_calcul.addEventListener("click", fc_verification, false);