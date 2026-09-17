
export const apprenants = [
    {
        id: 1,
        nom: "Sara",
        prenom: "Claude",
        ville: "Nador",
        resultats: [
            {
                jour: 1,
                exercicesTermines: 18,
                totalExercices: 20,
                challengeTermine: true
            },
            {
                jour: 2,
                exercicesTermines: 14,
                totalExercices: 20,
                challengeTermine: false
            }
        ],
        progression: "80%",
        niveau: "Solide"
    },
    {
        id: 2,
        nom: "Yassine",
        prenom: "Copilot",
        ville: "Oujda",
        resultats: [
            {
                jour: 1,
                exercicesTermines: 12,
                totalExercices: 20,
                challengeTermine: false
            }
        ],
        progression: "60%",
        niveau: "En progression"
    },
    {
        id: 3,
        nom: "Mehdi",
        prenom: "Gemini",
        ville: "Casablanca",
        resultats: [
            {
                jour: 1,
                exercicesTermines: 12,
                totalExercices: 20,
                challengeTermine: true
            },
            {
                jour: 2,
                exercicesTermines: 16,
                totalExercices: 20,
                challengeTermine: true
            },
            {
                jour: 3,
                exercicesTermines: 7,
                totalExercices: 20,
                challengeTermine: true
            }
        ],
        progression: "58%",
        niveau: "En progression"
    },
    {
        id: 4,
        nom: "Yassmine",
        prenom: "Queen",
        ville: "Casablanca",
        resultats: [
            {
                jour: 1,
                exercicesTermines: 12,
                totalExercices: 20,
                challengeTermine: true
            },
            {
                jour: 2,
                exercicesTermines: 19,
                totalExercices: 20,
                challengeTermine: false
            },
            {
                jour: 3,
                exercicesTermines: 4,
                totalExercices: 20,
                challengeTermine: false
            },
            {
                jour: 5,
                exercicesTermines: 20,
                totalExercices: 20,
                challengeTermine: false
            }
        ],
        progression: "69%",
        niveau: "En progression"
    }
];

function jourAndChallengesManquer(){
    for (let i = 0; i < apprenants.length; i++) {
        console.log(`${apprenants[i].nom + " " + apprenants[i].prenom}`)
        for (let j = 1; j <= apprenants[i].resultats[j]; j++) {
            let challengeTerminer = false;
            if (apprenants[i].resultats[j].jour == j) {
                console.log(`Jour : ${apprenants[i].resultats[j].jour} , Presence : ${}`)
            }
        }
    }
}

export function afficherTableauDeBord() {
    let nombreTotaleApprenants = apprenants.length;
    let nombreTotaleExerciceGroupe = 0
    let nombreTotaleExerciceProposé = 0;
    let nombreApprenantsSolide = 0;
    let nombreApprenantsProgression = 0;
    let nombreApprenantsRenforcer = 0;

    for (let i = 0; i < apprenants.length; i++) {
        nombreTotaleExerciceProposé += ((apprenants[i].resultats).length * 20)
        if (apprenants[i].niveau === "Solide")
           nombreApprenantsSolide += 1;
        if (apprenants[i].niveau === "En progression")
           nombreApprenantsProgression += 1;
        if (apprenants[i].niveau === "À renforcer")
           nombreApprenantsRenforcer += 1;
        for (let j = 0; j < (apprenants[i].resultats).length; j++) {
            nombreTotaleExerciceGroupe += apprenants[i].resultats[j].exercicesTermines
        }
    }

    let moyenneProgressionGroupe = String(Math.round((nombreTotaleExerciceGroupe / nombreTotaleExerciceProposé) * 100)) + "%";

    console.log("*********************************************");
    console.log("**************Tableau De Bord****************");
    console.log("*********************************************");

    console.log(`Nombre Totale D'apprenants => ${nombreTotaleApprenants}`);
    console.log(`Progression Moyenne Du Groupe => ${moyenneProgressionGroupe}`);
    console.log(`Apprenants Solide => ${nombreApprenantsSolide}`);
    console.log(`Apprenants En Progression => ${nombreApprenantsProgression}`);
    console.log(`Apprenants À renforcer => ${nombreApprenantsRenforcer}`);

    //let apprenantsDistingée = [{"Solide": [], "En progression": [], "À renforcer": []}]
    // let apprenantsDistingée2 = [{"Solide": {nom: "", prenom: "", pourcentage: "", id: 0}, "En progression": {nom: "", prenom: "", pourcentage: "", id: 0}, "À renforcer": {nom: "", prenom: "", pourcentage: "", id: 0}}]

    // for (let i = 0; i < apprenants.length; i++) {
    //     if (apprenants[i].niveau === "Solide") {
    //         apprenantsDistingée[0].Solide.push(apprenants[i].nom + " " + apprenants[i].prenom);
    //     }
    //     if (apprenants[i].niveau == "En progression") {
    //         apprenantsDistingée[0]["En progression"].push(apprenants[i].nom + " " + apprenants[i].prenom)
    //     }
    //     if (apprenants[i].niveau == "À renforcer") {
    //         apprenantsDistingée[0]["À renforcer"].push(apprenants[i].nom + " " + apprenants[i].prenom)
    //     }
    // }


    jourAndChallengesManquer();




}

afficherTableauDeBord()