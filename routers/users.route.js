const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./../controllers/users.controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router
    .get('/register', controller.register)
    .post('/register', controller.postRegister);

router
    .get('/login', controller.login)
    .post('/login', controller.postLogin);

module.exports = router;