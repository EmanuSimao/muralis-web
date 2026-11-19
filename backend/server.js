import path from "path"
import dotenv from "dotenv"
import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'
import artistsRoutes from './app/routes/artists.routes.js'
import usersRoutes from './app/routes/users.routes.js'
import categoriesRoutes from './app/routes/categories.routes.js'
import authRoutes from './app/routes/auth.routes.js'
import { fileURLToPath } from "url"
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/auth', authRoutes)
app.use('/api/artists', artistsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/uploads', express.static(path.join(_dirname, 'uploads')));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));