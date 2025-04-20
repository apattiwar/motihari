import express from 'express';
import { login, logout, getUserProfile, getAllUsers, register } from '../controllers/authControllers.js';
import { authorizeRole } from '../utils/tokenMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post('/login', login);
router.post('/logout/:user_id', logout);
router.get('/user/profile', getUserProfile);
router.get('/admin/users', authorizeRole(['admin']), getAllUsers);

export default router;
