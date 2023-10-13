const express = require("express");
const router = express.Router();
const purchasecontroller = require('../controller/purchase');
const userautherization = require('../middleware/auth');



router.get('/purchase/premiummembership',userautherization.authenticate,purchasecontroller.purchasepremium)
router.post('/purchase/updatetransactionstatus',userautherization.authenticate,purchasecontroller.updatetransationstatus)


module.exports = router;