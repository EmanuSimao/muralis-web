// require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
import { Pool } from 'pg'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Procurar o .env na raiz do projeto
dotenv.config({
    path: path.resolve(_dirname, '../../.env')
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // max: 10,               // nº máximo de ligações no pool
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 5000,
});

pool.on ("connect", () => {
  console.error("Connected to the database")
})

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do PostgreSQL', err);
});

// Testa a ligação assim que o módulo é carregado
// pool.query('SELECT NOW()')
//   .then(() => console.log('PostgreSQL connected'))
//   .catch((err) => console.error('Erro ao ligar ao PostgreSQL:', err.message));

export default pool;