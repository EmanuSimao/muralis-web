import express from 'express'
const router = express.Router()
import * as controller from '../controllers/users.controller.js'
import { protect } from '../middleware/auth.js'

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/', controller.create)
router.put('/edit', protect, controller.update)

export default router