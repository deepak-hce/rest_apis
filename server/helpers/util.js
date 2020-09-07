const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const APIError = require('./APIError');
const httpStatus = require('http-status');
const { resolve } = require('bluebird');





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


function sendEmail() {
   return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '83675c8d91afc4',
            pass: 'ea243e54803f7b'
        }
    });

    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Design Your Model S | Tesla', // Subject line
        text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            reject(err);
        } else {
            resolve(info);
        }
    });
   }) 


}




module.exports = { generatePasswordHash, successResponse, sendEmail } 
