import express from 'express';
import { handleLogout } from '../../controllers/logout.controller';

const router = express.Router();

router.get('/', handleLogout);

export default router;