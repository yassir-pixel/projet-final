import {rl} from "./main.js" 
import {isValidNomPrenom, isValidId} from "./functions.js"
import {apprenants} from "./data.js"
import {afficherMenuDeSelection} from "./main.js"

export function afficherApprenantParID() {
    rl.question(`Veuillez Selectionner L'ID de L'apprenant `, (val) => {
        const choix = Number(val.trim());
        const apprenant = apprenants.find(({ id }) => id === choix);

        if ( val.trim() === "" || !isValidId(choix) || !apprenant ) {
            console.log("ID apprenant Inexistant !");
            afficherMenuDeSelection();
            return;
        } else {
                // affichage apprenant doit etre ici
            let resultats = apprenant.resultats;
            console.log("");
            console.log("           **********************");
            console.log(`            Apprenant ID : ${apprenant.id}`)
            console.log("           **********************");
            console.log(`Nom : ${apprenant.nom}`);
            console.log(`Prenom : ${apprenant.prenom}`);
            if (resultats.length == 0) {
                console.log(`Resultats : aucune jouréé enregistée pour cette apprenant`);
            } else {
                console.log(`Resultats :`)
                for (let i = 0; i < resultats.length; i++) {
                    console.log(`    -----------[Resultat Jour ${resultats[i].jour}]-----------`)
                    console.log(`         [Total Exercices] => ${resultats[i].totalExercices}`);
                    console.log(`         [Exercices Termines] => ${resultats[i].exercicesTermines}`);
                    console.log(`         [Challenge Termines] => ${resultats[i].challengeTermine}`);
                    console.log(`    ---------------------------------------`)
                }
            }
        }
        afficherMenuDeSelection();
    })
        
}

export function afficherListeApprenant(apprenants) {
    console.log("*********************************************");
    console.log("**************Listes Apprenants**************");
    console.log("*********************************************");
    for (let apprenant in apprenants) {
        // let resultats = resultatApprenant(apprenants[apprenant].resultats);
        let resultats = apprenants[apprenant].resultats;
        console.log("");
        console.log("           **********************");
        console.log(`           |> Apprenant ID : ${apprenants[apprenant].id} <|`)
        console.log("           **********************");
        console.log(`Nom : ${apprenants[apprenant].nom}`);
        console.log(`Prenom : ${apprenants[apprenant].prenom}`);
        if (resultats.length == 0) {
            console.log(`Resultats : aucune jouréé enregistée pour cette apprenant`);
        } else {
            console.log(`Resultats :`)
            for (let i = 0; i < resultats.length; i++) {
                console.log(`    -----------[Resultat Jour ${resultats[i].jour}]-----------`)
                console.log(`         [Total Exercices] => ${resultats[i].totalExercices}`);
                console.log(`         [Exercices Termines] => ${resultats[i].exercicesTermines}`);
                console.log(`         [Challenge Termines] => ${resultats[i].challengeTermine}`);
                console.log(`    ---------------------------------------`)
            }
        }
    }
}

export function afficherApprenantParNom() {
    let nom = "";
    let prenom = "";
    rl.question(`Veuillez Saisir Un Nom : `, (val) => {
        const choix = val.trim();

        if ( val.trim() === "" || !isValidNomPrenom(choix, 'N')) {
            afficherMenuDeSelection();
            return;
        } else {
            nom += choix;
            rl.question(`Veuillez Saisir Un Prenom : `, (val) => {
                const choix = val.trim();

                if ( val.trim() === "" || !isValidNomPrenom(choix, 'P')) {
                    afficherMenuDeSelection();
                    return;
                } else {
                    prenom += choix;
                    // logic goes here
                    console.log("No name Errors No prenom Errors");
                    console.log(`Nom => ${nom}, Prenom => ${prenom}`);
                    afficherMenuDeSelection();
                }
            })
            afficherMenuDeSelection();
        }
    })
}

// still need to fix the display of the days where the student was absent
export function listAvecPourcentageEtResultatDesJournee(apprenants) {
    let list = structuredClone(apprenants);

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
            if (Number((list[j].progression).slice(0, ((list[j].progression).length - 1)) ) > Number((list[j + 1].progression).slice(0, ((list[j + 1].progression).length - 1)) )) {
                let tmp = list[j];
                list[j] = list[j + 1]
                list[j + 1] = tmp;
            }
        }
    }
    for (let i = 0; i < list.length; i++) {
        console.log(`Nom : ${list[i].nom} Prenom : ${list[i].prenom}`);
        console.log(`Progression : ${list[i].progression}`)
        for (let j = 1; j <= 7; j++) {
            if (list[i].resultats[j - 1].jour === undefined)
                console.log(`Jour ${j}`);
            else
                console.log(`Jour ${list[i].resultats[j - 1].jour}`);
        }
    }
}

// still need to fix the display of the days where the student was absent
// then afficherTableauDeBord will be finished
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

}
