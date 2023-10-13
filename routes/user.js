const express = require("express");
const router = express.Router();
const usercontroller = require('../controller/usercontroller');
const expensecontroller = require('../controller/expensecontroller');
const userautherization = require('../middleware/auth');


router.post('/user/adduser',usercontroller.addUser)
router.post('/user/login',usercontroller.login)
router.get('/user/download',userautherization.authenticate,expensecontroller.downloadexpense)


module.exports = router;