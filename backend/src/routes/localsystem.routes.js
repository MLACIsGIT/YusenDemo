import express from 'express';
import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';
import { heartbeat } from '../controllers';
import { userController } from '../controllers';
import { deliveriesController, stocksController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(verifyLocalSystem);
router.use(express.json());

router.get('/heartbeat', heartbeat);
router.post('/register', userController.register);
router.post('/deliveries/upload', deliveriesController.upload);
router.post('/stocks/upload', stocksController.upload);
router.post('/invoices/upload', stocksController.upload);
router.get('/users/get', userController.getByLocalsystemId);

export default router;
