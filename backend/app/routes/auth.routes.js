import express from 'express'
import * as controller from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// registar user
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/me', protect, controller.me)
router.post('/logout', controller.logout)

export default router;