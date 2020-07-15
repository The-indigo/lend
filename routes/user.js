const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
//middleware to check if user is logged in or not
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//index 
router.get('/', userController.getIndex);
router.get('/about', userController.getAbout);
router.get('/howitworks', userController.getHow);
router.get('/signup', userController.getsignUp);
router.post('/signup', userController.postsignUp);
router.get('/login', userController.getlogin);
router.post('/login', userController.postlogIn);
router.post('/logout', userController.postLogout)
router.get('/calculator', userController.getcalculator)
router.get('/apply', isAuth, userController.getApplyform)
router.post('/apply', isAuth, userController.postApplyForm)
router.get('/dashboard', isAuth,userController.getDashboard)
router.get('/paystack', isAuth,userController.getPaystack)
router.post('/paystack/pay',isAuth,userController.payPaystack)
router.get('/paystack/callback', isAuth, userController.callBackPaystack)
router.get('/receipt/:id',isAuth, userController.getReceipt);
router.get('/payerror',isAuth, userController.getPaystackError);




module.exports = router;
