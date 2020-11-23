//var express = require('express');
import express from 'express';
import commentController from '../controllers/commentController.js'
//var userController = require('../controllers/userController');
import { isAuth } from '../utils.js';

var router = express.Router();

router.post('/create', isAuth, commentController.createComment);
router.get('/readall:id', isAuth, commentController.readComments);


export default router;