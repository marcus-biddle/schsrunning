import express from 'express';
import { handleLogout } from '../../controllers/auth/logout.controller.js';

const router = express.Router();

router.get('/', handleLogout);

export default router;