# JavaScript Core — Cheat Sheet

> Référence rapide ES6+ pour junior engineers

---

## Variables & Types

```javascript
// Déclaration
const PI = 3.14159          // immuable
let   count = 0             // mutable
// var — à éviter (portée fonction, hoistée)

// Types primitifs
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object"  ← bug historique
typeof Symbol()     // "symbol"
typeof 42n          // "bigint"
typeof {}           // "object"
typeof []           // "object"
typeof function(){} // "function"

// Coercion
+"42"          // 42
!!""           // false
Boolean([])    // true  ⚠️
Boolean({})    // true  ⚠️

// Nullish / Optional Chaining
a ?? b         // b si a est null/undefined
a?.b?.c        // undefined si a ou b est null/undefined
a?.()          // appel de méthode optional
```

---

## Strings

```javascript
const s = "JavaScript"
s.length               // 10
s.toUpperCase()        // "JAVASCRIPT"
s.toLowerCase()        // "javascript"
s.includes("Script")   // true
s.startsWith("Java")   // true
s.endsWith("pt")       // true
s.indexOf("S")         // 4
s.slice(0, 4)          // "Java"
s.split("a")           // ["J", "v", "Script"]
s.trim()               // supprime espaces
s.replace("Java", "Type")  // "TypeScript"
s.padStart(12, '0')    // "00JavaScript"
s.repeat(3)            // "JavaScriptJavaScriptJavaScript"

// Template literals
`Bonjour ${name}, total: ${total.toFixed(2)} TND`
```

---

## Numbers & Math

```javascript
Number.isInteger(5)        // true
Number.isFinite(Infinity)  // false
Number.isNaN(NaN)          // true  (préférer à isNaN global)
Number.parseInt("42px")    // 42
Number.parseFloat("3.14x") // 3.14

Math.abs(-5)       // 5
Math.round(4.5)    // 5
Math.floor(4.9)    // 4
Math.ceil(4.1)     // 5
Math.max(1,2,3)    // 3
Math.min(1,2,3)    // 1
Math.pow(2, 10)    // 1024
Math.sqrt(16)      // 4
Math.random()      // 0 ≤ x < 1

// Formatage monétaire
new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' }).format(15000)
(1234567.89).toLocaleString('fr-FR')  // "1 234 567,89"
```

---

## Arrays

```javascript
const arr = [1, 2, 3, 4, 5]

// Accès
arr[0]            // 1
arr.at(-1)        // 5 (ES2022)
arr.length        // 5

// Mutation
arr.push(6)       // ajoute fin
arr.pop()         // retire fin
arr.unshift(0)    // ajoute début
arr.shift()       // retire début
arr.splice(2,1)   // retire 1 élément à l'index 2

// Non-mutant (retourne nouveau tableau)
arr.map(x => x * 2)
arr.filter(x => x > 2)
arr.find(x => x > 3)        // premier match
arr.findIndex(x => x > 3)   // index du premier match
arr.some(x => x > 4)        // au moins un
arr.every(x => x > 0)       // tous
arr.includes(3)              // true
arr.indexOf(3)               // 2
arr.slice(1, 3)              // [2, 3]
arr.concat([6, 7])           // [1,2,3,4,5,6,7]
arr.join(' — ')              // "1 — 2 — 3 — 4 — 5"
arr.flat(2)                  // aplatit 2 niveaux
arr.flatMap(x => [x, x*2])  // map + flat(1)

// Réduction
arr.reduce((acc, x) => acc + x, 0)  // 15

// Tri
[...arr].sort((a, b) => a - b)      // numérique ascendant
[...arr].sort((a, b) => b - a)      // numérique descendant
['c','a','b'].sort()                 // alphabétique

// Déstructuration
const [first, second, ...rest] = arr
const copy = [...arr]               // copie shallow

// Array.from
Array.from({ length: 5 }, (_, i) => i + 1)  // [1,2,3,4,5]
Array.from(new Set([1,1,2,2,3]))              // [1,2,3]
```

---

## Objects

```javascript
const obj = { a: 1, b: 2, c: { d: 3 } }

// Accès
obj.a              // 1
obj['a']           // 1
obj?.c?.d          // 3
obj?.z?.y          // undefined

// Déstructuration
const { a, b, c: { d } } = obj
const { a: alpha, z = 0 } = obj  // renommage + défaut

// Spread
const clone = { ...obj }
const merged = { ...obj1, ...obj2 }  // obj2 écrase obj1
const { a: _, ...withoutA } = obj    // exclure une clef

// Méthodes
Object.keys(obj)                    // ['a', 'b', 'c']
Object.values(obj)                  // [1, 2, {d:3}]
Object.entries(obj)                 // [['a',1],['b',2],...]
Object.fromEntries([['a',1]])       // { a: 1 }
Object.assign({}, obj, { a: 99 })  // merge
Object.freeze(obj)                  // immuable
Object.hasOwn(obj, 'a')            // true (ES2022)
```

