const express = require('express');
const router = express.Router();
const AuthorizeUser_controller = require('../Controller/auth/AuthorizeUser_controller');

router.post('/createauthorizeuser',AuthorizeUser_controller.createauthorizeuser);
router.post('/loginuthorizeuser',AuthorizeUser_controller.loginuthorizeuser);

module.exports = router;


