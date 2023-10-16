const express = require("express");
const router = express.Router();
const expensecontroller = require('../controller/expensecontroller');
const userautherization = require('../middleware/auth');



router.get('/expense/getexpense/:page',userautherization.authenticate,expensecontroller.getexpense)
router.post('/expense/addexpense',userautherization.authenticate,expensecontroller.addexpense)
router.delete('/expense/deleteexpense/:expenseid',userautherization.authenticate,expensecontroller.deleteexpense)


module.exports = router;