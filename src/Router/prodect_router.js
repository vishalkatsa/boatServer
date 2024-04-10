const express = require('express');
const router = express.Router();
const product_controller = require('../Controller/product_controller');
const upload = require('../multer/multer');


router.post('/creatproduct',upload.single('image'),product_controller.creatproduct);
router.get('/getproduct',product_controller.getproduct);

module.exports = router;
