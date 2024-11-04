const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/usermodel');


module.exports ={
    signAccessToken:(UserId)=>{
        return new Promise((resolve,reject)=>{
            const playload ={}
            const secret = progress.env.ACCESS_TOKEN_SECRET;
            const option = {
                expireIn: '10m',
                issuer: 'EddTechnologies',
                audience: UserId,
            }
            JWT.sign(payload, secret, option, (error, token) =>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },
    //middleware to verify access token
    verifyAccessToken:(req, res,next)=>{
        if(!req.headers['authorization']) return next(createError.unauthorized());
    }
}


