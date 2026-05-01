# Javascript : Structure des Données et

# Transfert de Contrôle

## Définitions

## Paradigme de programmation :

#### Un paradigme de programmation est une façon d’approcher la programmation informatique et de trai-

#### ter les solutions aux problèmes et leur formulation dans un langage de programmation approprié. Il

#### s’oppose à la méthodologie, qui est une manière d’organiser la solution des problèmes spécifiques du

#### génie logiciel.

#### Un paradigme de programmation fournit (et détermine) la vue qu’a le développeur de l’exécution de

#### son programme. Par exemple, en programmation orientée objet , les développeurs peuvent considé-

#### rer le programme comme une collection d’objets en interaction, tandis qu’en programmation fonc-

#### tionnelle un programme peut être vu comme une suite d’évaluations de fonctions sans états.

#### Javascript est un language multi-paradigme

#### https://fr.wikipedia.org/wiki/Paradigme_(programmation)

## Séquences:

#### Une séquence est un ensemble d’instructions exécutées les unes après les autres. Un code source est

#### un ensemble d’instructions dont la séquence est l’ordre dans lequel il a été écrit. Le processeur le lira

#### ensuite dans l’ordre du début à la fin, exécutant le code au fur et à mesure (Top-Down).

## Selections:

#### Une sélection est une instruction conditionnelle. Nous pouvons faire faire quelque chose à une ma-

#### chine et arrêter de faire quelque chose, mais nous pouvons aussi dire à la machine quand arrêter de

#### faire ce processus lorsqu’une certaine condition (ou conditions) est remplie. Cela peut être fait avec

#### une instruction if ou swich. Ceci indique une condition qui doit être remplie et indique ensuite à la

#### machine ce que vous voulez qu’elle fasse.

```
let radius= 10 ;
let surface = Math. pi * ( radius ** 2 );
console. log ( radius );
```
```
isStarted = true;
if ( isStartd ){
// Do Staff
}
```
```
if ( isStartd ) {
// Do Staff
} else {
// Do another Staff
}
```
```
if ( isStartd ){
// Do Staff
} else if ( anotherCondition ) {
// Do Extra-Staff
}
```
```
switch( expression ) {
case x:
// code block
```

### Itérations:

#### Cela nous permet de répéter un bloc d’instructions un certain nombre de fois tant que une condition

#### est vraie.

## Structure de donnée en javascript

#### Objet ( Javascript : Variables et Types Primitifs (Built-in) )

#### Les collections indexées : les tableaux (Arrays) et les tableaux typés (Typed Arrays)

#### Les collections avec clés : Maps, Sets, WeakMaps, WeakSets

#### Les données structurées : JSON ( Javascript Object Notation )

#### Objets globaux standards (par catégorie)

#### Infinity

#### NaN

#### undefined

#### le littéral null

#### global

#### this

#### Objets de contrôle d’abstraction

#### Promise

#### Generator

#### GeneratorFunction

#### AsyncFunction

#### Introspection

#### Reflect

```
break;
case y:
// code block
break;
default :
// code block
}
```
##### // 1.

```
for (let i = 1 ; i <= 5 ; i++ ){
// Do Staff
}
```
```
// 2.
for ( iteror of iterable ){
// Do some processing with iterator
}
```
```
// 3.
for ( property in object ){
// Do some processing with property
}
```
```
// 4.
while( conditionEvaluatedToTrue ){
// Do Staff
}
```
```
// 5.
do {
// Do Staff
}while( conditionEvaluatedToTrue );
```
```
/**
* 6. Array.forEach ,Array.map , Array.reduce,
* Array.filter, Array.every, Array.some ...
* (fp Style)
*/
```

#### Proxy

### Les tableaux et les Itérations

### Les propriétées d’objet et les Itérations

#### Workshop

```
// Array
let fruits = [ 'Apple' , 'Banana' ];
```
```
// Map ( dictionnaire )
let mydict = new Map ([ iterable ])
```
```
// Set ( ensemble )
const ensemble_1_5 = new Set ([ 1 , 2 , 3 , 4 , 5 ]);
```
```
// WeakMap
let card = new WeakMap ([ itérable ])
```
```
// WeekSet
let ensemble = new WeakSet ([ itérable ]);
```
```
let northAficanCountries = [ 'Tunisia' , 'Algeria' , 'Maroc' ,
'Libya' , 'Moritania' , 'Egypt' ];
```
```
for (let i= 0 ; i < northAficanCountries. length ; i++ ){
console. log ( northAficanCountries [ i ] );
}
```
```
for ( country of northAficanCountries ){
console. log ( country );
}
```
```
northAficanCountries. forEach ( function( country ) {
return console. log ( country );
}
);
```
```
let product = {
brand : "Dell Optiplex" ,
device : "Desktop Personal Computer" ,
category : "Hardware" ,
price : 4300 ,
stock : 15
}
```
```
for ( property in product ){
console. log ( property );
}
```

