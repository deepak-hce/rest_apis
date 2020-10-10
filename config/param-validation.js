const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },


  // POST when registering the user.

  register: {
    body: {
      username: Joi.string().email().required(),
      password: Joi.string().required(),
      profilePicture: Joi.string(),
      age: Joi.string(),
      name: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
    }
  },

  addQuestion: {
    body: {
      question: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string()),
    },
    file: {
      mimetype: Joi.string().valid('image/gif', 'image/png', 'image/jpeg').required()
    }
  },

  getQuestion: {
    query: {
      page: Joi.number().required()
    }
  },

  putQuestions: {
    params: {
      questionId: Joi.string().required()
    }
    // query: {
    //   type: Joi.string().valid('views', 'edit').required()
    // }

  }

};
