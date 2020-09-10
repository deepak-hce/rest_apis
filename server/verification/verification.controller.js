const util = require('../helpers/util');


async function emailVerification(req, res) {
    const id = req.query.id;
    const token = req.query.token;
    const decodedTokenValue = await util.decodeToken(token);
    let isVerified = null;
    if (decodedTokenValue) {
        if (decodedTokenValue.id === id) {
            isVerified = true;
        } else {
            isVerified = false;
        }
    }

    res.render('emailVerification', {
        isVerified: isVerified
    })
}


module.exports = { emailVerification }