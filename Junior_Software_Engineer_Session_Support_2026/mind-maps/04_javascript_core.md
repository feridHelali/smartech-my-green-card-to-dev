# JavaScript Core — Mind Map

---

## Vue d'ensemble

```mermaid
mindmap
  root((JavaScript Core))
    Fondamentaux
      Variables
        const / let / var
        Portée bloc vs fonction
        Hoisting & TDZ
      Types
        Primitifs string number boolean null undefined symbol bigint
        Référence object array function
        typeof instanceof
      Opérateurs
        Arithmétiques + - * / % **
        Comparaison === !== < > <= >=
        Logiques AND OR NOT
        Ternaire ?:
        Nullish ?? Optional chaining ?.
    Structures
      Arrays
        map filter reduce
        find findIndex some every
        flat flatMap
        Déstructuration spread
      Objects
        Littéral dot bracket notation
        Déstructuration spread
        keys values entries fromEntries
        Classes ES6
      Map et Set
        Map clef=any
        Set valeurs uniques
        WeakMap WeakSet
    Fonctions
      Déclaration vs Expression vs Arrow
      Paramètres default rest destructuring
      Scope Closure Hoisting
      HOF map filter reduce
      Currying Composition
      IIFE Récursion
      Générateurs yield
    POO
      Classes constructor
      Héritage extends super
      Encapsulation privé
      Polymorphisme override
      Prototype chain
      Mixin composition
    Async
      Callbacks callback hell
      Promises then catch finally
      async await try catch
      Promise.all allSettled race any
      Fetch API
      AbortController
      Event Loop Call Stack Queue
    DOM et BOM
      Sélecteurs getElementById querySelector
      Manipulation textContent innerHTML classList style
      Événements addEventListener bubbling delegation
      Forms FormData validation
      localStorage sessionStorage
      window location history
      MutationObserver IntersectionObserver
```

---

## Flux d'exécution JavaScript

```mermaid
flowchart TD
    subgraph ENGINE["🔧 JavaScript Engine (V8)"]
        PARSE[Parse → AST]
        COMPILE[JIT Compile]
        EXEC[Execute]
        PARSE --> COMPILE --> EXEC
    end

    subgraph RUNTIME["⚙️ Runtime"]
        STACK["📚 Call Stack"]
        HEAP["🗄️ Heap Memory"]
        STACK <--> HEAP
    end

    subgraph ASYNC["🌐 Async Layer"]
        WEBAPI["Web APIs<br/>setTimeout, fetch, DOM events"]
        MACRO["Macrotask Queue<br/>setTimeout, setInterval"]
        MICRO["Microtask Queue<br/>Promise.then, queueMicrotask"]
        LOOP["🔄 Event Loop"]
        WEBAPI --> MACRO
        WEBAPI --> MICRO
        LOOP -->|Check microtasks first| MICRO
        LOOP -->|Then macrotasks| MACRO
    end

    EXEC --> ASYNC
    LOOP -->|Push to stack when empty| STACK
```

---

## Cycle de vie d'une Promise

```mermaid
stateDiagram-v2
    [*] --> Pending : new Promise()
    Pending --> Fulfilled : resolve(value)
    Pending --> Rejected : reject(error)
    Fulfilled --> [*] : .then(handler)
    Rejected --> [*] : .catch(handler)
    Fulfilled --> [*] : .finally(cleanup)
    Rejected --> [*] : .finally(cleanup)
```

---

## Hiérarchie de Portée (Scope)

```mermaid
graph TD
    subgraph GLOBAL["🌍 Global Scope"]
        G1["const TAX = 0.19"]
        G2["function calculateNet()"]
        subgraph FUNC["📦 Function Scope"]
            F1["const local = ..."]
            subgraph BLOCK1["🔒 Block Scope (if)"]
                B1["let bonus = ..."]
            end
            subgraph BLOCK2["🔒 Block Scope (for)"]
                B2["let i = ..."]
            end
        end
    end
```

---

## Chaîne de Prototypes (Prototype Chain)

```mermaid
graph LR
    DOG_INST["rex { name, tricks }"] -->|__proto__| DOG_PROTO["Dog.prototype<br/>learn(), speak()"]
    DOG_PROTO -->|__proto__| ANIMAL_PROTO["Animal.prototype<br/>speak()"]
    ANIMAL_PROTO -->|__proto__| OBJ_PROTO["Object.prototype<br/>hasOwnProperty, toString, valueOf"]
    OBJ_PROTO -->|__proto__| NULL["null"]
```

---

## Patterns Architecturaux

```mermaid
mindmap
  root((Design Patterns JS))
    Creational
      Factory Function
      Constructor Pattern
      Singleton
      Builder
    Structural
      Module Pattern
      Mixin
      Decorator
      Proxy
    Behavioral
      Observer / EventEmitter
      Strategy
      Command
      Iterator Generator
    Functional
      Pure Functions
      Immutability
      Currying
      Composition Pipe
      Monad Maybe Either
```

---

## Techniques IT par Domaine

```mermaid
graph TD
    subgraph INVOICING["🧾 Facturation"]
        I1[Calcul TVA/TTC]
        I2[Génération numéros séquentiels]
        I3[Filtrage et tri de factures]
        I4[Export PDF/CSV]
    end

    subgraph PAYROLL["💰 Paie"]
        P1[Calcul salaire net CNSS/IRG]
        P2[Grille de salaires par tranche]
        P3[Bulletins de paie HTML]
        P4[Traitement parallèle Promise.all]
    end

    subgraph ACCOUNTING["📊 Comptabilité"]
        A1[Partie double débit/crédit]
        A2[Grand livre par compte]
        A3[Balance vérification]
        A4[Amortissements]
    end

    JS((JavaScript)) --> INVOICING
    JS --> PAYROLL
    JS --> ACCOUNTING
```

---

## Async / Await — Decision Tree

```mermaid
flowchart TD
    START[Code asynchrone nécessaire ?] -->|Non| SYNC[Code synchrone]
    START -->|Oui| MANY{Plusieurs opérations ?}
    MANY -->|En séquence| SEQ["await op1\nawait op2\nawait op3"]
    MANY -->|En parallèle| PAR["await Promise.all([op1, op2, op3])"]
    MANY -->|Premier qui répond| RACE["await Promise.race([op1, op2])"]
    MANY -->|Premier succès| ANY["await Promise.any([op1, op2])"]
    MANY -->|Toutes, même erreurs| SETTLED["await Promise.allSettled([op1, op2])"]
```
