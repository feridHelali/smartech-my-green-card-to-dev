# Javascript : Fonctions ( III )

## Fonction de première classe

### Un langage de programmation est dit avoir des fonctions de première classe lorsque les fonctions dans ce

### langage sont traitées comme n’importe quelle autre variable. Par exemple, dans un tel langage, une fonc-

### tion peut être transmise en tant qu’argument à d’autres fonctions, peut être retournée par une autre fonc-

### tion et peut être affectée en tant que valeur à une variable.

## Méthode d’un Objet

### Une méthode est une fonction (function) qui est une propriété d’un objet. Il existe deux sortes de mé-

### thodes : Les méthodes d’instance qui représentent les fonctions fournissant une interface pour effectuer

### des actions dans le contexte de l’objet qu’elles composent ou les méthodes statiques qui représentent les

### fonctions pouvant être exécutées sans nécessiter d’instanciation.

### Note: En JavaScript, les fonctions sont elles-mêmes des objets. Dans ce contexte, une méthode est plus

### précisément une référence vers un objet de type function.

```
// 1. fonction affectée en tant que valeur à une variable
const saveProduct = function( product ) {
// do staff
}
let anodherSaveProduct = saveProduct ;
// same result
saveProduct ();
anodherSaveProduct ();
// 2. fonction transmise en atant qu'argument à d'autre
// function (HightOrder function)
function map ( iterable , cb ){
let tmp= [];
for ( iterator of iterable ){
tmp. push ( cb ( iterator ));
}
return tmp ;
}
console. log (
map ( [ 1 , 2 , 3 , 4 , 5 ], function( element ){
return element** 2 ;
}
)
);
// 3. fonction retourne une fonction
function compute ( ... collection ){
return function ( cb ){
return collection. map ( e => cb ( e ));
}
}
compute ( 55 , 66 , 99 , 88 )( x => 5 *x+ 1 );
const lineItem = {
id: 325 ,
createdAt: '24/05/2021' ,
product: 'Tomato' ,
price: 3.200 ,
qte: 5 ,
// method
```

## Fonction comme Constructor

### Un constructeur est associé à un objet d’une classe particulière qui a été instanciée. Le constructeur initia-

### lise cet objet et peut fournir un accès à ses informations privées. Le concept de constructeur peut s’appli-

### quer à la plupart des langages de programmation orientée objet. Dans l’essentiel, un constructeur en Ja-

### vaScript est en général déclaré lors de l’instance d’une classe.

```
getTotal: function(){
return this. price* this. qte ;
}
}
lineItem. getTotal ();
function Personne ( name , age , gender ){
this. name=name ;
this. age=age ;
this. gender=gender ;
this. register= function ( level="S1" ){
console. log ( ' registring...' );
}
}
let personne= new Personne ( 'Kamel' , 27 , 'Homme' );
console. log ( personne );
..
```

