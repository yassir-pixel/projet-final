 # Documentation des scénarios de test

## 1. Objectif du fichier

Le fichier `scenario.js` vérifie une partie du comportement de l'application SAS Progress Console.

Les tests servent à vérifier que :

- les données sont correctement parcourues ;
- les calculs donnent les résultats attendus ;
- les valeurs invalides sont refusées ;
- les niveaux sont attribués selon les seuils du sujet ;
- les tris respectent l'ordre demandé.

Le fichier contient deux types de vérifications :

1. des scénarios automatiques exécutés avec `assert` ;
2. des scénarios interactifs à exécuter manuellement dans le menu du programme.

## 2. Lancer les tests automatiques

Depuis la racine du projet, exécuter :

```bash
node tests/scenario.js
```

Si toutes les vérifications réussissent, le terminal affiche les messages de réussite des scénarios puis :

```txt
Tous les scénarios automatiques sont réussis.
```

Lorsqu'une assertion échoue, Node.js arrête le fichier et affiche une erreur. Cela indique qu'une valeur obtenue ne correspond pas à la valeur attendue.

## 3. Outils utilisés

### `assert`

Le projet utilise `node:assert/strict`. C'est un module intégré à Node.js, donc aucune dépendance externe ou aucun framework de test n'est utilisé.

Exemple :

```js
assert.equal(sara.progression, "80%");
```

Cette ligne signifie :

- prendre la progression calculée de `sara` ;
- vérifier qu'elle est égale à `80%` ;
- arrêter le test si le résultat est différent.

### `structuredClone`

Certains tests copient un apprenant ou la liste des apprenants :

```js
const sara = structuredClone(apprenants[0]);
```

Cela permet de tester sans modifier les données originales de `data.js`.

La même méthode est utilisée avant les tris :

```js
const listeParProgression = structuredClone(apprenants);
```

## 4. Source des données de test

Les données utilisées par les scénarios viennent directement de :

```js
import { apprenants } from "../srcs/data.js";
```

Les tests n'écrivent pas une deuxième version des apprenants. Ils utilisent donc la même structure que l'application :

```js
{
	id,
	nom,
	prenom,
	ville,
	resultats: []
}
```

## 5. Scénario automatique 1 : progression de Sara

### Fonctionnalités testées

- `calculeProgression()` ;
- `definirPalier()`.

### Données utilisées

Le premier apprenant de `data.js` est Sara. Ses résultats sont :

```txt
18 exercices terminés sur 20
14 exercices terminés sur 20
```

Le calcul attendu est :

```txt
(18 + 14) / (20 + 20) * 100 = 80%
```

Le seuil de `80%` correspond au niveau `Solide`.

### Vérifications

```js
assert.equal(sara.progression, "80%");
assert.equal(sara.niveau, "Solide");
```

## 6. Scénario automatique 2 : validation d'un identifiant

### Fonction testée

- `isValidId()`.

### Cas vérifiés

```js
assert.equal(isValidId(1), true);
assert.equal(isValidId(-1), false);
assert.equal(isValidId(1.5), false);
```

Ce scénario vérifie :

- un entier accepté ;
- un nombre négatif refusé ;
- un nombre décimal refusé.

## 7. Scénario automatique 3 : validation d'un nom

### Fonction testée

- `isValidNomPrenom()`.

### Cas vérifiés

```js
assert.equal(isValidNomPrenom("Sara", "N"), true);
assert.equal(isValidNomPrenom("Sa", "N"), false);
assert.equal(isValidNomPrenom("Sara2", "N"), false);
```

Ce scénario vérifie :

- un nom correct accepté ;
- un nom trop court refusé ;
- un nom contenant un chiffre refusé.

## 8. Scénario automatique 4 : apprenant sans résultat

### Fonctions testées

- `calculeProgression()` ;
- `definirPalier()`.

Le tableau `resultats` est vide :

```js
resultats: []
```

Le résultat attendu est :

```txt
progression : 0%
niveau : À renforcer
```

Ce scénario vérifie le cas limite où aucun exercice n'est encore proposé et évite une division par zéro.

## 9. Scénario automatique 5 : seuils des niveaux

### Fonction testée

- `definirPalier()`.

### Seuils imposés par le PDF

| Progression | Niveau attendu |
|---|---|
| 80% | Solide |
| 50% | En progression |
| 49% | À renforcer |

