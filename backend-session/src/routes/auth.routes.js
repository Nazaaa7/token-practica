import { Router } from 'express';
import { loginUser, getSession, logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/login', loginUser);
router.get('/session', getSession);
router.post('/logout', logoutUser);

export default router;
