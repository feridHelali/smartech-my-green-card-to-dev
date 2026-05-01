# Javascript : Orienté Objet

## Les paradigmes de programmation

### Avant de parler de ce qu’est la programmation orientée objet en JavaScript en soi ou de définir ce qu’est

### un objet, il me semble essentiel de vous parler des paradigmes de programmation car cela devrait rendre la

### suite beaucoup plus claire.

### Un « paradigme » de programmation est une façon d’approcher la programmation informatique, c’est-à-

### dire une façon de voir (ou de construire) son code et ses différents éléments.

### Il existe trois paradigmes de programmation particulièrement populaires, c’est-à-dire trois grandes façons

### de penser son code :

### La programmation procédurale ;

### La programmation fonctionnelle ;

### La programmation orientée objet.

### Une nouvelle fois, retenez bien que chacun de ces paradigmes ne correspond qu’à une façon différente de

### penser, d’envisager et d’organiser son code et qui va donc obéir à des règles et posséder des structures

### différentes.

### La programmation procédurale est le type de programmation le plus commun et le plus populaire. C’est

### une façon d’envisager son code sous la forme d’un enchainement de procédures ou d’étapes qui vont ré-

### soudre les problèmes un par un. Cela correspond à une approche verticale du code où celui-ci va s’exécuter

### de haut en bas, ligne par ligne. Jusqu’à présent, nous avons utilisé cette approche dans nos codes

### JavaScript.

### La programmation fonctionnelle est une façon de programmer qui considère le calcul en tant qu’évalua-

### tion de fonctions mathématiques et interdit le changement d’état et la mutation des données. La program-

### mation fonctionnelle est une façon de concevoir un code en utilisant un enchainement de fonctions «

### pures », c’est-à-dire des fonctions qui vont toujours retourner le même résultat si on leur passe les mêmes

### arguments et qui ne vont retourner qu’une valeur sans modification au-delà de leur contexte.

### La programmation orientée objet est une façon de concevoir un code autour du concept d’objets. Un objet

### est une entité qui peut être vue comme indépendante et qui va contenir un ensemble de variables (qu’on va

### appeler propriétés) et de fonctions (qu’on appellera méthodes). Ces objets vont pouvoir interagir entre

### eux.

### Ces premières définitions doivent vous paraitre très abstraites et très floues. C’est tout à fait normal : on

### essaie ici de résumer des façons entières de penser la programmation en quelques lignes!

### Les choses importantes à retenir pour le moment sont les suivantes :

### Il existe différentes façons de penser / voir / concevoir son code qu’on appelle « paradigmes » ; La plupart

### des langages supportent aujourd’hui plusieurs paradigmes et le JavaScript, en particulier, supporte chacun

### des trois paradigmes principaux cités ci-dessus ce qui signifie qu’on va pouvoir coder en procédural, en

### fonctionnel et en orienté objet en JavaScript ; Un paradigme n’est qu’une façon de coder il est important

### de comprendre qu’un paradigme n’exclut pas les autres. Au contraire, on va souvent utiliser plusieurs pa-

### radigmes dans un même script en fonction de ce qu’on souhaite réaliser.

## Première définition de l’orienté objet et des objets en

## JavaScript

### Le JavaScript est un langage qui possède un fort potentiel pour la programmation orientée objet (abrégée

### en POO). En effet, vous devez savoir que le JavaScript est un langage qui intègre l’orienté objet dans sa dé-

### finition même ce qui fait que tous les éléments du JavaScript vont soit être des objets, soit pouvoir être

### convertis et traités comme des objets. Il est donc essentiel de bien comprendre cette partie sur les objets

### pour véritablement maitriser le JavaScript et utiliser tout ce qui fait sa puissance.


### Un objet, en informatique, est un ensemble cohérent de données et de fonctionnalités qui vont fonctionner

### ensemble. Pour le dire très simplement, un objet en JavaScript est un conteneur qui va pouvoir stocker

### plusieurs variables qu’on va appeler ici des propriétés. Lorsqu’une propriété contient une fonction en va-

### leur, on appelle alors la propriété une méthode. Un objet est donc un conteneur qui va posséder un en-

### semble de propriétés et de méthodes qu’il est cohérent de regrouper.

## Quels avantages et intérêts de coder en orienté objet en

## JavaScript?

### Le développement orienté objet correspond à une autre façon d’envisager et d’organiser son code en grou-

### pant des éléments cohérents au sein d’objets. Les intérêts supposés principaux de développer en orienté

### objet plutôt qu’en procédural par exemple sont de permettre une plus grande modularité ou flexibilité du

### code ainsi qu’une meilleure lisibilité et une meilleure maintenabilité de celui-ci. Dans tous les cas, les ob-

### jets font partie du langage JavaScript natif et il est donc obligatoire de savoir les utiliser pour déverrouiller

### tout le potentiel du JavaScript.

### En effet, vous devez bien comprendre ici que certains langages ne proposent pas de composants objets

