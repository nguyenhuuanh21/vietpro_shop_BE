const express = require('express');
const router = express.Router();
const config=require("config");
//import controller
const CategoryController = require('../apps/controllers/apis/category')
const OrderController = require('../apps/controllers/apis/order')
const ProductController=require('../apps/controllers/apis/product')
const AuthController = require('../apps/controllers/apis/auth')   
//import middleware
const AuthMiddleware=require('../apps/middlewares/auth')
//router
router.get(`/categories`, CategoryController.index);
router.get(`/categories/:id`, CategoryController.show);
router.get(`/categories/:id/products`, CategoryController.categoryProducts);
// router.get(`/orders`, OrderController.index);
router.post(`/order`, OrderController.order);


router.get(`/products`, ProductController.index);
router.get(`/products/:id`, ProductController.show);
router.get(`/products/:id/comments`, ProductController.comments);
router.post(`/products/:id/comments`, ProductController.storeComments);

router.post("/auth/login", AuthController.loginCustomer);
router.post("/auth/register", AuthController.registerCustomer);
router.post("/auth/logout", AuthController.logoutCustomer);
router.post("/auth/test",AuthMiddleware.verifyAuthenticationCustomer, (req, res) => {
    return res.status(200).json("pass auth");
});

module.exports = router;    