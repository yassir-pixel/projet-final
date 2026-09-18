import { rl, afficherMenuDeSelection } from "./main.js";
import { isValidId, isValidNomPrenom, calculeProgression, definirPalier, terminerAvecErreur } from "./functions.js";

function nettoyerTexte(valeur) {
    return valeur.trim().replace(/\s+/g, " ");
}

export function ajouterApprenant(apprenants) {
    rl.question("Identifiant de l'apprenant : ", choix => {
        const id = Number(choix.trim());

        if (!isValidId(id)) {
            terminerAvecErreur("Identifiant invalide.");
            afficherMenuDeSelection();
            return;
        }

        if (apprenants.some(apprenant => apprenant.id === id)) {
            terminerAvecErreur("Cet identifiant est déjà utilisé.");
            afficherMenuDeSelection();
            return;
        }

        rl.question("Nom : ", nomSaisi => {
            const nom = nettoyerTexte(nomSaisi);
            if (!isValidNomPrenom(nom, "N")) {
                terminerAvecErreur("Nom invalide.");
                afficherMenuDeSelection();
                return;
            }

            rl.question("Prénom : ", prenomSaisi => {
                const prenom = nettoyerTexte(prenomSaisi);
                if (!isValidNomPrenom(prenom, "P")) {
                    terminerAvecErreur("Prénom invalide.");
                    afficherMenuDeSelection();
                    return;
                }

                rl.question("Ville : ", villeSaisie => {
                    const ville = nettoyerTexte(villeSaisie);
                    if (!isValidNomPrenom(ville, "V")) {
                        terminerAvecErreur("Ville invalide.");
                        afficherMenuDeSelection();
                        return;
                    }

                    const nouvelApprenant = {
                        id,
                        nom,
                        prenom,
                        ville,
                        resultats: []
                    };

                    calculeProgression(nouvelApprenant);
                    definirPalier(nouvelApprenant);
                    apprenants.push(nouvelApprenant);

                    console.log("Apprenant ajouté avec succès.");
                    afficherMenuDeSelection();
                });
            });
        });
    });
}
