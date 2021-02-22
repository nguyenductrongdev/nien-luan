const express = require("express");
const router = express.Router();

const controller = require("./../../api/controllers/products.controller");

router.get("/getByLDT_MA", controller.getByLDT_MA);

router.get("/getNbProducts", controller.getNbProducts);

router.get("/page", controller.page);

router.post("/add-brand", controller.postAddBrand);

router.post("/add-unit", controller.postAddUnit);

// bill
router.get("/bill", controller.getBills).post("/bill", controller.postAddBill);

// discount
router
  .post("/discount", controller.postAddDiscount)
  .put("/discount", controller.postEditDiscount);

router.get("/search", controller.searchByLDT_TEN);

// api for filtering feature
router.get("/filter", controller.filter);

module.exports = router;
