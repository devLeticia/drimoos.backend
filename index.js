
import winston from 'winston';
import express from 'express';
import './startup/logging.js' ;
import route from './startup/routes.js';
import './startup/db.js';
import './startup/validation.js';

const app = express();
const routeApp = route(app)

const port = process.env.PORT || 9000
const server = app.listen(port, () => winston.info(`listening on port ${port}`));

export default server;







