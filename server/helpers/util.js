const bcrypt = require('bcrypt');
const { json } = require('body-parser');




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



module.exports = { generatePasswordHash, successResponse } 
