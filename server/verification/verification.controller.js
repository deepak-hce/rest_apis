const util = require('../helpers/util');
const User = require('../user/user.model');
 

async function emailVerification(req, res) {
    const id = req.query.id;
    const token = req.query.token;
    const decodedTokenValue = await util.decodeToken(token);
    let isVerified = false;
    if (decodedTokenValue) {
        if (decodedTokenValue.id === id) {
            isVerified = true;
            User.update({_id: id}, {
                isVerified: true
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    res.render('emailVerification', {
        isVerified: isVerified
    })
}


module.exports = { emailVerification }