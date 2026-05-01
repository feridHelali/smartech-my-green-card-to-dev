# Javascript : Variables et Types Primitifs

# (Built-in)

## Définitions

### Une variable est un conteneur servant à stocker des informations de manière temporaire, comme une

### chaine de caractères (un texte) ou un nombre par exemple ( data placeholder ).

### Un type de données est l’ensemble de toutes les valeurs possibles quile le caractèrise.

### Javscript offre des types prédefinis:

### String ou « chaine de caractères » en français ;

### Number ou « nombre » en français ;

### Boolean ou « booléen » en français ;

### Null ou « nul / vide » en français;

### Undefined ou « indéfini » en français ;

### Symbol ou « symbole » en français ;

### Object ou « objet » en français ; ( type par référence )

### pour savoir le type d’une variable:

### Un expression correspond à une unité de code valide qui est résolue en une valeur. D’un point de

### vue syntaxique, toute expression valide se résout en une valeur. D’un point de vue conceptuel ce-

### pendant, il y a deux types d’expressions : celles avec des effets de bord (qui, par exemple, affectent

### une valeur à une variable) et celles qui, d’une certaine façon, sont évaluées et sont résolues en une

### valeur.

### Un opérateur d’affectation assigne une valeur à son opérande gauche, valeur basée sur celle de

### l’opérande droit. L’opérateur d’affectation simple est le signe égal (=), il assigne la valeur de l’opé-

### rande droit à l’opérande gauche. Autrement dit, avec « x = y » on affecte la valeur y à x.

### Opérateurs d’affectation ( = , += , -= , * = , /= , %/ , **= ) ,

### Opérateurs de comparaison ( == , === , != , !== , < , > , <= , >= )

### Opérateurs arithmétiques ( + , - , * , / , % , ++ , – , - , + , ** )

### Opérateurs logiques (! , || , && )

### Opérateurs de chaînes de caractères ( + , += )

### Opérateur conditionnel ternaire ( condition? exp1 : exp2 )

### typeof() ( typeof( _variable) )

### in ( property in object )

### instanceof ( instance instanceof Type|Class )

### voir

### https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators#op%c3%a9rateurs_d’affectation

## Type Objet (Object Type)

### un objet est pratiquement une collection de paires (Clef:valeur)

### Un objet JavaScript est un ensemble de correspondances entre des clés et des valeurs. Les clés

### sont représentées par des chaînes ou des symboles (Symbol). Les valeurs peuvent être de n’im-

### porte quel type. Grâce à cela, les objets peuvent, naturellement, être utilisés comme tables de

### hachage.

```
const myName = "Ali BABA" ;
const myFavoriteLanguage = 'Javascript' ;
const myBirthYear = 1971 ;
let tax = .19 ;
let isCorrect = true ;
typeof( myName ) -> "string"
typeof( isCorrect ) -> "boolean"
typeof( 1 ) -> "number"
let pricess = {
firstname : 'Chahrazed' ,
```

### Aussi une valeur peut être un objet

### Il y’a plusieurs façons de construire un objet:

### 1. let obj = { brand : « Dell », price : 2750.330 , currency : “TND” }

### 2. let obj = new Object()

### 3. constructeur ( Constructor )

### 4. class Car {} , let mercedes = new Car() ( ES6 - ESNext )...

### pour ajouter / lire une propriété d’un objet

### NB

### javascript est un language dynamique ( aka loosly-typed language )

## Constructeur prédefinis

### Number()

### String()

### Boolean()

### Object()

### Array()

### Function()

### Date()

### RegExp()

### Error()

## null et Undefined

```
lastname : 'CHAHINCHA' ,
gender : 'female' ,
isPrincess : true
}
let pricess = {
firstname : 'Chahrazed' ,
lastname : 'CHAHINCHA' ,
gender : 'female' ,
isPrincess : true,
adress : {
city : 'Baghded' ,
country : 'Iraq'
}
}
let Person = function ( living , age , gender ) {
this. living = living ;
this. age = age ;
this. gender = gender ;
this. getGender = function () {
return this. gender ;
};
};
// Instantiate a Person object
// and store it in the chahrayar variable.
let chahrayar = new Person (true, 33 , 'male' );
braket notation
> let personne = {};
> let personne [ "fullname" ] = "Zine-eddine ZIDANE" ;
> console. log ( personne )
> console. log ( personne [ "fullname" ] )
Ou
dot notation
> let player = {
fullname: "Zine-eddine ZIDANE" ,
team :"Algerian National soccer Team"
};
> console. log ( player. fullname );
```

### null : est un mot clef qui signifie « pas de valeur »

### undefined: est une variable globale / type créer en runtime et affectér à

### une variable qui est déclarée mais n’est pas initialisée

### un index d’un tableau ou propriétée d’un objet qui n’existe pas

### un parametre de fonction qui n’est pas fournis

### la valeur de retour d’une fonction qui ne fournit pas de valeur de retour

### Workshop