### c’est-à-dire ne nous permettent pas de créer des objets et donc de créer du code orienté objet. Certains

### autres langages supportent l’utilisation d’objets et possèdent quelques objets natifs (objets prédéfinis et

### immédiatement utilisables).

### Le langage JavaScript, pour sa part, possède une très grande composante objet et la plupart des éléments

### qu’on va manipuler en JavaScript proviennent d’objets natifs du langage. Il est donc indispensable de

### comprendre comment la programmation orientée objet fonctionne et de connaitre ces objets natifs pour

### utiliser pleinement le JavaScript.

## Classe et objet (ES6)

### L’objet est une chose qui peut être vue ou touchée et dans le logiciel, nous essayons de représenter la

### même chose réelle avec un objet. La programmation orientée objet n’est rien d’autre que du code autour

### de cet objet. La classe n’est pas un objet, c’est comme un blueprint qui peut générer des objets. Ainsi, la

### classe aide à définir la classification des objets avec ses propriétés et ses capacités. N’importe quel nombre

### d’instances peut être créé à partir d’une classe, chaque instance est appelée Objet.

```
// Vehicule Class
class Vehicule {
```
```
// Constructor
constructor( _engine , _brand ){
this. engine=_engine ;
this. brand=_brand ;
this. speed= 0 ;
}
```
```
// Getters
get Engine (){
return this. engine ;
}
get Brand (){
return this. brand ;
}
get Speed (){
return this. speed ;
}
```
```
// Setters
set Engine ( value ){
this. engine=value ;
}
```
```
// Commands
start (){
console. log ( `${ this. brannd} is starting ...` );
```

## Constructeur, Propriétés et Méthodes

### Le constructeur est juste une fonction qui est appelée automatiquement lorsque nous créons une

### instance à partir de la classe.

### Les variables d’instance sont créées et initialisées à l’aide du constructeur.

### Les variables d’instance ne sont que des propriétés appelées de l’objet.

### Les méthodes sont à nouveau des fonctions attachées à une instance et toutes les instances créées

### à partir de la même classe auront ces méthodes ou actions.

## Propriétés et méthodes statiques

### Chaque instance de la classe aura ses propres propriétés qui seront créées au niveau du constructeur, mais

### la classe peut également avoir ses propres propriétés. Les propriétés de classe uniquement sont appelées

### Propriétés statiques. Il en va de même pour les méthodes statiques.

## Héritage

### Le mot-clé extends, utilisé dans les déclarations ou les expressions de classes, permet de créer une classe

### qui hérite d’une autre classe (on parle aussi de « sous-classe » ou de « classe-fille »).

#### }

```
accelerate ( value ){
this. speed+=value ;
}
decelerate ( value ){
this. speed-=value ;
}
```
```
// Queries
toString (){
return `Vehicule {\n brand :${ this. brand},\n engine:${ this. engine}\n speed:${ this. s
}
```
```
}
```
```
// instanciation
let mercedes= new Vehicule ( "Turbo Injection Merceds" , "Mercedes Class C" );
mercedes. accelerate ( 10 );
mercedes. accelerate ( 10 );
mercedes. decelerate ( 5 );
```
```
console. log ( mercedes. Brand , mercedes. Engine );
console. log ( mercedes. toString ());
console. dir ( mercedes );
```
```
class Animal {
constructor ( nom ) {
this. nom = nom ;
}
```
```
parle () {
console. log ( `${ this. nom} fait du bruit.` );
}
}
```
```
class Chien extends Animal {
constructor ( nom ) {
super( nom ); // appelle le constructeur parent avec le paramètre
}
parle () {
console. log ( `${ this. nom} aboie.` );
}
}
```

### Si on déclare un constructeur dans une classe fille, on doit utiliser super() avant this.

### On peut également étendre des classes plus traditionnelles basées sur des constructeurs fonctionnels :

### En revanche, les classes ne permettent pas d’étendre des objets classiques non-constructibles. Si on sou-

### haite créer un lien d’héritage en un objet et une classe, on utilisera Object.setPrototypeOf() :

```
function Animal ( nom ) {
this. nom = nom ;
}
```
```
Animal. prototype. crie = function () {
console. log ( `${ this. nom} fait du bruit.` );
}
```
```
class Chien extends Animal {
crie () {
super. crie ();
console. log ( `${ this. nom} aboie.` );
}
}
```
```
let c = new Chien ( 'Ida' );
c. crie ();
// Ida fait du bruit.
// Ida aboie.
```
```
const Animal = {
crie () {
console. log ( `${ this. nom} fait du bruit.` );
}
};
```
```
class Chien {
constructor ( nom ) {
this. nom = nom ;
}
```
```
crie () {
super. crie ();
console. log ( `${ this. nom} aboie.` );
}
}
```
```
Object. setPrototypeOf ( Chien. prototype , Animal );
```
```
let d = new Chien ( 'Ida' );
d. crie ();
// Ida fait du bruit
// Ida aboie.
```

