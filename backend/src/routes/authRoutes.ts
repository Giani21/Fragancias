import express from 'express';
import { logoutUser, registerUser } from '../controllers/authController';
import { loginUser } from '../controllers/authController';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para logout
router.post('/logout', logoutUser);

export default router;