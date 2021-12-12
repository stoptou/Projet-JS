/* ---------------------------- Variables locale ---------------------------- */
let m_total = 0;
let m_donne = 0;
let m_arendre = 0;
let nb_10 = 0;
let nb_5 = 0;
let nb_1 = 0;
let Boutoncalc = document.getElementById("bouton_calcul");
let mess_arendre = document.getElementById("total_arendre");
let mess_nb10 = document.getElementById("nb_billets_10");
let mess_nb5 = document.getElementById("nb_billets_5");
let mess_nb1 = document.getElementById("nb_pieces_1");
/* -------------------------------- Fonction -------------------------------- */
function fc_calcul() {
    m_total = document.getElementById("totalapayer").value;
    m_donne = document.getElementById("montantdonne").value;
    m_arendre = m_donne - m_total;
    mess_arendre.innerHTML =
        `<div class="alert alert-success" role ="alert">${m_arendre} € </div>`;
    while (m_arendre >= 10) {
        nb_10++;
        m_arendre = m_arendre - 10;
    }
    while (m_arendre >= 5) {
        nb_5++;
        m_arendre = m_arendre - 5;
    }
    while (m_arendre >= 1) {
        nb_1++;
        m_arendre = m_arendre - 1;
    }


    mess_nb10.innerHTML =
        `<div class="alert alert-success" role ="alert">${nb_10}</div>`;
    mess_nb5.innerHTML =
        `<div class="alert alert-success" role ="alert">${nb_5}</div>`;
    mess_nb1.innerHTML =
        `<div class="alert alert-success" role ="alert">${nb_1}</div>`;

    nb_1 = 0;
    nb_5 = 0;
    nb_10 = 0;
    m_arendre = 0;


}
/* ---------------------------------- Appel fonction sur click --------------------------------- */
Boutoncalc.addEventListener("click", fc_calcul, false);