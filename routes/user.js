const express = require("express");
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get('/user/signup',usercontroller.getUser)

router.post('/user/signup',usercontroller.addUser)

router.get('/user/signin',usercontroller.getUser)

router.post('/user/signin',usercontroller.postSignIn)


router.get('/expense/addexpense',usercontroller.getexpense)
router.post('/expense/addexpense',usercontroller.addexpense)


module.exports = router;