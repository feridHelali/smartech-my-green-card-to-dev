require('@babel/register')

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const ARTICLES_BASE = path.join(__dirname, '../../Junior_Software_Engineer_Session_Support_2026')

const articles = [
  // ── Cheat Sheets ──────────────────────────────────────────────────────────
  {
    slug: 'cheat-sheet-http',
    title: 'HTTP Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'HTTP methods, status codes, headers, REST conventions and HTTPS essentials.',
    tags: JSON.stringify(['http', 'rest', 'networking', 'status-codes']),
    order: 1,
    file: 'cheat-sheets/01_http.md'
  },
  {
    slug: 'cheat-sheet-git',
    title: 'Git Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'Daily git workflow, branching, remote sync, undo operations, and Git Flow.',
    tags: JSON.stringify(['git', 'vcs', 'collaboration', 'branching']),
    order: 2,
    file: 'cheat-sheets/02_git.md'
  },
  {
    slug: 'cheat-sheet-linux',
    title: 'Linux CLI Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'Essential Linux commands: navigation, file operations, search, processes, networking, SSH.',
    tags: JSON.stringify(['linux', 'cli', 'bash', 'devops', 'terminal']),
    order: 3,
    file: 'cheat-sheets/03_linux_cli.md'
  },
  {
    slug: 'cheat-sheet-mern',
    title: 'MERN Stack Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'MongoDB, Express, React, Node.js — full-stack JavaScript quick reference.',
    tags: JSON.stringify(['mern', 'mongodb', 'express', 'react', 'nodejs', 'fullstack']),
    order: 4,
    file: 'cheat-sheets/04_mern_stack.md'
  },
  {
    slug: 'cheat-sheet-docker',
    title: 'Docker Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'Images, containers, Dockerfile, Docker Compose and volume management.',
    tags: JSON.stringify(['docker', 'devops', 'containers', 'deployment']),
    order: 5,
    file: 'cheat-sheets/05_docker.md'
  },
  {
    slug: 'cheat-sheet-rest-api',
    title: 'REST API Design Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'REST constraints, resource naming, CRUD mapping, pagination, versioning and OpenAPI.',
    tags: JSON.stringify(['rest', 'api', 'design', 'http', 'openapi']),
    order: 6,
    file: 'cheat-sheets/06_rest_api_design.md'
  },
  {
    slug: 'cheat-sheet-python-fastapi',
    title: 'Python / FastAPI / PostgreSQL Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'FastAPI app skeleton, SQLAlchemy ORM, Alembic migrations, JWT auth and PostgreSQL essentials.',
    tags: JSON.stringify(['python', 'fastapi', 'postgresql', 'sqlalchemy', 'backend']),
    order: 7,
    file: 'cheat-sheets/07_python_fastapi.md'
  },

  // ── Mind Maps ────────────────────────────────────────────────────────────
  {
    slug: 'mindmap-how-the-web-works',
    title: 'How the Web Works — Mind Map',
    category: 'mind-maps',
    type: 'mind-map',
    description: 'Full web architecture: DNS, TCP/IP, HTTP, client-server model, roles of Network/OS/App engineers.',
    tags: JSON.stringify(['web', 'networking', 'dns', 'tcp', 'http', 'mermaid']),
    order: 1,
    file: 'mind-maps/01_how_the_web_works.md'
  },
  {
    slug: 'mindmap-mern-architecture',
    title: 'MERN Architecture — Mind Map',
    category: 'mind-maps',
    type: 'mind-map',
    description: 'MERN stack layers, auth flow, React component tree, TanStack Query data flow.',
    tags: JSON.stringify(['mern', 'react', 'mongodb', 'express', 'architecture', 'mermaid']),
    order: 2,
    file: 'mind-maps/02_mern_architecture.md'
  },
  {
    slug: 'mindmap-git-workflow',
    title: 'Git Workflow — Mind Map',
    category: 'mind-maps',
    type: 'mind-map',
    description: 'Git object model, branching strategy, PR/code review flow, conflict resolution.',
    tags: JSON.stringify(['git', 'workflow', 'branching', 'pr', 'mermaid']),
    order: 3,
    file: 'mind-maps/03_git_workflow.md'
  },

  // ── Feynman Explanations ─────────────────────────────────────────────────
  {
    slug: 'feynman-http',
    title: 'How HTTP Works — Feynman Explanation',
    category: 'feynman',
    type: 'feynman',
    description: 'Plain-language explanation of HTTP, DNS, and HTTPS using the postal service analogy.',
    tags: JSON.stringify(['http', 'dns', 'https', 'feynman', 'beginner']),
    order: 1,
    file: 'feynman/01_how_http_works.md'
  },
  {
    slug: 'feynman-git',
    title: 'Git Explained — Feynman Explanation',
    category: 'feynman',
    type: 'feynman',
    description: 'Git concepts in plain English using time machine and parallel universe analogies.',
    tags: JSON.stringify(['git', 'version-control', 'feynman', 'beginner']),
    order: 2,
    file: 'feynman/02_git_explained.md'
  },

  // ── JavaScript Core ───────────────────────────────────────────────────────
  {
    slug: 'js-definition-versions-context',
    title: 'JavaScript : Définition, Versions & Contexte',
    category: 'js-core',
    type: 'lesson',
    description: 'Histoire de JS, versions ECMAScript, contextes client/serveur, moteurs JS. Challenges IT : facturation, paie, comptabilité.',
    tags: JSON.stringify(['javascript', 'ecmascript', 'history', 'nodejs', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 1,
    file: 'js-core/01_definition_versions_context.md'
  },
  {
    slug: 'js-variables-types',
    title: 'JavaScript : Variables & Types Primitifs',
    category: 'js-core',
    type: 'lesson',
    description: 'const/let/var, portée, hoisting, 7 types primitifs, opérateurs, conversion de types. Challenges IT : validation de facture, types de contrat, ratio de liquidité.',
    tags: JSON.stringify(['javascript', 'variables', 'types', 'primitives', 'operators', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 2,
    file: 'js-core/02_variables_types.md'
  },
  {
    slug: 'js-data-structures-control-flow',
    title: 'JavaScript : Structures de Données & Contrôle',
    category: 'js-core',
    type: 'lesson',
    description: 'Arrays, objets, Map, Set, boucles, conditionnelles, déstructuration. Challenges IT : filtrage de factures, classement de salaires, grand livre.',
    tags: JSON.stringify(['javascript', 'arrays', 'objects', 'map', 'set', 'loops', 'destructuring', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 3,
    file: 'js-core/03_data_structures_control_flow.md'
  },
  {
    slug: 'js-functions',
    title: 'JavaScript : Fonctions (I, II & III)',
    category: 'js-core',
    type: 'lesson',
    description: 'Déclarations, expressions, arrow functions, closures, scope, hoisting, HOF, currying, composition, memoization. Challenges IT : numéros de facture, grille de paie, amortissement.',
    tags: JSON.stringify(['javascript', 'functions', 'closures', 'scope', 'hof', 'currying', 'composition', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 4,
    file: 'js-core/04_functions.md'
  },
  {
    slug: 'js-oop',
    title: 'JavaScript : Programmation Orientée Objet',
    category: 'js-core',
    type: 'lesson',
    description: 'Paradigmes, classes ES6, héritage, encapsulation, polymorphisme, prototype chain, mixins. Challenges IT : modèle facture OOP, hiérarchie employés, compte comptable.',
    tags: JSON.stringify(['javascript', 'oop', 'classes', 'inheritance', 'prototype', 'encapsulation', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 5,
    file: 'js-core/05_oop.md'
  },
  {
    slug: 'js-async-promises',
    title: 'JavaScript : Async & Promises',
    category: 'js-core',
    type: 'lesson',
    description: 'Event loop, callbacks, Promises, async/await, Fetch API, gestion d\'erreurs, retry. Challenges IT : dashboard factures, paie parallèle, sync comptable.',
    tags: JSON.stringify(['javascript', 'async', 'promises', 'await', 'fetch', 'event-loop', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 6,
    file: 'js-core/06_async_promises.md'
  },
  {
    slug: 'js-dom-bom',
    title: 'JavaScript : DOM & BOM',
    category: 'js-core',
    type: 'lesson',
    description: 'Sélecteurs, manipulation du DOM, événements, event delegation, forms, localStorage, sessionStorage, window/location. Challenges IT : UI factures CRUD, calcul paie temps réel, brouillon comptable.',
    tags: JSON.stringify(['javascript', 'dom', 'bom', 'events', 'forms', 'localstorage', 'it-invoicing', 'it-payroll', 'it-accounting']),
    order: 7,
    file: 'js-core/07_dom_bom.md'
  },

  // ── JS Cheat Sheet ────────────────────────────────────────────────────────
  {
    slug: 'cheat-sheet-javascript-core',
    title: 'JavaScript Core Cheat Sheet',
    category: 'cheat-sheets',
    type: 'cheat-sheet',
    description: 'Référence complète ES6+ : variables, types, arrays, objects, functions, classes, async/await, DOM. Patterns courants pour IT.',
    tags: JSON.stringify(['javascript', 'es6', 'cheat-sheet', 'reference', 'arrays', 'objects', 'async']),
    order: 8,
    file: 'cheat-sheets/08_javascript_core.md'
  },

  // ── JS Mind Map ───────────────────────────────────────────────────────────
  {
    slug: 'mindmap-javascript-core',
    title: 'JavaScript Core — Mind Map',
    category: 'mind-maps',
    type: 'mind-map',
    description: 'Vue d\'ensemble de JavaScript : fondamentaux, structures de données, fonctions, POO, async, DOM. Diagrammes Mermaid.',
    tags: JSON.stringify(['javascript', 'mind-map', 'mermaid', 'architecture', 'event-loop', 'prototype']),
    order: 4,
    file: 'mind-maps/04_javascript_core.md'
  }
]

const demoUsers = [
  {
    email: 'admin@alfacomputers.dz',
    password: 'Admin@2026!',
    name: 'Ferid HELALI',
    role: 'admin',
    picture: 'https://api.dicebear.com/7.x/initials/svg?seed=FH'
  },
  {
    email: 'trainer@alfacomputers.dz',
    password: 'Trainer@2026!',
    name: 'Karim BENALI',
    role: 'user',
    picture: 'https://api.dicebear.com/7.x/initials/svg?seed=KB'
  },
  {
    email: 'student@alfacomputers.dz',
    password: 'Student@2026!',
    name: 'Amira KHELIL',
    role: 'user',
    picture: 'https://api.dicebear.com/7.x/initials/svg?seed=AK'
  }
]

async function seedUsers () {
  console.log('\nSeeding users...')
  for (const user of demoUsers) {
    const hashed = await bcrypt.hash(user.password, 10)
    await prisma.user.upsert({
      where: { email: user.email },
      create: { ...user, password: hashed },
      update: { name: user.name, role: user.role, picture: user.picture }
    })
    console.log(`  ✓ ${user.name} (${user.role})`)
  }
  console.log(`Seeded ${demoUsers.length} users.`)
}

async function main () {
  console.log('=== Database Seed ===')

  // ── Users ────────────────────────────────────────────────────────────────
  await seedUsers()

  // ── Articles ─────────────────────────────────────────────────────────────
  console.log('\nSeeding articles...')

  for (const article of articles) {
    const { file, ...meta } = article
    const filePath = path.join(ARTICLES_BASE, file)
    let content = ''

    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8')
    } else {
      console.warn(`  ⚠  File not found: ${filePath}`)
      content = `# ${meta.title}\n\n_Content coming soon._`
    }

    await prisma.article.upsert({
      where: { slug: meta.slug },
      create: { ...meta, content },
      update: { ...meta, content }
    })

    console.log(`  ✓ ${meta.title}`)
  }

  console.log(`\n✅ Seeded ${demoUsers.length} users + ${articles.length} articles.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
