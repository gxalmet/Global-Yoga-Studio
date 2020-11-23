'use strict'

import express from 'express';
import teacherController from '../controllers/teacherController.js';
import { isAuth } from '../utils.js';
var router = express.Router();

router.use('/seed', teacherController.insertManyTeacher);
router.post('/createteacher:id', isAuth, teacherController.createTeacher);
router.get('/readteacher:id', teacherController.readTeacher);
router.get('/readbyuserteacher:id', isAuth, teacherController.readTeacherByUser);
router.get('/readallteacher', teacherController.readAllTeacher);
router.put('/updateteacher:id', isAuth, teacherController.updateTeacher);
router.delete('/deleteteacher', isAuth, teacherController.deleteteacher);

export default router;