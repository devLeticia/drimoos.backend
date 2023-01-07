function log(req, res, next) { //middleware to log
    console.log('Logging...');
    next();
}

module.exports = log;