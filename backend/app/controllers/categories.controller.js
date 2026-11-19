import pool from '../config/db.config.js'

// GET /api/categories
export const findAll = async (req, res) => {
    try {
        const query = await pool.query('select id, nome, descricao, imagem_capa from categories c order by c.nome');
        res.json(query.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// GET /api/categories/:id
export const findOne = async (req, res) => {
    try {
        const result = await pool.query(`select id, nome, descricao, imagem_capa from categories where id = $1`, [req.params.id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Not Found" });
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// POST /api/categories/
export const create = async (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'nome is required' })
    }

    // req.file -> só existe se um ficheiro for adicionado, se não é null
    const publicURL = req.file ? `/uploads/categorias/${req.file.filename}` : null

    try {
        const result = await pool.query(
            'insert into categories (nome, descricao, imagem_capa) values ($1, $2, $3) RETURNING *',
            [nome, descricao, publicURL]
        );
        res.json(result.rows[0])
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// PUT /api/categories/:id/imagem
export const uploadImagem = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum ficheiro enviado' })
    }

    const publicURL = `/uploads/categorias/${req.file.filename}`

    try {
        const result = await pool.query(
            'UPDATE categories SET imagem_capa = $1 WHERE id = $2 RETURNING *',
            [publicURL, req.params.id]
        );

        if (result.rowCount.length === 0)
            return res.status(404).json({ error: 'Categoria não encontrada.' });

        res.json(result.rows[0])
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}