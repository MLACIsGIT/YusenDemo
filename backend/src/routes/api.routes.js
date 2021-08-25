import express from 'express';
const cors = require('cors');
import { heartbeat } from '../controllers';
import { userController } from '../controllers/userController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/heartbeat', heartbeat);
router.post('/login', userController.login);

export default router;
