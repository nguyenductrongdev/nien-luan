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

router
    .get('/add-bill', controller.addBill);

router
    .get('/add-discount', controller.addDiscount);

router
    .get('/view-discount', controller.viewDiscount);

router
    .get('/view-discounts', controller.viewDiscounts);



module.exports = router;