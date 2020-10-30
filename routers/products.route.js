const express = require('express');
const router = express.Router();

const controller = require('./../controllers/products.controller');

router
    .get('/add-brand', controller.addBrand)
    .post('/add-brand', controller.postAddBrand);

router
    .get('/add-product', controller.addProduct)
    .post('/add-product', controller.postAddProduct);

router
    .get('/view-products', controller.viewProducts);

router
    .get('/add-unit', controller.addUnit)
    .post('/add-unit', controller.postAddUnit);

router
    .get('/view-product', controller.viewProduct)

router
    .get('/edit-product', controller.editProduct)
    .post('/edit-product', controller.postEditProduct);

module.exports = router;