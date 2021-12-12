function perimetre(){
var perim = 0;
var forme = 0;

switch(arguments.length) {
    case 0 :
        return "Il faut un ou plusieurs arguments...";
        break;
    case 1 :
        perim = arguments[0]*4;
        forme = "Carré" ;
        break;
    case 2 : 
        perim = (arguments[0]*2) + (arguments[1]*2);
        forme = "rectangle";
        break;
    case 3 : 
        perim = arguments[0] + arguments[1] + arguments[2];
        forme = "Triangle";
        break;
    default :
    for (i in arguments) {
        perim += arguments[i];
    };

    return "Vous avez envoyé "
    + arguments.length
    +" arguments, leur somme fait : "
    + perim
}

return "Perimetre : " + perim + "c'est un : " + forme;
}

console.log(perimetre());
console.log(perimetre(5));
console.log(perimetre(3,2));
console.log(perimetre(5,5,5));
console.log(perimetre(10,5,4,3,5));
