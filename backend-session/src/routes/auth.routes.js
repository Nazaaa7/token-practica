// routes/auth.routes.js
import { Router } from 'express';
import { loginUser, validateSession, logoutUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginUser);
router.get('/session', validarJwt, validateSession);
router.post('/logout', logoutUser);

export default router;
