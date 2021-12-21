//const word = 'JAILLISSEMENTS';
let tablemots = ['detromperaient', 'magnetometries', 'arrerageassiez', 'militarisaient', 'bombarderaient', 'echardonnaient',
    'préopératoires', 'commerceraient', 'déchevillasses', 'impassiblement', 'ébranchassions', 'subrogeassions'
];

let word; //
let wordLetters;
let emptyLetters = new Array(14)
let turn = 10;
let letterAlreadyUsed = [];
let bouton = document.getElementById('bouton');




function guestWordRender(emptyLetters) {

    const display = [];
    for (let index = 0; index < emptyLetters.length; index++) {
        if (emptyLetters[index]) {
            display.push(emptyLetters[index]);
            // console.log(emptyLetters[index]);
        } else {
            display.push('_');
        }
    }
    document.getElementById('emptyLetters').innerHTML = display.join(' ');
}

function render() {
    document.getElementById('turn').innerHTML = "Nombre de tours : " + turn
    document.getElementById('letterAlreadyUsed').innerHTML = "Lettres déjà jouées :" + letterAlreadyUsed.join(', ')
        // console.log('guestWordRender');
    guestWordRender(emptyLetters);
}

function getAllIndex(myWord, mySelectedLetter) {
    const indexes = [];
    for (let index = 0; index < myWord.length; index++) {
        const element = myWord[index];
        // console.log('getAllIndex : ' + index + ' ' + element);
        if (element === mySelectedLetter) {
            indexes.push(index);
            console.log('lettre trouvée, index no ' + index);
        }
    }



    return indexes;
}

function selectedLetter() {
    let letter = document.getElementById('selectedLetter').value
    letter = letter.trim();
    const mySelectedLetter = letter[0].toUpperCase();
    //console.log(mySelectedLetter);
    letterAlreadyUsed.push(mySelectedLetter);
    const temp = getAllIndex(wordLetters, mySelectedLetter);
    if (temp.length === 0) {

        console.log('temp length  :' +
            temp.length);

        turn--;
    } else {
        //console.log(temp)
        for (let index = 0; index < temp.length; index++) {
            emptyLetters[temp[index]] = wordLetters[temp[index]];
            wordLetters[temp[index]] = "";
        }
    }
    render()
    if (turn === 0) {
        alert('lose');
    }
    if (emptyLetters === 0) {
        alert('win');
    }
}

onload = function() {
    word = tablemots[nbaleatoire(12)]; // tire un mot au hasard dans la liste de 12 mots
    wordLetters = word.toUpperCase();
    console.log('Mot mystère = ' + wordLetters);
    render();
}

/* ---------------- fonction nombre aléatoire --------------- */
function nbaleatoire(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/* ----------------------------------------------------------- */
bouton.addEventListener('click', selectedLetter, false);