Le scénario vérifie aussi les frontières importantes du classement.

## 10. Scénario automatique 6 : tri par progression

### Fonction testée

- `trierParProgression()`.

Les progressions sont recalculées pour tous les apprenants, puis une copie de la liste est triée.

Vérifications principales :

- Sara doit être en première position avec `80%` ;
- Jean doit être en dernière position avec `0%`.

Le tri demandé par le PDF est décroissant : du pourcentage le plus élevé au plus faible.

## 11. Scénario automatique 7 : tri alphabétique

### Fonction testée

- `trierParOrdreAlphabétique()`.

Une copie des apprenants est triée par la propriété `nom`.

Vérifications principales :

- `Jean` doit être le premier nom ;
- `Yassmine` doit être le dernier nom.

La fonction utilise une comparaison sans tenir compte des majuscules et minuscules.

## 12. Scénarios interactifs

Les fonctions interactives utilisent `readline` pour demander des valeurs dans le terminal. Elles sont donc testées manuellement avec le menu principal.

### Scénario 8 : tableau de bord

1. Lancer le programme.
2. Choisir `1`.
3. Vérifier :
   - le nombre total d'apprenants ;
   - la progression moyenne ;
   - les trois niveaux ;
   - les journées non renseignées ;
   - les challenges terminés ou non terminés.

### Scénario 9 : liste des apprenants

1. Choisir `2`.
2. Vérifier que les apprenants de `data.js` sont affichés avec leur identifiant, leur nom, leur progression et leur niveau.

### Scénario 10 : ajout d'un apprenant

1. Choisir `3`.
2. Saisir un nouvel identifiant.
3. Saisir un nom, un prénom et une ville.
4. Vérifier que l'apprenant est ajouté.
5. Vérifier que son tableau `resultats` est vide.
6. Vérifier que sa progression et son niveau sont calculés.
7. Recommencer avec un identifiant existant et vérifier que l'ajout est refusé.

### Scénario 11 : consultation par identifiant

1. Choisir `4`.
2. Saisir `9`.
3. Vérifier que Jean est trouvé, même si son identifiant ne correspond pas à sa position dans le tableau.
4. Recommencer avec `99`.
5. Vérifier qu'un message indique que l'apprenant n'existe pas.

### Scénario 12 : ajout ou modification d'un résultat

1. Choisir `5`.
2. Saisir l'identifiant `1`.
3. Saisir le jour `3`.
4. Saisir `16` exercices terminés.
5. Saisir `20` exercices proposés.
6. Saisir `oui` pour le challenge.
7. Vérifier le récapitulatif :

```txt
48 / 60 exercices, progression 80 %.
3 journées renseignées, 2 challenges terminés.
```

Pour un cas invalide, recommencer avec :

- le jour `8` ;
- `21` exercices terminés sur `20` proposés ;
- une réponse de challenge autre que `oui` ou `non`.

### Scénario 13 : recherche par nom

1. Choisir `6`.
2. Saisir `sara`.
3. Vérifier que Sara est retrouvée.
4. Recommencer avec `cla` pour tester une recherche partielle dans le prénom.

### Scénario 14 : filtre par niveau

1. Choisir `7`.
2. Saisir `1`, puis vérifier les profils `Solide`.
3. Recommencer avec `2` pour `En progression`.
4. Recommencer avec `3` pour `À renforcer`.

### Scénario 15 : tri par progression

1. Choisir `8`.
2. Vérifier que la liste commence par la progression la plus élevée.

### Scénario 16 : tri alphabétique

1. Choisir `9`.
2. Vérifier l'ordre alphabétique des noms : Jean, Mehdi, Sara, Yassine, Yassmine.

## 13. Interprétation des résultats

Un scénario réussi signifie que la valeur attendue correspond à la valeur produite par le programme.

Un scénario échoué doit être analysé ainsi :

1. lire le message d'erreur ;
2. identifier la fonction appelée ;
3. comparer la valeur attendue avec la valeur obtenue ;
4. corriger la fonction concernée ;
5. relancer `node tests/scenario.js`.

Les scénarios automatiques ne remplacent pas les scénarios interactifs. Les premiers vérifient directement les calculs et les tris ; les seconds vérifient le parcours réel de l'utilisateur dans le menu.
