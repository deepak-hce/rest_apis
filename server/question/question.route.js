const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const questionCtrl = require('../question/question.controller');
const router = express.Router();



router.route('/')
    .post(validate(paramValidation.addQuestion), questionCtrl.addQuestion)


module.exports = router;

    
