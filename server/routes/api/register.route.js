import express from 'express'
import { handleRegister } from '../../controllers/auth/register.controller.js';

const router = express.Router();

router.post('/', handleRegister);

export default router;