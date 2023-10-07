const express = require("express");
const router = express.Router();
const premiumfeaturescontroller = require('../controller/premiumcontroller');
const userautherization = require('../middleware/auth');



router.get('/premium/showleaderboard',userautherization.authenticate,premiumfeaturescontroller.getuserleaderboard)


module.exports = router;