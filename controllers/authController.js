const db = require('../database/conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

class AuthController {
    constructor() {}

    // Registro de usuario
    async register(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        try {
            // Verificar si el usuario ya existe
            db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });

                if (rows.length > 0) {
                    return res.status(400).json({ message: 'El usuario ya está registrado' });
                }

                // Encriptar la contraseña
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insertar el nuevo usuario en la base de datos
                db.query(
                    'INSERT INTO usuarios (email, password) VALUES (?, ?)',
                    [email, hashedPassword],
                    (err) => {
                        if (err) return res.status(500).json({ error: err.message });
                        res.status(201).json({ message: 'Usuario registrado exitosamente' });
                    }
                );
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Inicio de sesión
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        try {
            // Buscar el usuario en la base de datos
            db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });

                if (rows.length === 0) {
                    return res.status(400).json({ message: 'Credenciales inválidas' });
                }

                const user = rows[0];

                // Verificar la contraseña
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: 'Credenciales inválidas' });
                }

                // Generar un token JWT
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ token });
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new AuthController();
