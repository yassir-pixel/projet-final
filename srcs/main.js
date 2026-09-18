import {afficherApprenantParID, afficherApprenantParNom, afficherListeApprenant} from "./affichageFunctions.js"
import { trierParProgression, trierParOrdreAlphabétique } from "./triFunctions.js";
import { filtrerParNiveau } from "./filtreFunctions.js";
import {apprenants} from "./data.js"
import { calculeProgression, definirPalier } from "./functions.js";
import readline from "node:readline"

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


export function afficherMenuDeSelection() {

    console.log(`   SAS PROGRESS CONSOLE\n
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
            break;
        case "2":
            afficherListeApprenant(apprenants);
            break;
        case "3":
            //ajouterApprenant();
            console.log("choix 3")
            break;
        case "4":
            afficherApprenantParID(apprenants);
            break;
        case "5":
            //enregistrerResultat();
            console.log("choix 5")
            break;
        case "6":
            //afficherApprenantParNom();
            break;
        case "7":
            filtrerParNiveau();
            break;
        case "8":
            trierParProgression(apprenants);
            break;
        case "9":
            trierParOrdreAlphabétique(apprenants);
            break;
        case "0":
            rl.close();
            break;
        default:
            console.log("Error : Choix Invalid")
    }
}

console.log(`Programme Lancer Calcule Initial De La Progression ...!`);
console.log(`Definition du Palier Des Apprenants ...!`);
for (let apprenant in apprenants) {
    calculeProgression(apprenants[apprenant]);
    definirPalier(apprenants[apprenant]);        
}
afficherMenuDeSelection()

rl.on('close', () => {
    console.log("closing the program,.....!");
  process.exit(0);
});