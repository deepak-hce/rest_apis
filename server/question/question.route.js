const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const APIError = require('../helpers/APIError');
const questionCtrl = require('../question/question.controller');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/images' })

    


function middleware (req, res, next) {
    console.log('Middleware in action', req.file);
    next();
}

router.route('/')
    .post(upload.single('file'), validate(paramValidation.addQuestion), questionCtrl.addQuestion)
   

router.route('/:questionId/view')
    .put(validate(paramValidation.putQuestions), questionCtrl.increaseView);


    router.route('/:questionId/vote')
    .put(validate(paramValidation.putQuestions), questionCtrl.increaseVote);



module.exports = router;

