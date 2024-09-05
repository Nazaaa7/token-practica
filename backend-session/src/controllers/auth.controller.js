// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Conexión a la base de datos
const SECRET_KEY = process.env.SECRET_KEY;

// Registro de un nuevo usuario
const registerUser = (req, res) => {
  const { username, password } = req.body;
  
  // Validación básica
  if (!username || !password) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
  }
  
  // Hash de la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insertar el nuevo usuario en la base de datos
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
};

// Inicio de sesión
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario existe
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];

    // Comparar la contraseña con el hash almacenado
    if (bcrypt.compareSync(password, user.password)) {
      // Generar JWT
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '5h' });
      res.json({ token, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  });
};

// Ver sesión del usuario (si está autenticado)
const getSession = (req, res) => {
  res.json({ user: req.user, message: 'Sesión válida' });
};

// Cerrar sesión (en el frontend, se elimina el token)
const logoutUser = (req, res) => {
  res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { registerUser, loginUser, getSession, logoutUser };
