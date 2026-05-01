# Javascript : Les valeurs primitives et les

# objets globaux

## Retour sur les types de valeurs

En JavaScript, il existe 7 types de valeurs différents. Chaque valeur qu’on va pouvoir créer et manipuler en
JavaScript va obligatoirement appartenir à l’un de ces types. Ces types sont les suivants :

```
string ou « chaine de caractères » en français ;
number ou « nombre » en français ;
boolean ou « booléen » en français ;
null ou « nul / vide » en français;
undefined ou « indéfini » en français ;
symbol ou « symbole » en français ;
object ou « objet » en français ;
```
Les valeurs appartenant aux 6 premiers types de valeurs sont appelées des valeurs primitives. Les valeurs
appartenant au type object sont des objets.

## Définition des valeurs primitives et différence avec les

## objets

Le JavaScript possède deux grandes catégories de types de données : les valeurs primitives et les objets.
On appelle valeur primitive en JavaScript une valeur qui n’est pas un objet et qui ne peut pas être modi-
fiée. En effet, une fois un nombre ou une chaine de caractères définis, on ne va plus pouvoir les modifier en
JavaScript. Bien évidemment, si on stocke une chaine de caractères dans une variable, par exemple, on va
tout à fait pouvoir écraser cette chaine pour stocker une autre valeur. Pour autant, la chaine de caractères
stockée n’aura pas été modifiée : elle aura été écrasée et c’est bien une nouvelle valeur complètement diffé-
rente qui va être stockée dans notre variable dans ce cas.

Cela va être différent pour les objets : on va tout à fait pouvoir modifier les membres d’un objet. Autre dif-
férence notable entre valeurs primitives et objets : les valeurs primitives sont passées et comparées par va-
leur tandis que les objets sont passés et comparés par référence.

Si deux valeurs primitives ont la même valeur, elles vont être considérées égales. Si deux objets définissent
les mêmes propriétés et méthodes avec les mêmes valeurs, ils ne vont pas être égaux. Pour que deux objets
soient égaux, il faut que les deux fassent référence aux mêmes membres.

**NB: Chaque type de valeur primitive, à l’exception de null et de undefined, possède un équi-
valent objet prédéfini en JavaScript. Ainsi, le JavaScript possède quatre objets natifs
String, Number, Boolean et Symbol qui contiennent des propriétés et des méthodes.**

## Méthodes de chaîne (String)

```
Il existe de nombreuses façons de travailler avec des chaînes:
```
```
charAt() - Renvoie un caractère à une position spécifiée dans une chaîne
charCodeAt() - Vous donne l’Unicode d’un caractère à cette position
concat() - Concatène (joint) deux chaînes ou plus en une seule
fromCharCode() - Renvoie une chaîne créée à partir de la séquence spécifiée d’unités de code UTF-
16
indexOf() - Fournit la position de la première occurrence d’un texte spécifié dans une chaîne
lastIndexOf()- Identique à indexOf()mais avec la dernière occurrence, recherche en arrière
match() - Récupère les correspondances d’une chaîne par rapport à un modèle de recherche
replace() - Rechercher et remplacer le texte spécifié dans une chaîne
search() - Exécute une recherche d’un texte correspondant et renvoie sa position
slice() - Extrait une section d’une chaîne et la renvoie comme une nouvelle chaîne
```

```
split() - Divise un objet chaîne en un tableau de chaînes à une position spécifiée
substr()- Similaire à slice() mais extrait une sous-chaîne en fonction d’un nombre spécifié de
caractères
substring()- Également similaire à slice() mais ne peut pas accepter les indices négatifs
toLowerCase() - Convertir les chaînes en minuscules
toUpperCase() - Convertir les chaînes en majuscules
valueOf() - Renvoie la valeur primitive (qui n’a ni propriétés ni méthodes) d’un objet chaîne
```
## Méthodes Math

```
abs(x) - Renvoie la valeur absolue (positive) de x
acos(x) - l’arc cosinus de x, en radians
asin(x) - Arc sinus de x, en radians
atan(x) - L’arc tangente de x comme valeur numérique
atan2(y,x) - Arctangente du quotient de ses arguments
ceil(x) - Valeur de x arrondie à son entier le plus proche
cos(x) - Le cosinus de x (x est en radians)
exp(x)- Valeur de E x
floor(x) - La valeur de x arrondie à son entier le plus proche
log(x) - Le logarithme naturel (base E) de x
max(x,y,z,...,n) - Renvoie le nombre avec la valeur la plus élevée
min(x,y,z,...,n) - Idem pour le nombre avec la valeur la plus basse
pow(x,y) - X à la puissance y
random() - Renvoie un nombre aléatoire entre 0 et 1
round(x) - La valeur de x arrondie à son entier le plus proche
sin(x) - Le sinus de x (x est en radians)
sqrt(x) - Racine carrée de x
tan(x) - La tangente d’un angle
```
## Méthodes Array

```
Une fois que vous avez créé des tableaux, vous pouvez en faire plusieurs choses:
```
```
concat() - Rejoignez plusieurs tableaux en un seul
indexOf() - Renvoie la première position à laquelle un élément donné apparaît dans un tableau
join() - Combinez les éléments d’un tableau en une seule chaîne et retournez la chaîne
lastIndexOf() - Donne la dernière position à laquelle un élément donné apparaît dans un
tableau
pop() - Supprime le dernier élément d’un tableau
push() - Ajouter un nouvel élément à la fin
reverse() - Trier les éléments dans un ordre décroissant
shift() - Supprimer le premier élément d’un tableau
slice() - Extrait une copie d’une partie d’un tableau dans un nouveau tableau
sort() - Trie les éléments par ordre alphabétique
splice() - Ajoute des éléments d’une manière et d’une position spécifiées
toString() - Convertit les éléments en chaînes
unshift() : Ajoute un nouvel élément au début
valueOf() - Renvoie la valeur primitive de l’objet spécifié
map, filter, reduce, some ...
```
## Sortie de données

```
La sortie de données est une application courante des fonctions. Pour la sortie, vous disposez des
options suivantes:
```
```
alert() - Sortie des données dans une boîte d’alerte dans la fenêtre du navigateur
confirm() - Ouvre une boîte de dialogue oui / non et renvoie vrai / faux en fonction du clic de
l’utilisateur
console.log() - Écrit des informations sur la console du navigateur, utile à des fins de débogage
```

```
document.write() - Ecrire directement dans le document HTML
prompt() - Crée un dialogue pour l’entrée de l’utilisateur
```
voir **cheat sheet Javascript**


