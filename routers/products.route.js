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
    .post('/add-product', upload.single('fHinhAnh'), controller.postAddProduct);

router
    .get('/view-products', controller.viewProduct);

router
    .get('/add-unit', controller.addUnit)
    .post('/add-unit', controller.postAddUnit);

module.exports = router;