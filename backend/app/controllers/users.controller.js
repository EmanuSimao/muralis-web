import pool from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { generateToken, cookieOptions } from "../utils/auth.utils.js";

const BASE_SELECT = `
    SELECT u.id, u.nome, u.email, u.isartist, u.data_nascimento, u.created_at, a.id AS artist_id,
        a.verificado AS artist_verificado, l.cidade, l.cod_postal, l.pais
    FROM users u
    LEFT JOIN artists a 
    ON a.user_id = u.id
    LEFT JOIN localidades l ON l.id = u.localidade_id
`;

// GET /api/users
export const findAll = async (req, res) => {
  try {
    const { isArtist, q } = req.query;
    const conditions = [];
    const values = [];

    if (isArtist) {
      values.push(isArtist);
      conditions.push(`u.isartist = $${values.length}`);
    }
    if (q) {
      values.push(`%${q}%`);
      const i = values.length;
      conditions.push(`(u.nome ILIKE $${i} OR u.email LIKE $${i})`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await pool.query(
      `${BASE_SELECT} ${where} ORDER BY u.nome`,
      values,
    );
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/users/:id
export const findOne = async (req, res) => {
  try {
    const result = await pool.query(`${BASE_SELECT} WHERE u.id = $1`, [
      req.params.id,
    ]);

    if (result.rows.length == 0)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// // GET /api/users/email/:email
// export const findByEmail = async (req, res) => {
//   try {
//     const result = await pool.query(`${BASE_SELECT} WHERE u.email = $1`, [
//       req.params.email,
//     ]);
//     if (result.rows.length == 0)
//       return res.status(404).json({ error: "Not Found" });
//     res.json(result.rows[0]);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

// POST /api/users/register
export const create = async (req, res) => {
  // console.log("Body recebido:", req.body);
  try {
    const { nome, email, password, isArtist } = req.body;

    if (
      !nome ||
      !email ||
      !password ||
      isArtist === undefined ||
      isArtist === null
    ) {
      return res
        .status(400)
        .json({ error: "nome, email, password and user_type are required" });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (userExists.rows.length > 0)
      return res.status(409).json({ message: "Email já registado " });

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (nome, email, password_hash, isArtist)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, isArtist, created_at`,
      [nome, email, password_hash, Boolean(isArtist)],
    );

    const user = newUser.rows[0];

    const token = generateToken(user.id);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "Utilizador registado com sucesso",
      user,
    });
  } catch (e) {
    console.error("Erro ao registar utilizador: ", e);
    return res.status(500).json({
      e: "Erro interno do servidor",
    });
  }
};

// PUT /api/user/edit
export const update = async (req, res) => {
  try {
    const userId = req.user.id; // id vem da sessao nao url
    const { nome, data_nascimento, idioma, cidade, cod_postal, pais } = req.body;

    if (nome === undefined && data_nascimento === undefined && idioma === undefined && cidade === undefined && cod_postal === undefined &&  pais === undefined) {
      return res.status(400).json({ error: "Nenhum campo para atualizar foi enviado" });
    }

    let dataNascimento = null;
    if (data_nascimento) {
      dataNascimento = new Date(data_nascimento);
      const today = new Date();
      const idade = today.getFullYear() - dataNascimento.getFullYear();

      if (dataNascimento >= today)
        return res.status(400).json({ error: "Data_Nascimento não pode ser no futuro" })
      if (idade < 18)
        return res.status(400).json({ error: "> 18 anos" });
    }

    const result = await pool.query(
      `SELECT * FROM atualizar_perfil_user($1, $2, $3, $4, $5, $6, $7)`,
      [userId, nome ?? null, dataNascimento, idioma ?? null, cidade ?? null, cod_postal ?? null, pais ?? null]
    );

    if (result.rows.length === 0)
      return res.json({ message: "Perfil atualizado com sucesso " });

    return res.json({ message: "Perfil atualizado com sucesso", user: result.rows[0] });
  } catch (e) {
    const erros = {
      USER_NOT_FOUND: [404, "Utilizador não encontrado"],
      DATE_IN_FUTURE: [400, "Data de nascimento não pode ser no futuro"],
      BELOW_MIN_AGE: [400, "Idade mínima é 18 anos"],
    };

    const match = erros[e.message];
    if (match)
      return res.status(match[0]).json({ error: match[1] });

    console.error("Erro ao actualizar utilizador:", e);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// TODO: delete()
// DELETE /api/users/:id
// export const remove = async (req, res) => {
//     try {
//         const userId = Number(req.params.id);

//         // guardar o localidade_id antes de apagar
//         // para limpar a localidade se ficar órfã
//         const { rows: userRows } = await pool.query(
//             "SELECT localidade_id FROM users WHERE id = $1",
//             [userId]
//         );

//         if (userRows.length === 0)
//             return res.status(404).json({ error: "Utilizador não encontrado" });

//         const localidadeId = userRows[0].localidade_id;

//         // apagar o user
//         await pool.query("DELETE FROM users WHERE id = $1", [userId]);

//         // limpar localidade órfã (sem outros users associados)
//         if (localidadeId) {
//             await pool.query(
//                 `DELETE FROM localidades
//                  WHERE id = $1
//                  AND NOT EXISTS (
//                      SELECT 1 FROM users WHERE localidade_id = $1
//                  )`,
//                 [localidadeId]
//             );
//         }

//         return res.status(200).json({ message: "Utilizador eliminado com sucesso" });
//     } catch (e) {
//         console.error("Erro ao eliminar utilizador:", e);
//         return res.status(500).json({ error: "Erro interno do servidor" });
//     }
// };