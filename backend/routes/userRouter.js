import express from 'express';
import userController from '../controllers/userController.js'
import { getToken, isAuth } from '../utils.js';

var router = express.Router();

router.use('/seed', userController.insertManyUser);
router.post('/signin', userController.signIn);
router.post('/register', userController.createUser);
//router.post('/createuser', userController.createUser);
router.get('/readuser:id', userController.readUser);
router.put('/updateuser:id', isAuth, userController.updateUser);
router.delete('/deleteuser:id', userController.deleteuser);

export default router;