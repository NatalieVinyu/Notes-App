// AUTHROUTES.JS
import express from 'express';
import { signup, login, logout, me } from '../controllers/authControl.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', authenticate, me);

export default router;