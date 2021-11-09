import express from 'express';
const cors = require('cors');
import { heartbeat } from '../controllers';
import { verifyToken } from '../middlewares/verifyToken';
import { userController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/heartbeat', heartbeat);
router.post('/register', userController.register);
router.delete('/dismissRegistration', userController.dismissRegistration);
router.get('/get', userController.get);
router.put('/put', userController.put)
router.put('/putandlogin', userController.putAndLogin)
router.get('/extendtoken', userController.extendToken);
export default router;
