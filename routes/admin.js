const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProduct);

router.get("/admin/products", adminController.getProducts);

router.post("/admin/add-product", adminController.postAddProduct);

module.exports = router;