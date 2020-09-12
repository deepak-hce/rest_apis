
const ApiError = require('../server/helpers/APIError');
const httpStatus = require('http-status');
const util = require('../server/helpers/util');


const avoidEndPoints = [
    '/api/auth/login',
    '/api/auth/register'
]


module.exports = {

    apiAuthVerification: async function (req, res, next) {

        if (avoidEndPoints.includes(req.url)) {
            console.log('this url need to be avoid');
            next();
        } else {
            let err;

            const token = req.headers.authorization;
            const id = req.headers.id;

            if (token && id) {
                const decodedToken = await util.decodeToken(token);
                console.log(decodedToken);
                if (decodedToken !== null) {
                    if (decodedToken.id === id) {
                        return next();
                    }
                }

                err = new ApiError('Unauthorized Access', httpStatus.UNAUTHORIZED);
                return next(err);

            } else {
                err = new ApiError('Headers are not correct', httpStatus.UNAUTHORIZED);
                return next(err);
            }





        }
        console.log('console.log from middleware');
    }
}

