export function trierParOrdreAlphabétique(apprenants) {
    let n = apprenants.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            const nomA = apprenants[j].nom.toLowerCase();
            const nomB = apprenants[j + 1].nom.toLowerCase();
            if (nomA > nomB) {
                const temp = apprenants[j];
                apprenants[j] = apprenants[j + 1];
                apprenants[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
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