---

## Functions

```javascript
// Déclarations
function named(a, b) { return a + b }
const expr = function(a, b) { return a + b }
const arrow = (a, b) => a + b
const oneParam = x => x * 2
const noParam = () => 'hello'

// Paramètres
function fn(a, b = 10, ...rest) { }
const { x, y } = point        // destructuring params

// IIFE
const app = (() => {
  const private = 'secret'
  return { public: () => private }
})()

// Récursion
const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2)

// Higher-Order Functions
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x)

// Currying
const add = a => b => a + b
const add5 = add(5)
add5(3)  // 8
```

---

## Classes

```javascript
class Animal {
  static kingdom = 'Animalia'
  #secret = 'hidden'        // champ privé

  constructor(name, sound) {
    this.name = name
    this.sound = sound
  }

  speak() { return `${this.name} fait ${this.sound}` }
  get info() { return `${this.name} (${Animal.kingdom})` }
}

class Dog extends Animal {
  constructor(name) {
    super(name, 'Woof')
    this.tricks = []
  }
  learn(trick) { this.tricks.push(trick); return this }  // chainable
  speak() { return super.speak() + '!' }
}

const rex = new Dog('Rex')
rex.learn('assis').learn('couché')
rex instanceof Dog     // true
rex instanceof Animal  // true
```

---

## Async / Await

```javascript
// Promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('OK'), 1000)
})

p.then(v => console.log(v))
 .catch(e => console.error(e))
 .finally(() => console.log('done'))

// Async/Await
async function fetchData(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// Parallèle
const [a, b] = await Promise.all([fetchA(), fetchB()])

// Race / Any
const first  = await Promise.race([p1, p2])
const winner = await Promise.any([p1, p2])   // première résolue
const all    = await Promise.allSettled([p1, p2])  // toutes, même rejetées
```

---

## DOM Quick Reference

```javascript
// Sélection
document.getElementById('id')
document.querySelector('.class')         // premier
document.querySelectorAll('li.item')     // tous

// Modification
el.textContent = 'Texte sécurisé'
el.innerHTML   = '<b>HTML</b>'           // ⚠️ XSS risk
el.setAttribute('data-id', '42')
el.classList.add('active')
el.classList.toggle('hidden')
el.style.display = 'none'

// Création
const el = document.createElement('div')
parent.appendChild(el)
parent.insertAdjacentHTML('beforeend', '<div>...</div>')

// Events
el.addEventListener('click', handler)
el.removeEventListener('click', handler)

// Forms
new FormData(formElement)
Object.fromEntries(new FormData(form))  // { fieldName: value }
```

---

## ES6+ Quick Wins

```javascript
// Template literals
`Bonjour ${name}`

// Destructuring
const { a, b } = obj
const [x, y] = arr

// Spread / Rest
const copy = [...arr]
const merged = { ...a, ...b }
function fn(...args) {}

// Short methods
const obj = { method() { }, get prop() { } }

// Computed keys
const key = 'name'
const obj = { [key]: 'Ferid' }  // { name: 'Ferid' }

// Optional chaining
obj?.deep?.nested?.value

// Nullish coalescing
const val = input ?? 'default'

// Logical assignment
a ||= 'default'  // a = a || 'default'
a &&= transform(a)  // a = a && transform(a)
a ??= 'default'  // a = a ?? 'default'

// Array/Object grouping (ES2024)
Object.groupBy(invoices, inv => inv.status)
```

---

## Patterns Courants

```javascript
// Module pattern
export const api = { get, post, put, del }

// Singleton
const db = (function() {
  let instance = null
  return {
    getInstance: () => instance ??= new Database()
  }
})()

// Observer
class EventEmitter {
  #handlers = new Map()
  on(event, fn)  { this.#handlers.set(event, [...(this.#handlers.get(event)??[]), fn]) }
  emit(event, data) { (this.#handlers.get(event)??[]).forEach(fn => fn(data)) }
}

// Factory
const createUser = ({ name, role = 'user' }) => ({ id: crypto.randomUUID(), name, role })
```
