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
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
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
    }
}





module.exports = mongoose.model('Question', questionSchema);
