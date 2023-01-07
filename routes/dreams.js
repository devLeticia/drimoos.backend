const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {Dream, validateDream} = require('../models/dream');


router.get('/', (req, res) => {
    res.send(dreams)
});

//get a single dream
router.get('/:id', async (req, res) => {
   const dream = await Dream.findById(req.user._id)
   if (!dream) return res.status(404).send('The dream with the given Id was not found')
   res.send(dream);
});

router.post('/', auth, (req, res) => {
    //const validation = validateDream(req.body);
    const { error } = validateDream(req.body); // deestructuring *modern javascript
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const dream = {
    id: dreams.length + 1,
    userId: req.body.userId,
    happenedAt: req.body.happenedAt, 
    createdAt: new Date(), 
    editedAt: new Date(), 
    title: req.body.title, 
    description: req.body.description, 
    feelings: req.body.feelings, 
    intensity: req.body.intensity, 
    keyWords: req.body.keyWords, 
    lifeContext: req.body.lifeContext, 
    lifeCategories: req.body.lifeCategories, 
    timeReference: req.body.timeReference, 
    source: req.body.source, 
    intepretation: req.body.intepretation, 
    purpose: req.body.purpose, 
   };
   dreams.push(dream);
   res.send(dream);// send it when the client needs to know the id that was created.
});

 router.put('/:id', (req, res) => { // lookup the dream, if not exist 404, otherwise, validate it, return 400 if invalid, if everything is good, update the dream
    const dream = Dream.find(x => x.id === parseInt(req.params.id))
    if (!dream) return res.status(404).send('The dream with the given Id was not found')
    
    const { error } = validateDream(req.body); // deestructuring *modern javascript
    if (error) return res.status(400).send(error.details[0].message); // the "return will make the code stop here"

    //estudar melhor como funciona o update
    dream.title = req.body.title 
    res.send(dream);
});

router.delete('/:id', [auth, admin], async  (req, res) => { // auth middleware must be taken off here
 //lokup the dream, if it doesnt exist, return 404
 const dream = await Dream.findOne(req.body._id)
 if (!dream) return res.status(404).send('The dream with the given Id was not found')
 
 //otherwise, delete it, and return the deleted dream
 const result= await Dream.deleteOne( req.body._id) // deleteMany, findaByIdAndRemove
 console.log('AQUI ->', result)
 res.send(result);
 //Returne the dream
});




module.exports = router;
