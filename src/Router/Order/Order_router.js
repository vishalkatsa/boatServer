const express = require('express');
const router = express.Router()
const Order_controller = require('../../Controller/Order/Order_controller')
const OrderPay_controller = require('../../Controller/Order/OrderPay_controller')

router.post('/createorderproduct',Order_controller.createorderproduct);
router.get('/getorderseller/:id',Order_controller.getorderseller);
router.get('/getordercustomer/:id',Order_controller.getordercustomer);
router.patch('/updateorder',Order_controller.updateorder);
// router.delete('/deleteaddtocardproduct/:id',Order_controller.deleteaddtocardproduct);
router.post('/orderpay',OrderPay_controller.orderpay);


module.exports = router;