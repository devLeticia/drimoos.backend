//https://expressjs.com/en/5x/api.html
const config = require('config')
const startupDebugger = require('debug')('app:startup'); 
const dbDebugger = require('debug')('app:db'); // then set the environment DEBUG=app:db
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticatior = require('./authenticator.js')
const express = require('express');
const app = express();
const home = require('./routes/home')
const dreams = require('./routes/dreams')
const users = require('./routes/users')
const auth = require('./routes/auth')
const mongoose = require('mongoose');
require('./startup/prod')(app);


//knowing your enviroment - production or development
//console.log(`NODE_ENV:${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`)


app.use(express.json()); // middleware to use in the request process pipeline, if there is a json body in the request, it will set a req.body property
//app.use(express.urlencoded());// parses incoming request with urlencoded payload key-value&key=value - we dont use it that often, its not modern
//app.use(express.static('public')); // all static assets inside this folder, are served from the root of the site  
app.use(helmet());//helmet - good for headers, you have to install it. good for 
app.use('/api/dreams', dreams); // for any route that start with .. use the dreams file
app.use('/', home)
app.use('/api/users', users);
app.use('/api/auth', auth);
//Configuration
//console.log('Application Name: ' + config.get('name'));
//console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);// anything but zero is failure
}

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled')
}


dbDebugger('Connected to the database')

app.use(logger); // middleware we created
app.use(authenticatior);
// morgan, to log http requests - everytime we send a request, it will be logged - tiny is the format - you can configure to wwrite a log file
//you may not want to use morgan in all situatios 
app.use(morgan('tiny'));

async function createDream() {
    const dream = new Dream({
            userId: 111,
            description: 'Ipsum loream dorlar eptar set',
            feelings: [1, 2, 3, 4],
            intensity: 3,
            keyWords: ['snake', 'house', 'pain'],
            lifeContext: 'I fwoiefowje fowiejf ofwjwek fwoeijfw e',
            lifeCategories: [1, 6, 7],
            timeReference: 3,
            source: 3,
            intepretation: 'I think it means that .....',
            purpose: [1, 2, 4]
    });
    try {
        //dream.validate((err) => {
        //    if(err) {
        //        console.log('HERE>>', err)
        //    }
        //});
        const result = await dream.save();
        console.log(result);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
        console.log(ex.errors)
        console.log('AQUI', ex.message)
    }
}


async function getDreams() {
    // Read about query operators (comparison, logical), filters
    //mongoose has many find methods to query a document
    //const dreams = await Dream.find(); will find ALL dreams
    //regular expression - best way to filter strings

    const dreams = await Dream
    .find({source:3}) // it's a filter to return only with source 3
    .limit(10)
    //.skip() --> for pagination ()
    .sort({title: 1})
    .select({title: 1, lifeCategories: 1}) // will filter the properties that will be returned
    console.log('Todos os Sonhos: ',  dreams);
    //.count(2) -> will show how many documents meets the filter
}

async function updateDream(id) {
    // 2 approaches - Query first & updateFirst

    //1.Query first
            //const dream = await Dream.findById(id)
            //if (!dream) return;
            //dream.set({source: 1, title:'titulo foi mudado'})

            //const result = await dream.save();
            //console.log(result)

    //2.Update First - if you know what you're doing, you update it directly, it's better
    //look for update operators
            const result = await Dream.updateOne({_id: id}, { //findByIdAndUpdate -> each method has a signature
                $set: {
                    source: 1,
                    title:'Mudei o titulo com updateOne'
                }
            });
            console.log(result)
}



const port = process.env.PORT || 9000
app.listen(port, () => console.log(`listening on port ${port}`));
mongoose.set("strictQuery", true); //ver depois como resolver isso
mongoose.connect('mongodb://localhost/drimoos')
.then(() => {console.log('Connected to mongoDB')})
.catch(err => console.error('Could not connect to MongoDB'))

//createDream();
//getDreams();
//updateDream('63b6309c3aca4032b8a4bb92');
//deleteDream('63b6309c3aca4032b8a4bb92');

//USE BOTH MONGOOSE FOR DB VALIDATION AND JOI FOR API VALIDATION

//performance x consistency
//Normalization - using reference - ex: id of a user --> higher consistency, lower performance 
//Denormalization - denormalization - ex: embed a document inside another document --> higher performance, but lower consistency


//Authentication - process of identifying if the user is who they claim they are 
//Authorization  - if the user has the right permission to performance what he is trying to do 
  //permission   - 

  //Register user - POST request/api/users -
  //Login (login request) - POST request/api/logins








