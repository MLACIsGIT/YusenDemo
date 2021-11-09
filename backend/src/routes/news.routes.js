import express from 'express';
const cors = require('cors');
import { heartbeat } from '../controllers';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyTokenSA } from '../middlewares/verifyTokenSA';
import { newsController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/getlist', newsController.getList);

router.use(verifyToken);

router.put('/put', newsController.put);

router.use(verifyTokenSA);

router.get('/heartbeat', heartbeat);
router.delete('/delete', newsController.delete);
router.get('/get', newsController.get);
router.get('/getall', newsController.getAll);

export default router;
