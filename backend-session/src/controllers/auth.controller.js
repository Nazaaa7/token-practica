import { Router } from 'express';
import { connectDB } from '../db/database.js';

const router = Router();

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario
    const user = connectDB.user.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user.id, username: user.username } 
        });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

// Ruta para obtener los datos de la sesión
router.get('/session', (req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } 
        });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
});

// Ruta para cerrar la sesión
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid');
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
});

export default router;
