let mdpSaisi;
let regexMaj = new RegExp("[A-Z]");
let regexMin = new RegExp("[a-z]");
let regexChiffre = new RegExp("[0-9]");
let regexSpecial = new RegExp("\\W");
let compteurForce;
let message = document.getElementById("message");
let bouton = document.getElementById('bouton')

function verifierProposition() {

    compteurForce = 0;
    mdpSaisi = document.getElementById('mdp').value;

    if (regexMaj.test(mdpSaisi)) {
        compteurForce = compteurForce + 1;
    }
    if (regexMin.test(mdpSaisi)) {
        compteurForce = compteurForce + 1;
    }
    if (regexChiffre.test(mdpSaisi)) {
        compteurForce = compteurForce + 1;
    }
    if (regexSpecial.test(mdpSaisi)) {
        compteurForce = compteurForce + 1;
    }
    if (mdpSaisi.length < 8) {
        compteurForce = compteurForce - 1;
    }


    switch (compteurForce) {
        case 4:
            message.innerHTML = '<span class="text-success">Très sécurisé !</span>';
            break;
        case 3:
            message.innerHTML = '<span class="text-success">Sécurisé !</span>';
            break;
        case 2:
            message.innerHTML = '<span class="text-warning">Moyen !!</span>';
            break;
        case 1:
            message.innerHTML = '<span class="text-danger">Dansgereux !!!</span>';
            break;
        case 0:
            message.innerHTML = '<span class="text-danger">Dansgereux !!!</span>';
            break;
        default:
            message.innerHTML = '';
    }

}
document.getElementById('mdp').addEventListener('keyup', verifierProposition, false);