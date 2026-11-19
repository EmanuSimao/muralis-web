import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const uploadDir = path.resolve(
    _dirname,
    '../uploads/categorias'
)


if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        cb(null, uploadDir)
    ,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const nomeUnico = `${Date.now()}${ext}`
        cb(null, nomeUnico)
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }, //8 MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas imagens'))
        }
        cb(null, true)
    }
});

export default upload