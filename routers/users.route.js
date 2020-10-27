const mysql = require('mysql');
const express = require('express');
const app = express();
const router = express.Router();

const controller = require('./../controllers/users.controller');

router
    .get('/register', controller.register)
    .post('/register', controller.postRegister);

router
    .get('/login', controller.login)
    .post('/login', controller.postLogin);

router
    .get('/logout', controller.logout);

router
    .get('/', controller.index);

module.exports = router;