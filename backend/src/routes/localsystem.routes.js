import express from 'express';
import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';
import { heartbeat } from '../controllers';
import { userController } from '../controllers';
import { invoiceController, deliveriesController, stocksController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(verifyLocalSystem);
router.use(express.json());

router.get('/heartbeat', heartbeat);
router.post('/register', userController.register);
router.post('/invoices/upload', invoiceController.upload)
router.post('/deliveries/upload', deliveriesController.upload);
router.post('/stocks/upload', stocksController.upload);

export default router;
