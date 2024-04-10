const express = require('express');
const router = express.Router()
const AddToCart_controller = require('../Controller/AddToCart_controller')

router.post('/addtocardproduct',AddToCart_controller.addtocardproduct);
router.get('/getaddtocardproduct/:id',AddToCart_controller.getaddtocardproduct);
router.patch('/updateproductquantity',AddToCart_controller.updateproductquantity);
router.delete('/deleteaddtocardproduct/:id',AddToCart_controller.deleteaddtocardproduct);


module.exports = router;