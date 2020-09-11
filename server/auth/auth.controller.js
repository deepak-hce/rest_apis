const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const util = require('../helpers/util');
const User = require('../user/user.model');
const Response = require('../helpers/Response');


// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

  const username = req.body.username;
  const password = req.body.password;


  User.findOne({ username }).then(user => {
    if (user !== null) {
      const passwordMatch = util.decryptPasswordHash(password, user.password);

      console.log('bcrypt', passwordMatch);

      if (passwordMatch === true) {
        const token = jwt.sign({
          username: user.username
        }, config.jwtSecret, { expiresIn: '48h' });
        return res.json({
          token,
          username: user.username,
          id: res._id
        });
      }
      const err = new APIError('Username or password is incorrect.', httpStatus.CONFLICT, true);
      return next(err);
    }
    const err = new APIError('No user found! Please register first.', httpStatus.CONFLICT, true);
    return next(err);
  })
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}




function register(req, res, next) {

  User.findOne({ username: req.body.username }, function (err, user) {
    if (user !== null) {
      const err = new APIError('User is already registered.', httpStatus.CONFLICT, true);
      return next(err);
    }
  });

  const encrypted = util.generatePasswordHash(req.body.password);

  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    password: encrypted,
    profilePicture: req.body.profilePicture,
    age: req.body.age,
    name: req.body.name
  });


  user.save().then((response) => {

    console.log(response);

    const verificationObject = {
      id: response._id
    }

    const token = util.generateEmailVerificationToken(verificationObject);

    verificationObject.token = token;



    util.sendEmail(req.body.username, verificationObject).then(() => {
      res.json(new Response('User registered successfully!'));
    }).catch(err => {
      console.log(err);
      const newError = new APIError(`Mail not sent successfully., ${err}`, httpStatus.BAD_GATEWAY, true);
      next(newError);
    })
  })
    .catch(e => next(e))
}







module.exports = { login, getRandomNumber, register };
