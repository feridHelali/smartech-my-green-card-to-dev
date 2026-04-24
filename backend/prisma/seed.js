require('@babel/register')

const { PrismaClient } = require('@prisma/client')
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
  }
]

async function main () {
  console.log('Seeding articles...')

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

  console.log(`\nSeeded ${articles.length} articles.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
