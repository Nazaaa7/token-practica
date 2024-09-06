// routes/auth.routes.js
import express from 'express';
import { loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginUser);

export default router;
