let emailSaisi ;
let emailSaisiCoupe ;
let positionArobase ;
let message = document.getElementById('message');

function verificationProposition() {
    emailSaisi = document.getElementById('email').value;

    if(emailSaisi.includes('@') && emailSaisi.includes('.')){
        positionArobase = emailSaisi.indexOf('@');
        emailSaisiCoupe = emailSaisi.substring(positionArobase);
        if(emailSaisiCoupe.includes('.')){
            message.innerHTML = '<span class="text-success">Adresse email valide ! <span>';
        }else{
            message.innerHTML = '<span class="texte-danger">Adresse email invalide ! <span>';
        }

    }else {
        message.innerHTML = '<span class="text-danger">Adresse email invalide ! <span>';
    }
}
document.getElementById('email').addEventListener('keydown', verificationProposition,false);