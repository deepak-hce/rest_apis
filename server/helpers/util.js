const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const APIError = require('./APIError');
const httpStatus = require('http-status');
const { resolve } = require('bluebird');
const env =  process.env;
const Email = require('email-templates');







function generatePasswordHash(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
}


function successResponse(message, code = 1) {
    return {
        ResponseCode: code,
        Comments: message,
    }
}


function sendEmail(userEmail) {
   return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
        host: env.MAIL_SMTP_HOST,
        port: env.MAIL_SMTP_PORT,
        auth: {
            user: env.MAIL_SMTP_USERNAME,
            pass: env.MAIL_SMTP_PASSWORD
        }
    });

    const email = new Email({
        transport: transport,
        send: true,
        preview: false,
        views: {
          root: '../views/templates',
        }
      });

    const message = {
        template: 'welcome',
        from: env.MAIL_SMTP_EMAIL, // Sender address
        to: userEmail,         // List of recipients
        // subject: 'Welcome to screech hub!', // Subject line
        // text:
        // `       Hi, ${userEmail} 

        //     Welcome to the screech hub!. Hope you are enjoying a lot.
    
        // Thanks,
        // Screech Hub` // Plain text body
    };

    email.send(message, function (err, info) {
        if (err) {
            reject(err);
        } else {
            resolve(info);
        }
    });
   }) 


}




module.exports = { generatePasswordHash, successResponse, sendEmail } 
