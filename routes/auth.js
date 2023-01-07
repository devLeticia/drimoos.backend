const {User} =  require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express  = require('express');
const router = express.Router();

//endpoint para authenticar o usuario (login) - verificaar que o email e senha dele estao corretos
router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let user = await User.findOne({email: req.body.email}) //find by email
        if (!user) return res.status(400).send('Invalid email or password');
    
        //compare given password with database password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) res.status(400).send('Invalid email or password')
    
        //if everthing is correct, we need to create and return a JWT to the client
        // the private key must be stored in an environment property
        const token = user.generateAuthToken();
        res.send(token);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
        console.log(ex.errors)
        console.log('AQUI', ex.message)
    }
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req, {allowUnknown:true});
}


module.exports = router;