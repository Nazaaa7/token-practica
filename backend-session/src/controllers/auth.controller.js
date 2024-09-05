import { database } from '../db/database.js';
// Inicio de sesión
export const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = database.user.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

// Obtener la sesión actual
export const getSession = (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, user: { id: req.session.userId, username: req.session.username } });
    } else {
        res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
};

// Cerrar sesión
export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: 'Error al cerrar la sesión' });
        } else {
            res.clearCookie('connect.sid');
            res.json({ message: 'Sesión cerrada exitosamente' });
        }
    });
};
