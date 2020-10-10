const express = require('express');
const router = express.Router();
const controller = require('./../controllers/users.controller')

router
    .get('/register', controller.register)
    .post('/register', controller.postRegister);

router
    .get('/login', controller.login)
    .post('/login', controller.postLogin);

module.exports = router;