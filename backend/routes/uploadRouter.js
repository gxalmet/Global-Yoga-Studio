import express from 'express';
import uploadController from '../controllers/uploadController.js'
import { getToken, isAuth } from '../utils.js';

var router = express.Router();

router.post('/upload', uploadController.create);
router.get('/getfile:id', uploadController.getFile);

export default router;