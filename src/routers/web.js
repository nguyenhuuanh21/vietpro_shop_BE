const express = require('express');
const router = express.Router();
const config=require("config");
//import controller
const CategoryController = require('../apps/controllers/category')
const OrderController = require('../apps/controllers/order')
const ProductController=require('../apps/controllers/product')
//router
router.get(`${config.get("app.prefixApiVersion")}/categories`, CategoryController.index);
router.get(`${config.get("app.prefixApiVersion")}/orders`, OrderController.index);
router.get(`${config.get("app.prefixApiVersion")}/products`, ProductController.index);

module.exports = router;    