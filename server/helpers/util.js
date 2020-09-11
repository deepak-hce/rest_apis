const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const APIError = require('./APIError');
const httpStatus = require('http-status');
const { resolve } = require('bluebird');
const env = process.env;
const config = require('../../config/config');
const jwt = require('jsonwebtoken');



function generatePasswordHash(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
}

function decryptPasswordHash(password, hash) {
    const isCorrect = bcrypt.compareSync(password, hash);
    return isCorrect;
}

function successResponse(message, code = 1) {
    return {
        ResponseCode: code,
        Comments: message,
    }
}


function sendEmail(userEmail, verificationObject) {
    return new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            host: env.MAIL_SMTP_HOST,
            port: env.MAIL_SMTP_PORT,
            auth: {
                user: env.MAIL_SMTP_USERNAME,
                pass: env.MAIL_SMTP_PASSWORD
            }
        });

        const content = generateEmailVerificationContent(userEmail, verificationObject);

        const message = {
            from: env.MAIL_SMTP_EMAIL, // Sender address
            to: userEmail,         // List of recipients
            subject: 'Welcome to screech hub!', // Subject line
            html: content // Plain text body
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


function generateEmailVerificationContent(userEmail, linkData) {

    const link = `http://localhost:4040/api/verify/emailVerification?id=${linkData.id}&token=${linkData.token}`;

    return `<h3>Hi, ${userEmail} </h3>

            <h5>
            Welcome to the screech hub!. Hope you are enjoying a lot.  </h5>

            <a href = '${link}'> 
            <img src = 'https://i.ibb.co/8DBtvzw/welcome-screech-hub.jpg'> </a>


       
        <h5>  Thanks,  </h5>
        <h5> Screech Hub  </h5>`;
}




function generateRandomString() {
    const length = 11;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function generateEmailVerificationToken(data) {
    const token = jwt.sign(data, config.jwtSecret, { expiresIn: '7d' });
    return token;
}

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, function (err, data) {
            if (err) {
                reject(null);
            }
            resolve(data);
        })
    }).catch(err => new Error(err))
}


module.exports = { generatePasswordHash, successResponse, sendEmail, generateRandomString, generateEmailVerificationToken, decodeToken, decryptPasswordHash } 
