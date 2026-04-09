const router=require('express').Router();
const accountController=require('../../../controllers/account');

router.post('/createAccount', accountController.createAccount);
module.exports = router;