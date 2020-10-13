const express = require('express');
const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: './public/uploads' });

const controller = require('./../controllers/products.controller');

router
    .get('/add-brand', controller.addBrand)
    .post('/add-brand', controller.postAddBrand);

router
    .get('/add-product', controller.addProduct)
    .post('/add-product', controller.postAddProduct)


module.exports = router;