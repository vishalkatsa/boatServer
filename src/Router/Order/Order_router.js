const express = require('express');
const router = express.Router()
const Order_controller = require('../../Controller/Order/Order_controller')

router.post('/createorderproduct',Order_controller.createorderproduct);
router.get('/getorderseller/:id',Order_controller.getorderseller);
// router.patch('/updateproductquantity',Order_controller.updateproductquantity);
// router.delete('/deleteaddtocardproduct/:id',Order_controller.deleteaddtocardproduct);


module.exports = router;