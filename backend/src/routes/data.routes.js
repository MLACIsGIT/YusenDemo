import express from 'express';
const cors = require('cors');
import { heartbeat } from '../controllers';
import { verifyToken } from '../middlewares/verifyToken';
import { dataController } from '../controllers/dataController';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/heartbeat', heartbeat);
router.get('/get', dataController.get);
router.get('/getreportparams', dataController.getReportParams);

export default router;
