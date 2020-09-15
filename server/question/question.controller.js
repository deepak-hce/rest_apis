const Question = require('./question.model');
const Response = require('../helpers/Response');
const ApiError = require('../helpers/APIError');



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
        return res.json(new Response('Question retrieved successfully', questions));
    })
    .catch((err) => {
        next(new ApiError(err));
    })

}

module.exports = { addQuestion, getQuestion }