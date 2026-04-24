import prisma from '../../services/db'

const Article = {
  async findAll ({ category, type, search } = {}) {
    const where = {}
    if (category) where.category = category
    if (type) where.type = type
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } }
      ]
    }
    return prisma.article.findMany({ where, orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  },

  async findById (id) {
    return prisma.article.findUnique({ where: { id } })
  },

  async findBySlug (slug) {
    return prisma.article.findUnique({ where: { slug } })
  },

  async categories () {
    const rows = await prisma.article.groupBy({ by: ['category'], _count: { id: true } })
    return rows.map(r => ({ category: r.category, count: r._count.id }))
  },

  async upsert (data) {
    const { slug, ...rest } = data
    return prisma.article.upsert({
      where: { slug },
      create: { slug, ...rest },
      update: rest
    })
  }
}

export default Article
