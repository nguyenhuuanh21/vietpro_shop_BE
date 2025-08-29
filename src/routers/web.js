const express = require('express');
const router = express.Router();
const config=require("config");
//import controller
const CategoryController = require('../apps/controllers/apis/category')
const OrderController = require('../apps/controllers/apis/order')
const ProductController = require('../apps/controllers/apis/product')
const CustomerController=require('../apps/controllers/apis/customer')
const AuthController = require('../apps/controllers/apis/auth')   
//import middleware
const AuthMiddleware=require('../apps/middlewares/auth')
//router
router.get(`/categories`, CategoryController.index);
router.get(`/categories/:id`, CategoryController.show);
router.get(`/categories/:id/products`, CategoryController.categoryProducts);

router.post(`/order`, OrderController.order);
router.get(`/order/:id`, OrderController.show);
router.patch(`/order/:id/cancelled`, OrderController.cancelled);

router.get(`/products`, ProductController.index);
router.get(`/products/:id`, ProductController.show);
router.get(`/products/:id/comments`, ProductController.comments);
router.post(`/products/:id/comments`, ProductController.storeComments);

router.post("/customer/login", AuthController.loginCustomer);
router.post("/customer/register", AuthController.registerCustomer);
router.post("/customer/logout", AuthController.logoutCustomer);
router.post("/customer/update/:id", CustomerController.update);
router.get(`/customer/:id/orders`, OrderController.index);
router.get("/auth/test",AuthMiddleware.verifyAuthenticationCustomer, (req, res) => {
    return res.status(200).json("pass auth");
});

router.get(`/auth/refresh-token`, AuthController.refreshToken);



module.exports = router;    