import config from 'config'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({ //schema and also validation for saving in DB.
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50 
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        //choose an approach
        isAdmin: Boolean, // if you only need one kinf of role
        roles: [], // admins, moderators, 
        operations:[]  // control access in a more granular level hasAccees.storeUnlimitedDreams
    });

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token
}

const User = mongoose.model('User', userSchema);
function validateUser(user) { // validating data from client 
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user, {allowUnknown:true});
}

export {User, validateUser}

