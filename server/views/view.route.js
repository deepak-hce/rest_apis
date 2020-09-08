const express = require('express');
const validate = require('express-validation');
const viewCtrl = require('./view.controller');




const router = express.Router(); // eslint-disable-line new-cap

router.route('/welcome')

  .get(viewCtrl.renderWelcome)


module.exports = router;
