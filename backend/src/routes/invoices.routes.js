import express from 'express';
const cors = require('cors');
import { verifyToken } from '../middlewares/verifyToken';
import { invoiceController } from '../controllers/invoiceController';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/get', invoiceController.get);

export default router;
