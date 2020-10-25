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

router
    .get('/filter-ROM', controller.filterROM);

router
    .get('/filter-RAM', controller.filterRAM);

module.exports = router;