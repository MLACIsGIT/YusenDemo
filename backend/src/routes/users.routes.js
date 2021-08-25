import express from 'express';
const cors = require('cors');
import { verifyToken } from '../middlewares/verifyToken';
import { userController } from '../controllers/userController';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.post('/register', userController.register);
router.delete('/dismissRegistration', userController.dismissRegistration);
router.get('/get', userController.get);
router.put('/put', userController.put)
router.put('/putandlogin', userController.putAndLogin)
router.get('/extendtokenvalidity', userController.extendTokenValidity);
export default router;
