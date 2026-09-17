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
        console.log(`            Apprenant ID : ${apprenants[apprenant].id}`)
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