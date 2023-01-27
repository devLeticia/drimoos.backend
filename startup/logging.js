
import winston from 'winston'
import 'express-async-errors'

export default function () {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename:'uncaughtExceptions.log'}));

        process.on('unhandleRejection', (ex) => {
            throw ex;
        });

        winston.add(new winston.transports.File({filename: 'logfile.log'}));
        //winston.add(winston.transports.MongoD, {
        //    db: 'mongodb://localhost/drimoos',
        //    level: 'info'
        //})
    }