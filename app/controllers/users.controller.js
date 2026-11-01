const pool = require('../config/db.config')
const bcrypt = require('bcryptjs')

const BASE_SELECT = `
    SELECT u.id, u.nome, u.email, u.isArtist, u.created_at, a.id AS artist_id,
        a.verificado AS artist_verificado
    FROM users u
    LEFT JOIN artists a 
    ON a.user_id = u.id    
`;

// GET /api/users
exports.findAll = async (req, res) => {
    try {
        const { isArtist, q } = req.query;
        const conditions = [];
        const values = [];

        if (isArtist) {
            values.push(isArtist);
            conditions.push(`u.isArtist = $${values.length}`);
        }
        if (q) {
            values.push(`%${q}%`);
            const i = values.length;
            conditions.push(`(u.nome ILIKE $${i} OR u.email LIKE $${i})`);
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const result = await pool.query(`${BASE_SELECT} ${where} ORDER BY u.nome`,
            values);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// GET /api/users/:id
exports.findOne = async (req, res) => {
    try {
        const result = await pool.query(`${BASE_SELECT} WHERE u.id = $1`, [req.params.id]);

        if (result.rows.length == 0)
            return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0])
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// POST /api/users/register
exports.create = async (req, res) => {
    // console.log("Body recebido:", req.body);
    const{nome, email, password, isArtist} = req.body;
    
    if (!nome || !email || !password || isArtist === undefined || isArtist === null) {
        return res.status(400).json({ error: 'nome, email, password and user_type are required' });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        // verifica se email já existe
        const emailExists = await client.query(
            `SELECT id FROM users WHERE email = $1`, [email]);

        if (emailExists.rows.length > 0){
            await client.query("ROLLBACK");
            return res.status(409).json({error: 'Email já registado'})
        }
        // return res.json({ exists: result.rows.length > 0});
        const password_hash = await bcrypt.hash(password, 10);

        const result = await client.query(`INSERT INTO users (nome, email, password_hash, isArtist)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, isArtist, created_at`,
            [nome, email, password_hash, Boolean(isArtist)]
        );

        await client.query("COMMIT");
        res.status(201).json({ user: result.rows[0]});
    } catch (e) {
        // if (e.code === '23505') {
        //     return res.status(409).json({ error: 'Email already in use' });
        // }
        // res.status(500).json({ error: e.message });
        await client.query("ROLLBACK");
        res.status(500).json({ error: "Erro no servidor"});
    } finally {
        client.release();
    }
}