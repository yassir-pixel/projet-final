# Suivi des consignes du projet

Ce document compare les consignes du PDF avec les fonctionnalités présentes dans le projet.

## 1. Afficher le tableau de bord

| Consigne du PDF | État | Vérification |
|---|---|---|
| Afficher le nombre total d'apprenants | Réalisé | Calculé depuis `apprenants.length`. |
| Afficher la progression moyenne du groupe | Réalisé | Calculée depuis les exercices terminés et proposés. |
| Compter les profils `Solide` | Réalisé | Comptage selon `niveau`. |
| Compter les profils `En progression` | Réalisé | Comptage selon `niveau`. |
| Compter les profils `À renforcer` | Réalisé | Comptage selon `niveau`. |
| Afficher la liste des apprenants avec leur pourcentage | Réalisé | Liste affichée par progression décroissante. |
| Afficher les journées non renseignées | Réalisé | Les jours 1 à 7 sont parcourus. |
| Distinguer les challenges non terminés | Réalisé | `Challenge terminé` et `Challenge non terminé` sont affichés. |
| Éviter une division par zéro | Réalisé | Le tableau de bord affiche `0%` si aucun exercice n'est proposé. |

Fonctions concernées : `afficherTableauDeBord()`, `listAvecPourcentageEtResultatDesJournee()`.

## 2. Afficher la liste des apprenants

| Consigne du PDF | État | Vérification |
|---|---|---|
| Afficher les apprenants du tableau | Réalisé | Parcours du tableau `apprenants`. |
| Afficher l'identifiant | Réalisé | L'ID est affiché. |
| Afficher le nom et le prénom | Réalisé | Les deux informations sont affichées. |
| Afficher la progression | Réalisé | La progression est affichée. |
| Afficher le niveau | Réalisé | Le niveau est affiché. |
| Afficher les résultats journaliers | Réalisé | Les résultats enregistrés sont parcourus. |

Fonction concernée : `afficherListeApprenant()`.

## 3. Ajouter un apprenant

| Consigne du PDF | État | Vérification |
|---|---|---|
| Demander un identifiant | Réalisé | Question posée avec `readline`. |
| Refuser un identifiant invalide | Réalisé | Vérification avec `isValidId()`. |
| Refuser un identifiant déjà utilisé | Réalisé | Recherche d'un doublon dans `apprenants`. |
| Demander le nom, le prénom et la ville | Réalisé | Les trois champs sont demandés. |
| Nettoyer les espaces inutiles | Réalisé | Les textes sont nettoyés avec `trim()` et `replace()`. |
| Ajouter l'objet dans `apprenants` | Réalisé | Utilisation de `push()`. |
| Initialiser `resultats` avec un tableau vide | Réalisé | `resultats: []`. |
| Calculer automatiquement progression et niveau | Réalisé | Appels à `calculeProgression()` et `definirPalier()`. |
| Ne pas enregistrer une saisie invalide | Réalisé | L'ajout se fait après les validations. |

Fonction concernée : `ajouterApprenant()` dans `ajouterApprenantFunctions.js`.

## 4. Consulter un apprenant par identifiant

| Consigne du PDF | État | Vérification |
|---|---|---|
| Demander un identifiant | Réalisé | Question posée avec `readline`. |
| Rechercher l'apprenant par sa propriété `id` | Réalisé | Utilisation de `find()`. |
| Gérer un identifiant inexistant | Réalisé | Message d'erreur affiché. |
| Afficher les informations de l'apprenant | Réalisé | ID, nom, prénom, progression et niveau. |
| Afficher les résultats journaliers | Réalisé | Résultats parcourus et affichés. |
| Gérer un apprenant sans résultat | Réalisé | Message spécifique affiché. |

Fonction concernée : `afficherApprenantParID()`.

## 5. Ajouter ou modifier le résultat d'une journée

| Consigne du PDF | État | Vérification |
|---|---|---|
| Demander l'identifiant de l'apprenant | Réalisé | L'apprenant est recherché par ID. |
| Demander un jour entre 1 et 7 | Réalisé | Les jours hors limites sont refusés. |
| Demander les exercices terminés | Réalisé | Valeur entière et positive vérifiée. |
| Demander le total d'exercices proposés | Réalisé | Valeur entière supérieure à zéro vérifiée. |
| Refuser les exercices terminés supérieurs au total | Réalisé | Vérification de cohérence présente. |
| Demander si le challenge est terminé | Réalisé | Réponses `oui` et `non` acceptées. |
| Ajouter une nouvelle journée | Réalisé | Utilisation de `push()`. |
| Modifier une journée existante | Réalisé | Le résultat existant est remplacé. |
| Éviter les doublons de journée | Réalisé | Recherche avec `findIndex()`. |
| Recalculer la progression | Réalisé | Appel à `calculeProgression()`. |
| Recalculer le niveau | Réalisé | Appel à `definirPalier()`. |
| Afficher le récapitulatif final | Réalisé | Totaux, progression, journées et challenges affichés. |

