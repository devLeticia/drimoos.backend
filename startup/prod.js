//all the middleware we need to install for the production environment will be added here

const helmet = require('helmet');
const compression = require('compression');


module.exports = function(app) {
    app.use(helmet());
    app.use(compression());
}