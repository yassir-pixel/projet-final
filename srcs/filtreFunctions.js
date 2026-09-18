import {rl, afficherMenuDeSelection} from "./main.js"
import { apprenants } from "./data.js";
import { terminerAvecErreur } from "./functions.js";
 


export function afficherListeApprenantParCategorie(apprenants, choix){
    
    let palierChoisie = "";

    if (choix === 1) {
        palierChoisie = "Solide";
    } else if (choix === 2) {
        palierChoisie = "En progression";
    } else if (choix === 3) {
        palierChoisie = "À renforcer";
    } else {
        terminerAvecErreur("Categorie d'apprenant Inexistante !");
        afficherMenuDeSelection();
        return;
    }
    for (let i = 0; i < apprenants.length; i++) {
        if ((apprenants[i].niveau).includes(palierChoisie))
            console.log(`ID : ${apprenants[i].id} , Nom : ${apprenants[i].nom} , Prenom : ${apprenants[i].prenom} , Pourcentage : ${apprenants[i].progression}`)
    }
}

export function filtrerParNiveau(){
        rl.question(`Selectionner Le Numéro De La Categorie A afficher : [1] Solide , [2] En Progression , [3] À renforce `, (val) => {
            const choix = Number(val.trim());
    
            if (val.trim() === "" || !Number.isInteger(choix) || choix < 1 || choix > 3 || !Array.isArray(apprenants)) {
                terminerAvecErreur("Categorie d'apprenant Inexistante !");
                afficherMenuDeSelection();
                return;
            } else {
                afficherListeApprenantParCategorie(apprenants, choix);
            }
            afficherMenuDeSelection();
        })
}
