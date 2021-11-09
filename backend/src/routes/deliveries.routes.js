import express from 'express';
const cors = require('cors');
import { heartbeat } from '../controllers';
import { verifyToken } from '../middlewares/verifyToken';
import { deliveriesController } from '../controllers/deliveriesController';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/heartbeat', heartbeat);
router.get('/get', deliveriesController.get);

export default router;
