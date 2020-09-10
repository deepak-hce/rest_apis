const express = require('express');
const router = express.Router();

const verificationCtrl = require('./verification.controller');


router.route('/emailVerification').get(verificationCtrl.emailVerification);

module.exports = router;
