import {rl, afficherMenuDeSelection} from "./main.js"
import { apprenants } from "./data.js";
import { isValidId } from "./functions.js";
 


export function afficherListeApprenantParCategorie(apprenants, choix){
    
    for (let i = 0; i < apprenants.length; i++) {
        console.log(`ID : ${apprenants[i].id} , Nom : ${apprenants[i].nom} , Prenom : ${apprenants[i].prenom} , Pourcentage : ${apprenants[i].progression}`)
    }
}

export function filtrerParNiveau(){
        rl.question(`Selectionner Le Numéro De La Categorie A afficher : [1] Solide , [2] En Progression , [3] À renforce `, (val) => {
            const choix = Number(val.trim());
    
            if ( val.trim() === "" || choix < 1 && choix > 3 || !isValidId(choix) || !apprenants ) {
                console.log("Categorie d'apprenant Inexistante !");
                afficherMenuDeSelection();
                return;
            } else {
                afficherListeApprenantParCategorie(apprenants, choix);
            }
            afficherMenuDeSelection();
        })
}
