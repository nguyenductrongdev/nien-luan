const express = require('express');
const router = express.Router();

const controller = require('./../../api/controllers/products.controller');

router
    .get('/getNbProducts', controller.getNbProducts);

router
    .get('/page', controller.page);

router
    .post('/add-brand', controller.addBrand);

router
    .get('/filter-brand', controller.filterBrand);

module.exports = router;