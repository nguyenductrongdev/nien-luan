const mysql = require('mysql');
const express = require('express');
const app = express();
const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: './public/uploads' });

const controller = require('./../controllers/users.controller');

router
    .get('/register', controller.register)
    .post('/register', upload.single('fAvatar'), controller.postRegister);

router
    .get('/login', controller.login)
    .post('/login', controller.postLogin);

router
    .get('/', controller.index);

module.exports = router;