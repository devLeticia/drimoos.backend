import auth from '../middleware/auth.js'
import _ from 'lodash'
import bcrypt  from 'bcrypt'
import {User, validateUser} from '../models/user.js'
import mongoose from 'mongoose'
import express from 'express'

const router = express.Router();


router.get('/me', auth, async (req, res) => { // payload will come from JWT
    const user = await User.findById(req.user._id).select('-password') // SEMPRE que for verificar ou retornar algo no banco, usar o await!!
    res.send(user);
})

router.post('/', async(req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message) // if joi validations are wrong, we will return an error
    
        let user = await User.findOne({email: req.body.email}) //find by email
        if (user) return res.status(400).send('User already registered');
    
        user = new User(_.pick(req.body,['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        const token = user.generateAuthToken();// no cliente, ler esse header e armazenar no cliente, na proxima vez, mandar no servidor (isso é pro caso de criarmos a conta do usuario sem validar o email, entoa isso vai ser alterado posteriorerment)
        user =  _.pick(user, ['name', 'email'])
        res.header('x-auth-token', token).send(user);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
        console.log(ex.errors)
        console.log('AQUI', ex.message)
    }
})
//logout must be implemented on the cliente by deleting the token -> do never store the token on the database!
// if you need to store the token, encrypt it before
export default router;