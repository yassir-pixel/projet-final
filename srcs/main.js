const readline = require('readline');
const apprenants = require('./data');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function afficherMenuDeSelection() {
    console.log(`SAS PROGRESS CONSOLE\n
        1. Afficher le tableau de bord
        2. Afficher la liste des apprenants
        3. Ajouter un apprenant
        4. Consulter un apprenant par identifiant
        5. Ajouter ou modifier le résultat d'une journée
        6. Rechercher un apprenant par nom
        7. Filtrer les apprenants par niveau
        8. Trier les apprenants par progression décroissante
        9. Trier les apprenants par ordre alphabétique
        0. Quitter`)

    rl.question(`Votre choix: `, (val) => {
        const choix = Number(val.trim());

        if ( val.trim() === "" || !Number.isInteger(choix) || choix < 0 || choix > 9 ) {
            console.log("Choix invalide.");
            afficherMenuDeSelection();
            return;
        }
        gererChoixUtilisateur(choix);
        if (choix !== 0 && choix != 4) {
            afficherMenuDeSelection();
        }
    })
}



function afficherListeApprenant(apprenants) {
    console.log("*********************************************");
    console.log("**************Listes Apprenants**************");
    console.log("*********************************************");
    for (let apprenant in apprenants) {
        // let resultats = resultatApprenant(apprenants[apprenant].resultats);
        let resultats = apprenants[apprenant].resultats;
        console.log("");
        console.log("           **********************");
        console.log(`            Apprenant Numéro : ${apprenants[apprenant].id}`)
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

function isValidId(choix) {
    return true;
}

function afficherApprenantParID() {
    rl.question(`Veuillez Selectionner L'ID de L'apprenant `, (val) => {
        const choix = Number(val.trim());

        if ( val.trim() === "" || !Number.isInteger(choix) || !isValidId(choix) ) {
            console.log("ID apprenant Inexistant !");
            afficherMenuDeSelection();
            return;
        } else {
                // affichage apprenant doit etre ici
            let resultats = apprenants[choix - 1].resultats;
            console.log("");
            console.log("           **********************");
            console.log(`            Apprenant Numéro : ${apprenants[choix - 1].id}`)
            console.log("           **********************");
            console.log(`Nom : ${apprenants[choix - 1].nom}`);
            console.log(`Prenom : ${apprenants[choix - 1].prenom}`);
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

function afficherApprenantParNom() {
    
}



function gererChoixUtilisateur(choixUtilisateur) {

    let choix = String(choixUtilisateur);
    switch (choix) {
        case "1":
            //afficherTableauDeBord();
            console.log("choix 1")
            break;
        case "2":
            afficherListeApprenant(apprenants);
            break;
        case "3":
            //ajouterApprenant();
            console.log("choix 3")
            break;
        case "4":
            afficherApprenantParID();
            break;
        case "5":
            //enregistrerResultat();
            console.log("choix 5")
            break;
        case "6":
            afficherApprenantParNom();
            console.log("choix 6")
            break;
        case "7":
            //filtrerParNiveau();
            console.log("choix 7")
            break;
        case "8":
            //trierParProgression();
            console.log("choix 8")
            break;
        case "9":
            //trierParOrdreAlphabétique();
            console.log("choix 9")
            break;
        case "0":
            console.log("choix 0")
            rl.close();
            break;
        default:
            console.log("Error : Choix Invalid")
    }
}

afficherMenuDeSelection()

rl.on('close', () => {
  process.exit(0);
});