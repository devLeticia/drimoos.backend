const config = require('config')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
//String, Number, Date, Buffer, Boolean, ObjectID, Array
const dreamSchema = new mongoose.Schema({
    userId: String,
    happenedAt: {type: Date, default:Date.now},
    createdAt: {type: Date, default:Date.now},
    editedAt: {type: Date, default:Date.now},
    title: {
        type: String,
        minlegth:5,
        maxlength:255,
        required:true}, //required:true is a validation, if we dont send it, it wont save, YOU CAN PASS A FUCNTION in the required value
    description: String,
    feelings: [Number], //could replace by ky-value pairs object
    intensity: Number,
    keyWords: [String],
    lifeContext: String,
    //lifeCategories: {
    //    type: String,
    //    required: true,
    //    enum: [
    //        'family', 'relationship', 
    //    ]
    //},
    //tags: {
    //    type: Array, 
    //    validate: {
    //        validator: function(v) {
    //            return v.length > 0
    //        }
    //            message: 'should have at least one tag'
    //    }
    //}
    //async validator (used when you wanna check somethinh in another collection on the db)
    lifeCategories: [Number],
    timeReference: Number,
    source: Number,
    intepretation: String,
    purpose: [Number]
});

const Dream = mongoose.model('Dreams', dreamSchema);

function validateDream(dream) { // all the valiudation logic in one placce
    const schema = Joi.object({
        userId: Joi.number().required(),
        description: Joi.string().min(40).required(), 
        happenedAt: Joi.date()
    });
    return schema.validate(dream, {allowUnknown:true}); // se nao vou validar uma das partes, incluir o allowUnknown:true
};

exports.Dream = Dream;
exports.validateDream = validateDream