const expressJwt = require('express-jwt');
//the protection function

function authJWT(){
    const secret = process.env.SECRET;
    return expressJwt({
            secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        }).unless({
            //path to api endpoints that don't need to be authonticated
            path: [
                '/api/v1/users/register',
                '/api/v1/users/login'
            ]
        })
}

async function isRevoked(req,payload, done){
    if(!payload.isAdmin){
        done(null,true);
    }
    done();
}
module.exports = authJWT