const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
//middleware to check if user is logged in or not

const router = express.Router();

router.get("/admin",adminController.getAdmin)
router.post("/approve",adminController.postApprove)
router.post("/decline",adminController.postDecline)

module.exports = router;