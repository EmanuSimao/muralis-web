import jwt from "jsonwebtoken";
import pool from "../config/db.config.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Não autorizado, sem token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pool.query(
      "SELECT id, nome, email FROM users WHERE id = $1",
      [decoded.id],
    );

    if (user.rows.length === 0)
      return res.status(401).json({ message: "Não autorizado, utilizador não encontrado" });

    req.user = user.rows[0];
    next();

  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Token falhou, sem autorização" });
  }
};
