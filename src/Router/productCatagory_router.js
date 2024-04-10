const express = require('express');
const router = express.Router();
const product_catagory = require('../Controller/product_catagory');


router.post('/createcatagory',product_catagory.createcatagory)

module.exports = router;