import {afficherApprenantParID, afficherApprenantParNom, afficherListeApprenant} from "./affichageFunctions.js"
import {apprenants} from "./data.js"
import readline from "node:readline"

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


export function afficherMenuDeSelection() {
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
            //trierParProgression(apprenants);
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
    console.log("closing the program,.....!");
  process.exit(0);
});