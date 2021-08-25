import express from 'express';
const cors = require('cors');
import { verifyTokenSA } from '../middlewares/verifyTokenSA';
import { newsController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/getall', newsController.getAll);

router.use(verifyTokenSA);

router.get('/get', newsController.get);
router.put('/put', newsController.put);
router.delete('/delete', newsController.delete);

export default router;
