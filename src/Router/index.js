const express = require("express");
const router = express.Router();
const prodect_router = require('./prodect_router');
const authorizeuser_router = require('./authorizeuser_router');
const user_router = require('./user_router');
const addToCart_router = require('./addToCart_router');
const ShippingAdsress_router = require('./ShippingAdsress_router');
const SellerAuth_router = require('./SellerAuth_router')
const Order_router = require('./Order/Order_router')


router.use('/auth_user', user_router);
router.use('/auth_seller',SellerAuth_router);
router.use('/auth', authorizeuser_router);
router.use('/product', prodect_router);
router.use('/catagory', prodect_router);
router.use('/addtocard',addToCart_router);
router.use('/shipping',ShippingAdsress_router);
router.use('/order',Order_router);

module.exports = router;
