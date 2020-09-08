const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username:  Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username:  Joi.string().email().required(),
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
      username:  Joi.string().email().required(),
      password: Joi.string().required(),
      profilePicture: Joi.string(),
      age: Joi.string(),
      name: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
    }
  }

};
