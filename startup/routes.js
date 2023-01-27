import express from 'express'
import dreams from '../routes/dreams.js'
import users from '../routes/users.js'
import auth from '../routes/auth.js'
import error from '../middleware/error.js'

function routes(app) {
    app.use(express.json());
    app.use('/api/dreams', dreams);
    app.use('/api/users', users);
    app.use('/api/auth/', auth);
    app.use(error)
}

export default routes