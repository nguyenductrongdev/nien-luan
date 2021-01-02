const express = require('express');
const router = express.Router();

const controller = require('./../controllers/products.controller');

function requiredLogin(req, res, next) {
    let { username } = req.cookies;
    if (!username) {
        res.redirect('/users/login');
    } else {
        res.locals.userInfo = {
            username: req.cookies.username,
            avatar: req.cookies.avatar
        }
        next();
    }
}

router
    .get('/add-brand', requiredLogin, controller.addBrand)

router
    .get('/add-product', requiredLogin, controller.addProduct)
    .post('/add-product', controller.postAddProduct);

router
    .get('/view-products', requiredLogin, controller.viewProducts);

router
    .get('/delete-product', requiredLogin, controller.deleteProduct);

router
    .get('/add-unit', requiredLogin, controller.addUnit)

router
    .get('/view-product', controller.viewProduct)

router
    .get('/edit-product', requiredLogin, controller.editProduct)
    .post('/edit-product', controller.postEditProduct);




router
    .get('/add-bill', requiredLogin, controller.addBill)

router
    .get('/add-discount', requiredLogin, controller.addDiscount);

router
    .get('/view-discount', requiredLogin, controller.viewDiscount);

router
    .get('/edit-discount', requiredLogin, controller.editDiscount);

router
    .get('/delete-discount', requiredLogin, controller.deleteDiscount);



router
    .get('/view-discounts', requiredLogin, controller.viewDiscounts);

router
    .get('/view-statistic', requiredLogin, controller.viewStatistic);


module.exports = router;