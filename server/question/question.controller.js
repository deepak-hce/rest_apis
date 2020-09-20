const Question = require('./question.model');
const Response = require('../helpers/Response');
const ApiError = require('../helpers/APIError');
const Joi = require('joi');
const httpStatus = require('http-status');



function addQuestion(req, res, next) {
    const question = new Question({
        question: req.body.question,
        description: req.body.description,
        tags: req.body.tags,
        userId: req.headers.id
    });

    question.save().then(() => {
        return res.json(new Response('Question added successfully'));
    }).catch((err) => {
        next(new ApiError(err));
    })
}

function getQuestion(req, res, next) {

    Question.list(req.query.page, req.headers.id).then((questions) => {
        Question.count(req.headers.id).then((count) => {
            const object = {
                count,
                questions
            }
            return res.json(new Response('Question retrieved successfully', object));
        })
    })
        .catch((err) => {
            next(new ApiError(err));
        })

}

function modifyQuestion(req, res, next) {

    console.log(req);
    const type = req.query.type;
    const questionId = req.params.questionId;
    const userId = req.headers.id;

    switch (type) {
        case 'views':

            Question.findById(questionId).then((question) => {
                console.log(question.views.viewsIds);


                if (question !== null) {


                    const viewIds = question.views.viewsIds;

                    if ((viewIds).includes(userId)) {
                        next(new ApiError('Already viewed', httpStatus.CONFLICT));
                    } else {
                        Question.incrementView(questionId, userId).then(() => {
                            return res.json(new Response('View increased successfully'));
                        })
                    }
                } else {
                    next(new ApiError('no question found with the provided id', httpStatus.CONFLICT));
                }


            }).catch(err => next(new ApiError(err, httpStatus.CONFLICT)))




            // res.json({
            //     success: 'success',
            //     type
            // })
            break;

        case 'edit':

            const schema = Joi.object({
                question: Joi.string().required()
            })
            const { error, value } = schema.validate(req.body);

            console.log(error, value);

            if (error) {
                next(new ApiError(error, httpStatus.BAD_REQUEST));
                return;
            }

            res.json({
                success: 'success',
                type
            })
            break;

        default:
            break;
    }





}

module.exports = { addQuestion, getQuestion, modifyQuestion }