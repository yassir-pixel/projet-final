import {apprenants} from "./data.js"
import { afficherListeApprenant } from "./affichageFunctions.js";

export function trierParOrdreAlphabétique(apprenants) {
    
}

export function trierParProgression(apprenants) {

    for (let i = 0; i < apprenants.length; i++) {
        for (let j = 0; j < apprenants.length - i - 1; j++) {
            if (Number((apprenants[j].progression).slice(0, ((apprenants[j].progression).length - 1)) ) < Number((apprenants[j + 1].progression).slice(0, ((apprenants[j + 1].progression).length - 1)) )) {
                let tmp = apprenants[j];
                apprenants[j] = apprenants[j + 1]
                apprenants[j + 1] = tmp;
            }
        }
    }
}