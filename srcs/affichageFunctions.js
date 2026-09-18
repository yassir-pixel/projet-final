import {rl} from "./main.js" 
import {isValidId, terminerAvecErreur} from "./functions.js"
import {apprenants} from "./data.js"
import {afficherMenuDeSelection} from "./main.js"

export function afficherApprenantParID(apprenants) {
    rl.question(`Veuillez Selectionner L'ID de L'apprenant `, (val) => {
        let choix = Number(val.trim());

        if (val.trim() === "" || !isValidId(choix) || !Array.isArray(apprenants)) {
            terminerAvecErreur("ID apprenant Inexistant !");
            afficherMenuDeSelection();
            return;
        }

        const apprenant = apprenants.find(element => element.id === choix);
        if (apprenant === undefined) {
            terminerAvecErreur("ID apprenant Inexistant !");
            afficherMenuDeSelection();
            return;
        }

        const resultats = apprenant.resultats;
            console.log("");
            console.log("           **********************");
            console.log(`            Apprenant ID : ${apprenant.id}`)
            console.log("           **********************");
            console.log(`Nom : ${apprenant.nom}`);
            console.log(`Prenom : ${apprenant.prenom}`);
            console.log(`Progression : ${apprenant.progression}`);
            console.log(`Niveau : ${apprenant.niveau}`);
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
        console.log(`Progression : ${apprenants[apprenant].progression}`);
        console.log(`Niveau : ${apprenants[apprenant].niveau}`);

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
        console.log(`Nom : ${list[i].nom}       Prenom : ${list[i].prenom}`);
        console.log(`Progression : ${list[i].progression}`)
        for (let j = 1; j <= 7; j++) {
            let resultatDuJour = list[i].resultats.find(resultat => resultat.jour === j);

            if (resultatDuJour === undefined)
                console.log(`Jour ${j} : Journée non renseignée`);
            else
                console.log(`Jour ${j} : ${resultatDuJour.exercicesTermines}/${resultatDuJour.totalExercices} exercices terminés, challenge terminé : ${resultatDuJour.challengeTermine}`);
        }
        console.log("*****************************************************************");
        console.log("*****************************************************************");
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

    console.log("*********************************************");
    console.log("**************Résultats Des Journées*********");
    console.log("*********************************************");
    listAvecPourcentageEtResultatDesJournee(apprenants)
}
