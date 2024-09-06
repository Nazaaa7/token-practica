
import { connectDB } from '../db/database.js';

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = connectDB.user.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};
