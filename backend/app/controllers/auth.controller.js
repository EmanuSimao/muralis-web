import { generateToken, cookieOptions } from "../utils/auth.utils.js";
import pool from "../config/db.config.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  // console.log("Body recebido:", req.body);
  try {
    // console.log(req.body);
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
      return res.status(409).json({ message: "Utilizador/a já existe " });

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
      // message: "Utilizador registado com sucesso",
      token,
      user: { id: user.id, nome, isArtist }
    });
  } catch (e) {
    console.error("Erro ao registar utilizador: ", e);
    return res.status(500).json({
      e: "Erro interno do servidor",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  console.log("TESTEE TEST TESTE TESTE")
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Insira dados em todos os campos" });
    }

    // const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    //   email,
    // ]);

    const user = await pool.query(
      `SELECT u.id, u.nome, u.email, u.password_hash, u.data_nascimento, u.idioma,
              l.cidade, l.cod_postal, l.pais
       FROM users u
       LEFT JOIN localidades l ON l.id = u.localidade_id
       WHERE u.email = $1`,
      [email]
    );
    
    if (user.rows.length === 0)
      res.status(400).json({ error: "Credenciais inválidas" });

    const userData = user.rows[0];
    const isMatch = await bcrypt.compare(password, userData.password_hash);

    if (!isMatch)
      return res.status(400).json({ message: "Credenciais inválidas" });

    const token = generateToken(userData.id);
    res.cookie("token", token, cookieOptions);
    res.json({
      user: {
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        data_nascimento: userData.data_nascimento,
        idioma: userData.idioma,
        cidade: userData.cidade,
        cod_postal: userData.cod_postal,
        pais: userData.pais
      },
    });
  } catch (e) {
    console.error("Erro ao tentar iniciar sessão: ", e);
    return res.status(500).json({
      e: "Erro interno do servidor",
    });
  }

};

// me
export const me = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" });
  }
  try {
    const result = await pool.query(
      `SELECT u.id, u.nome, u.email, u.data_nascimento, u.idioma,
              l.cidade, l.cod_postal, l.pais
       FROM users u
       LEFT JOIN localidades l ON l.id = u.localidade_id
       WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Utilizador não encontrado" });

    return res.json(result.rows[0]);
  } catch (e) {
    console.error("Erro ao obter utilizador:", e);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// TODO: logout()
export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Terminada Sessão com sucesso" });
};
