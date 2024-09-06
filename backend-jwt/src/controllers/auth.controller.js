import { database } from '../db/database.js'; // Suponiendo que database.js tiene una colección de usuarios en memoria
import generarJwt from '../helpers/generar-jwt.js';

// Manejar el registro de un nuevo usuario
export const registerUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    const existingUser = database.user.find(u => u.username === username);

    if (existingUser) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const newUser = { id: database.user.length + 1, username, password };
    database.user.push(newUser);

    return res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: { id: newUser.id, username: newUser.username }
    });
};
