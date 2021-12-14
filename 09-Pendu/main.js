const word = 'JAILLISSEMENT';
const wordLetters = word
const emptyLetters = new Array(word.length)
let turn = 10;
const letterAlreadyUsed = [];
let bouton = document.getElementById('bouton');


function guestWordRender (emptyLetters) {
    const display = []
    for (let index = 0; index < emptyLetters.length; index++) {
        if (emptyLetters[index]) {
            display.push(emptyLetters[index])
        } else {
            display.push('_')
        }
    }
    document.getElementById('emptyLetters').innerHTML = display.join(' ')
}

function render(){
    document.getElementById('turn').innerHTML = "Nombre de tours : " + turn
    document.getElementById('letterAlreadyUsed').innerHTML = "Lettres déjà jouées :" + letterAlreadyUsed.join(', ')
    guestWordRender(emptyLetters)
}

function getAllIndex(myWord, mySelectedLetter) {
    const indexes = []
    for (let index = 0; index < myWord.length; index++) {
        const element = myWord[index];
        if (element === mySelectedLetter){
            indexes.push(index)
        }
    }
    return indexes
}

function selectedLetter() {
    let letter = document.getElementById('selectedLetter').value
    letter = letter.trim()
    const mySelectedLetter = letter[0].toUpperCase()
    letterAlreadyUsed.push(mySelectedLetter)
    const temp = getAllIndex(wordLetters, mySelectedLetter)
    if (temp.length === 0) {
        turn --
    } else{
        console.log(temp)
        for (let index = 0; index < temp.length; index++) {
            emptyLetters[temp[index]] = wordLetters[temp[index]]
            wordLetters[temp[index]] = ""
            console.log(wordLetters)
            
        }
    }
    render()
    if (turn === 0) {
        alert('lose')
    }
    if (emptyLetters === 0) {
        alert('win')
    }
}
onload = function (){
    render()
}

bouton.addEventListener('click', selectedLetter, false);