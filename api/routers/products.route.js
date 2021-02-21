const express = require("express");
const router = express.Router();

const controller = require("./../../api/controllers/products.controller");

router.get("/getByLDT_MA", controller.getByLDT_MA);

router.get("/getNbProducts", controller.getNbProducts);

router.get("/page", controller.page);

router.post("/add-brand", controller.postAddBrand);

router.post("/add-unit", controller.postAddUnit);

// bill start
router
  .post("/add-bill", controller.postAddBill)
  .get("/bill", controller.getBills);
// bill end

// discount start
router.post("/add-discount", controller.postAddDiscount);

router.post("/edit-discount", controller.postEditDiscount);
// discount end

router.get("/search", controller.searchByLDT_TEN);

router.get("/filter", controller.filter);

module.exports = router;
