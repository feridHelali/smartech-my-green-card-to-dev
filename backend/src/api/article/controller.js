import { success, notFound } from '../../services/response/'
import Article from './model'

export const index = async ({ query: { category, type, search } }, res, next) => {
  try {
    const articles = await Article.findAll({ category, type, search })
    res.json({ data: articles, count: articles.length })
  } catch (err) { next(err) }
}

export const categories = async (req, res, next) => {
  try {
    const cats = await Article.categories()
    res.json({ data: cats })
  } catch (err) { next(err) }
}

export const show = async ({ params }, res, next) => {
  try {
    const article = await Article.findBySlug(params.slug) || await Article.findById(params.slug)
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json({ data: article })
  } catch (err) { next(err) }
}
