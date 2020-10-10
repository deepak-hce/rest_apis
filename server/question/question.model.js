const { string, number } = require('joi');
const mongoose = require('mongoose');


/**
 * Question schema.
 */

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAnswerConfirmed: {
        type: Boolean,
        default: false
    },
    votes: {
        count: {
            type: Number,
            default: 0
        },
        voteIds: [{
            type: mongoose.Types.ObjectId,
            default: []
        }
        ],

    },
    views: {
        count: {
            type: Number,
            default: 0
        },
        viewsIds: [{
            type: mongoose.Types.ObjectId,
            default: []
        }
        ],

    },
    tags: [{
        type: String,
    }],
    commentsIds: [{
        type: mongoose.Types.ObjectId
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})


questionSchema.statics = {
    list(page, id) {
        return this.find()
            .where('userId', id)
            .sort({ createdAt: -1 })
            .skip((page - 1) * 10)
            .limit(10)
            .exec();
    },

    count(id) {
        return this.find()
            .where('userId', id)
            .count()
            .exec()
    },

    incrementView(questionId, id) {
        return this.findByIdAndUpdate(questionId, { $inc: { 'views.count': 1 }, $push: { 'views.viewsIds': id } })
    },

    incrementVote(questionId, id) {
        return this.findByIdAndUpdate(questionId, { $inc: { 'votes.count': 1 }, $push: { 'votes.voteIds': id } })
    },

    getQuestionDetail(questionId) {
        return this.findById(questionId).exec()
    }

}





module.exports = mongoose.model('Question', questionSchema);
