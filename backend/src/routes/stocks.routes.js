import express from 'express';
const cors = require('cors');
import { verifyToken } from '../middlewares/verifyToken';
import { stocksController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/get', stocksController.get);
export default router;
