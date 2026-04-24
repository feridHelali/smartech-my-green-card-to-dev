import { Router } from 'express'
import { index, show, categories } from './controller'

const router = new Router()

router.get('/', index)
router.get('/categories', categories)
router.get('/:slug', show)

export default router
