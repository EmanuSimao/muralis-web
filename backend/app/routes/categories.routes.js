import express from 'express'
import * as controller from '../controllers/categories.controller.js'
import upload from '../config/upload.config.js'

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/', upload.single('imagem_capa'), controller.create)
router.put('/:id/imagem', upload.single('imagem_capa'), controller.uploadImagem)

export default router