Fonction concernée : `enregistrerResultat()` dans `enregistrerResultatFunctions.js`.

## 6. Rechercher un apprenant par nom

| Consigne du PDF | État | Vérification |
|---|---|---|
| Rechercher par nom | Réalisé | Recherche dans le nom et le prénom. |
| Accepter une recherche partielle | Réalisé | Utilisation de `includes()`. |
| Ignorer les majuscules et minuscules | Réalisé | Texte converti en minuscules. |
| Nettoyer les espaces inutiles | Réalisé | `trim()` et remplacement des espaces multiples. |
| Afficher un message sans résultat | Réalisé | Message prévu. |
| Afficher plusieurs résultats possibles | Réalisé | Les résultats sont parcourus avec `forEach()`. |

Fonctions concernées : `afficherApprenantParNom()`, `rechercherApprenantsParNom()`.

## 7. Filtrer les apprenants par niveau

| Consigne du PDF | État | Vérification |
|---|---|---|
| Proposer le niveau `Solide` | Réalisé | Choix `1`. |
| Proposer le niveau `En progression` | Réalisé | Choix `2`. |
| Proposer le niveau `À renforcer` | Réalisé | Choix `3`. |
| Refuser un choix hors de 1 à 3 | Réalisé | Validation des limites. |
| Afficher les apprenants correspondants | Réalisé | Filtrage selon `niveau`. |

Fonction concernée : `filtrerParNiveau()`.

## 8. Trier par progression décroissante

| Consigne du PDF | État | Vérification |
|---|---|---|
| Trier selon le pourcentage | Réalisé | Les valeurs `%` sont converties en nombres. |
| Classer du plus élevé au plus faible | Réalisé | Le tri est décroissant. |

Fonction concernée : `trierParProgression()`.

## 9. Trier par ordre alphabétique

| Consigne du PDF | État | Vérification |
|---|---|---|
| Trier les apprenants par nom | Réalisé | Comparaison des propriétés `nom`. |
| Ignorer les majuscules et minuscules | Réalisé | Utilisation de `toLowerCase()`. |

Fonction concernée : `trierParOrdreAlphabétique()`.

## 10. Calculer la progression individuelle

| Indicateur demandé | État | Remarque |
|---|---|---|
| Exercices terminés | Partiellement réalisé | Calculé en interne, mais pas retourné comme indicateur. |
| Exercices proposés | Partiellement réalisé | Calculé en interne, mais pas retourné comme indicateur. |
| Progression en pourcentage | Réalisé | Stockée dans `apprenant.progression`. |
| Challenges terminés | Partiellement réalisé | Compté en interne et recalculé dans le récapitulatif. |
| Journées renseignées | Partiellement réalisé | Calculé dans le récapitulatif d'enregistrement. |
| Gestion du total proposé nul | Réalisé | Progression fixée à `0%`. |

Fonction concernée : `calculeProgression()`.

## 11. Menu principal

| Option | Fonction | État |
|---|---|---|
| 1 | Tableau de bord | Réalisé |
| 2 | Liste des apprenants | Réalisé |
| 3 | Ajouter un apprenant | Réalisé |
| 4 | Consultation par identifiant | Réalisé |
| 5 | Ajouter ou modifier un résultat | Réalisé |
| 6 | Recherche par nom | Réalisé |
| 7 | Filtrer par niveau | Réalisé |
| 8 | Tri par progression | Réalisé |
| 9 | Tri alphabétique | Réalisé |
| 0 | Quitter | Réalisé |

## 12. Tests et livrables à vérifier

| Livrable du PDF | État | Action restante |
|---|---|---|
| Au moins cinq scénarios de test | À vérifier | Compléter `tests/scenario.js`. |
| Au moins deux cas invalides ou limites | À vérifier | Ajouter des tests d'erreur et de limites. |
| README complet | À vérifier | Décrire les calculs, les données absentes et les commandes. |
| Programme exécutable sans erreur | À vérifier | Tester toutes les options du menu. |
| Historique Git compréhensible | À vérifier | Vérifier les commits avant la remise. |

## Priorités restantes

1. Compléter les scénarios de test.
2. Tester manuellement toutes les options du menu.
3. Vérifier et compléter le README.
4. Vérifier l'historique Git.