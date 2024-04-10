const express = require('express');
const router = express.Router();
const SellerAuth_controller = require('../Controller/auth/SellerAuth_controller');

router.post('/createauthorizeuser',SellerAuth_controller.createsellerauth);
router.post('/loginuthorizeuser',SellerAuth_controller.loginsellerauthorize);

module.exports = router;


