const express = require('express');
const router = express.Router()
const ShippingAddress_controller = require('../Controller/ShippingAddress_controller')

router.post('/createshippingaddress',ShippingAddress_controller.createshippingaddress);
router.post('/getshippingaddress',ShippingAddress_controller.getshippingaddress);




module.exports = router;