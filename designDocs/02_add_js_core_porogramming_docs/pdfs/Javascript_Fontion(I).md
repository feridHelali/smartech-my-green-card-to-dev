# Javascript : Fonctions ( I )

## Définition

## fonction (function) : Une fonction est une portion de code qui peut être appelée par d’autres codes ou

## par elle-même ou par une variable qui se réfère à la fonction. Lorsqu’une fonction est appelée, des ar-

## guments lui sont généralement donnés en entrée. La fonction peut également retourner une valeur de

## sortie. En JavaScript, une fonction est aussi un objet.

## Un nom de fonction est un identifiant déclaré dans le cadre d’une déclaration de fonction ou de l’ex-

## pression d’une fonction. Le fait que le nom de fonction soit déclaré ou exprimé impacte la portée du

## nom de fonction.

## Différents types de fonctions

## Une fonction anonyme est une fonction sans nom de fonction :

## Une fonction nommée est une fonction avec un nom de fonction :

```
function () {};
// ou en utilisant la notation de flèche de ECMAScript 2015
() => {};
function foo () {};
// ou en utilisant la notation de flèche de ECMAScript 2015
const foo = () => {};
```

## Une fonction imbriquée (ou fonction interne) est une fonction à l’intérieur d’une autre fonction

## (square dans l’exemple suivant). Une fonction externe est une fonction qui contient une fonction

## (addSquares dans l’exemple suivant) :

## Une fonction récursive est une fonction qui fait appel à elle-même. Voir récursion.

## Une expression de fonction invoquée immédiatement (IIFE) est une fonction appelée directement

## après le chargement de la fonction dans le compilateur du navigateur. La façon d’identifier une

## IIFE est de localiser les parenthèses gauche et droite supplémentaires à la fin de la déclaration de

## la fonction.

## https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

## voir aussi : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions

```
function addSquares ( a , b ) {
function square ( x ) {
return x * x ;
}
return square ( a ) + square ( b );
};
//En utilisant la notation de flèche de ECMAScript 2015
const addSquares = ( a , b ) => {
const square = x => x*x ;
return square ( a ) + square ( b );
};
function loop ( x ) {
if ( x >= 10 )
return;
loop ( x + 1 );
};
//En utilisant la notation de flèche de ECMAScript 2015
const loop = x => {
if ( x >= 10 )
return;
loop ( x + 1 );
};
(function foo () {
console. log ( "Hello Foo" );
}());
(function doStaff ( args ){
// processing staff here
})( parameter )
```

