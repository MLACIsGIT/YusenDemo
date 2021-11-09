import express from 'express';
const cors = require('cors');
import multer from 'multer';
import { heartbeat } from '../controllers';
import { verifyToken } from '../middlewares/verifyToken';
import { fileStreamController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyToken);

router.get('/heartbeat', heartbeat);
router.post('/download', fileStreamController.downloadFile);
router.get('/getlistoffiles', fileStreamController.getListOfFiles);

const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({ storage: memoryStorage });

router.use(uploadMemory.single("file-to-upload"));

router.post('/upload', fileStreamController.uploadFile);

export default router;
