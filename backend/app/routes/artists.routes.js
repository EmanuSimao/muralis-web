import express from 'express'
const router = express.Router()
import * as controller from '../controllers/artists.controller.js'


router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
// create() -> altera user base para artista
router.post('/', controller.create)
// registerAsArtist() -> cria logo artista e utilizador
router.post('/register/', controller.registerAsArtist)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router