// src/routes/auth.js
const express = require('express');
const { registerUser, loginUser, getSession, logoutUser } = require('../controllers/auth.controller.js');
const authenticateToken = require('../middlewares/authenticateToken'); // middleware para proteger rutas
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener la sesión del usuario
router.get('/session', authenticateToken, getSession);

// Ruta para cerrar sesión
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;
