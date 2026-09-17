export function isValidNomPrenom(choix) {
    if (choix.length < 3) {
        console.log("Saisissez 3 caractére minimum")
        return false
    } else {
        if (!/^[a-z]+$/i.test(choix)) {
            console.log("Error : le nom ne doit pas contenir des chiffres ou des caracteres specials");
            return false
        }
        console.log(choix);
        return true
    }
}

export function isValidId(choix) {
    return Number.isInteger(choix) && choix > 0;
}
