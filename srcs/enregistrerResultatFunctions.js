import { rl, afficherMenuDeSelection } from "./main.js";
import { calculeProgression, definirPalier, terminerAvecErreur } from "./functions.js";

function demanderJour(apprenant) {
    rl.question("Jour (1 à 7) : ", jourSaisi => {
        const jour = Number(jourSaisi.trim());

        if (jourSaisi.trim() === "" || !Number.isInteger(jour) || jour < 1 || jour > 7) {
            terminerAvecErreur("Le jour doit être un entier compris entre 1 et 7.");
            afficherMenuDeSelection();
            return;
        }

        demanderExercicesTermines(apprenant, jour);
    });
}

function demanderExercicesTermines(apprenant, jour) {
    rl.question("Exercices terminés : ", exercicesSaisis => {
        const exercicesTermines = Number(exercicesSaisis.trim());

        if (exercicesSaisis.trim() === "" || !Number.isInteger(exercicesTermines) || exercicesTermines < 0) {
            terminerAvecErreur("Le nombre d'exercices terminés est invalide.");
            afficherMenuDeSelection();
            return;
        }

        demanderTotalExercices(apprenant, jour, exercicesTermines);
    });
}

function demanderTotalExercices(apprenant, jour, exercicesTermines) {
    rl.question("Total d'exercices proposés : ", totalSaisi => {
        const totalExercices = Number(totalSaisi.trim());

        if (totalSaisi.trim() === "" || !Number.isInteger(totalExercices) || totalExercices <= 0) {
            terminerAvecErreur("Le total d'exercices proposés est invalide.");
            afficherMenuDeSelection();
            return;
        }

        if (exercicesTermines > totalExercices) {
            terminerAvecErreur("Les exercices terminés ne peuvent pas dépasser le total proposé.");
            afficherMenuDeSelection();
            return;
        }

        demanderChallenge(apprenant, jour, exercicesTermines, totalExercices);
    });
}

function demanderChallenge(apprenant, jour, exercicesTermines, totalExercices) {
    rl.question("Challenge terminé (oui/non) : ", challengeSaisi => {
        const challenge = challengeSaisi.trim().toLowerCase();

        if (challenge !== "oui" && challenge !== "non") {
            terminerAvecErreur("Répondez par oui ou non.");
            afficherMenuDeSelection();
            return;
        }

        const resultat = {
            jour,
            exercicesTermines,
            totalExercices,
            challengeTermine: challenge === "oui"
        };

        const indexResultat = apprenant.resultats.findIndex(element => element.jour === jour);

        if (indexResultat === -1)
            apprenant.resultats.push(resultat);
        else
            apprenant.resultats[indexResultat] = resultat;

        calculeProgression(apprenant);
        definirPalier(apprenant);

        console.log(`Résultat du jour ${jour} enregistré.`);
        let exercicesTerminesTotal = 0;
        let exercicesProposesTotal = 0;
        let challengesTermines = 0;

        for (const resultatEnregistre of apprenant.resultats) {
            exercicesTerminesTotal += resultatEnregistre.exercicesTermines;
            exercicesProposesTotal += resultatEnregistre.totalExercices;
            if (resultatEnregistre.challengeTermine)
                challengesTermines += 1;
        }

        const progressionSansSymbole = apprenant.progression.replace("%", "");
        console.log(`${apprenant.nom} ${apprenant.prenom} : ${exercicesTerminesTotal} / ${exercicesProposesTotal} exercices, progression ${progressionSansSymbole} %.`);
        console.log(`${apprenant.resultats.length} journées renseignées, ${challengesTermines} challenges terminés.`);
        afficherMenuDeSelection();
    });
}

export function enregistrerResultat(apprenants) {
    rl.question("Identifiant de l'apprenant : ", idSaisi => {
        const id = Number(idSaisi.trim());
        const apprenant = apprenants.find(element => element.id === id);

        if (idSaisi.trim() === "" || !Number.isInteger(id) || apprenant === undefined) {
            terminerAvecErreur("Apprenant introuvable.");
            afficherMenuDeSelection();
            return;
        }

        console.log(`Apprenant trouvé : ${apprenant.nom} ${apprenant.prenom}`);
        demanderJour(apprenant);
    });
}
