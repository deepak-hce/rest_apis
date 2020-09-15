const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const questionCtrl = require('../question/question.controller');
const router = express.Router();



router.route('/')
    .post(validate(paramValidation.addQuestion), questionCtrl.addQuestion)
    .get(validate(paramValidation.getQuestion), questionCtrl.getQuestion)


module.exports = router;

    
