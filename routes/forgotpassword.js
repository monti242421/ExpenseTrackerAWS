const express = require("express");
const router = express.Router();
const forgotpasswordcontroller = require('../controller/forgotpasswordcontroller');


router.post('/password/forgotpassword',forgotpasswordcontroller.forgotpassword)

module.exports = router;