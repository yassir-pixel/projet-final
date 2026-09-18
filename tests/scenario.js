import assert from "node:assert/strict";
import { apprenants } from "../srcs/data.js";
import { isValidNomPrenom, isValidId, calculeProgression, definirPalier } from "../srcs/functions.js";
import { trierParProgression, trierParOrdreAlphabétique } from "../srcs/triFunctions.js";

console.log("Début des scénarios de test");

// Scénario 1 : calculer la progression de Sara avec les données de data.js.
const sara = structuredClone(apprenants[0]);
calculeProgression(sara);
definirPalier(sara);

assert.equal(sara.progression, "80%");
assert.equal(sara.niveau, "Solide");
console.log("Scénario 1 réussi : progression et niveau de Sara.");

// Scénario 2 : vérifier la validation d'un identifiant valide et invalide.
assert.equal(isValidId(1), true);
assert.equal(isValidId(-1), false);
assert.equal(isValidId(1.5), false);
console.log("Scénario 2 réussi : validation des identifiants.");

// Scénario 3 : vérifier la validation d'un nom valide et invalide.
assert.equal(isValidNomPrenom("Sara", "N"), true);
assert.equal(isValidNomPrenom("Sa", "N"), false);
assert.equal(isValidNomPrenom("Sara2", "N"), false);
console.log("Scénario 3 réussi : validation des noms.");

// Scénario 4 : cas limite avec un apprenant sans résultat.
const nouvelApprenant = {
    id: 10,
    nom: "Nouveau",
    prenom: "Test",
    ville: "Nador",
    resultats: []
};

calculeProgression(nouvelApprenant);
definirPalier(nouvelApprenant);

assert.equal(nouvelApprenant.progression, "0%");
assert.equal(nouvelApprenant.niveau, "À renforcer");
console.log("Scénario 4 réussi : apprenant sans résultat.");

// Scénario 5 : vérifier les seuils de niveau du sujet.
const profilSolide = { progression: "80%" };
const profilEnProgression = { progression: "50%" };
const profilARenforcer = { progression: "49%" };

definirPalier(profilSolide);
definirPalier(profilEnProgression);
definirPalier(profilARenforcer);

assert.equal(profilSolide.niveau, "Solide");
assert.equal(profilEnProgression.niveau, "En progression");
assert.equal(profilARenforcer.niveau, "À renforcer");
console.log("Scénario 5 réussi : seuils des niveaux.");

// Scénario 6 : trier les apprenants par progression décroissante.
const listeParProgression = structuredClone(apprenants);
for (const apprenant of listeParProgression)
    calculeProgression(apprenant);

trierParProgression(listeParProgression);

assert.equal(listeParProgression[0].nom, "Sara");
assert.equal(listeParProgression[listeParProgression.length - 1].nom, "Jean");
console.log("Scénario 6 réussi : tri par progression décroissante.");

// Scénario 7 : trier les apprenants par ordre alphabétique.
const listeParNom = structuredClone(apprenants);
trierParOrdreAlphabétique(listeParNom);

assert.equal(listeParNom[0].nom, "Jean");
assert.equal(listeParNom[listeParNom.length - 1].nom, "Yassmine");
console.log("Scénario 7 réussi : tri alphabétique.");

console.log("Tous les scénarios automatiques sont réussis.");

/*
SCÉNARIOS INTERACTIFS À EXÉCUTER MANUELLEMENT DANS LE PROGRAMME

Scénario 8 : afficherTableauDeBord()
- Choisir 1.
- Vérifier le nombre total d'apprenants, la moyenne du groupe,
  les trois niveaux, les journées non renseignées et les challenges non terminés.

Scénario 9 : afficherListeApprenant(apprenants)
- Choisir 2.
- Vérifier que les apprenants de data.js sont affichés.

Scénario 10 : ajouterApprenant(apprenants)
- Choisir 3.
- Saisir un nouvel identifiant, un nom, un prénom et une ville.
- Vérifier que l'apprenant est ajouté avec resultats vide.
- Vérifier que progression et niveau sont calculés.
- Recommencer avec un identifiant déjà utilisé pour vérifier le refus.

Scénario 11 : afficherApprenantParID(apprenants)
- Choisir 4, puis saisir 9.
- Vérifier que Jean est trouvé même si son ID n'est pas sa position.
- Recommencer avec 99 pour vérifier le message d'erreur.

Scénario 12 : enregistrerResultat(apprenants)
- Choisir 5.
- Saisir l'ID 1, le jour 3, 16 exercices, 20 exercices proposés et oui.
- Vérifier le récapitulatif : 48 / 60, progression 80 %, 3 journées et 2 challenges.
- Recommencer avec un jour 8 ou avec 21 exercices terminés sur 20.

Scénario 13 : afficherApprenantParNom(apprenants)
- Choisir 6, puis saisir sara.
- Vérifier que Sara est trouvée.
- Recommencer avec cla pour tester une recherche partielle.

Scénario 14 : filtrerParNiveau()
- Choisir 7, puis saisir 1, 2 ou 3.
- Vérifier que seuls les apprenants du niveau choisi sont affichés.

Scénario 15 : trierParProgression(apprenants)
- Choisir 8.
- Vérifier que la liste va du pourcentage le plus élevé au plus faible.

Scénario 16 : trierParOrdreAlphabétique(apprenants)
- Choisir 9.
- Vérifier l'ordre Jean, Mehdi, Sara, Yassine, Yassmine.
*/