import { afficherMenuDeSelection, rl } from "./main.js";

export function normaliserTexteRecherche(valeur) {
    if (typeof valeur !== "string")
        return "";

    return valeur
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

export function estRechercheNomValide(valeur) {
    if (typeof valeur !== "string" || valeur.length === 0)
        return false;

    let separateurAttendu = false;

    for (const caractere of valeur) {
        const estSeparateur = caractere === " " || caractere === "'" || caractere === "-";

        if (estSeparateur) {
            if (separateurAttendu)
                return false;

            separateurAttendu = true;
            continue;
        }

        const minuscule = caractere.toLowerCase();
        const majuscule = caractere.toUpperCase();

        if (minuscule === majuscule)
            return false;

        separateurAttendu = false;
    }

    return !separateurAttendu;
}

export function rechercherApprenantsParNom(apprenants, recherche) {
    const rechercheNormalisee = normaliserTexteRecherche(recherche);

    if (!Array.isArray(apprenants) || !estRechercheNomValide(rechercheNormalisee))
        return [];

    return apprenants.filter(apprenant => {
        const nomComplet = normaliserTexteRecherche(`${apprenant.nom} ${apprenant.prenom}`);
        return nomComplet.includes(rechercheNormalisee);
    });
}

function afficherApprenant(apprenant) {
    console.log("");
    console.log("           **********************");
    console.log(`           |> Apprenant ID : ${apprenant.id} <|`);
    console.log("           **********************");
    console.log(`Nom : ${apprenant.nom}`);
    console.log(`Prenom : ${apprenant.prenom}`);
    console.log(`Ville : ${apprenant.ville}`);
    console.log(`Progression : ${apprenant.progression}`);
    console.log(`Niveau : ${apprenant.niveau}`);
}

export function afficherApprenantParNom(apprenants) {
    rl.question("Veuillez saisir un nom ou une partie du nom : ", recherche => {
        const rechercheNormalisee = normaliserTexteRecherche(recherche);

        if (!estRechercheNomValide(rechercheNormalisee)) {
            console.log("Recherche invalide : saisissez au moins une lettre.");
            afficherMenuDeSelection();
            return;
        }

        const resultats = rechercherApprenantsParNom(apprenants, rechercheNormalisee);

        if (resultats.length === 0) {
            console.log("Aucun apprenant ne correspond à cette recherche.");
        } else {
            console.log(`${resultats.length} apprenant(s) trouvé(s) :`);
            resultats.forEach(afficherApprenant);
        }

        afficherMenuDeSelection();
    });
}
