const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded; // Información del usuario
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
