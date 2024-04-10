const express = require('express');
const router = express.Router();
const user_controller = require('../Controller/auth/user_controller');

router.post('/createuser',user_controller.createuser);
router.post('/loginuser',user_controller.loginuser);


module.exports = router;