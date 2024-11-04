const User = require('../models/usermodel');
const {authSchema} = require ('../helpers/validationSchema')
const creatError = require('http-errors');
require('dotenv').config();
const {signAccessToken, signRefreshToken} = require('../helpers/jwtHelper');
const {verifyAccessToken} = require('../helpers/jwtHelper');

module.exports = {
    register: async (req, res, next) => {
        try{
            const {email, password}= req.body;
            const result = await validateAsync(req.body)
    
            const exists = await User.findOne({email: email});
            if (exists) throw creatError.Conflict(`${email} has already exists `)
    
                const user = new User(result);
                const savedUser = await user.save();
                
                const accessToken = signAccessToken(savedUser._id);
                // const refreshToken = signRefreshToken(savedUser._id);
    
                res.send({accessToken});
        }
    catch (error){
        next(error);
    }
} 
},
 login = async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });
        if (!user) throw createHttpError.NotFound('User not registered');

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('Username/password is not valid');

        const accessToken = await signAccessToken(user.id);
        res.send({ accessToken });
    } catch (error) {
        if (error.isJoi) {
            return next(createError.BadRequest('Invalid username/password'));
        }
        next(error);
    }
};


