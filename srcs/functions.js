export function isValidNomPrenom(choix, type) {
    if (choix.length < 3 && type === 'N') {
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

// check has more cases i guess
export function isValidId(choix) {
    return Number.isInteger(choix) && choix > 0 ;
}

export function calculeProgression(apprenant) {
    let totalExercices = 0;
    let exercicesTermines = 0;
    let totalJournees = 0;
    let totalChallenge = 0;
    for (let day in apprenant.resultats) {
        totalExercices += apprenant.resultats[day].totalExercices;
        exercicesTermines += apprenant.resultats[day].exercicesTermines;
        totalJournees += 1;
        if (apprenant.resultats[day].challengeTermine == true)
            totalChallenge += 1;
        apprenant.progression = String(Math.round((exercicesTermines / totalExercices) * 100)) + "%";
    }
    console.log(`${apprenant.nom + ' ' + apprenant.prenom} a Obtenue un Score de ${apprenant.progression}`)
    console.log(`${totalJournees} journées renseignées, ${totalChallenge} challenges terminés.`)
}

export function definirPalier(apprenant) {

    if ((typeof apprenant) == "object") {
        let paliers = ["Solide", "En progression", "À renforcer", "Fox Hound"]
        let val = Number((apprenant.progression).slice(0, apprenant.progression.length - 1));

        if (val >= 0 && val <= 100) {
            if (val < 50)
                apprenant.niveau = paliers[2];
            if (val >= 50 && val <= 79)
                apprenant.niveau = paliers[1];
            if (val >= 80)
                apprenant.niveau = paliers[0];
        }
    }
}