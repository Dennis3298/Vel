const mongoose = require('mongoose')

const AntwortSchema = new mongoose.Schema({
    antwort: {
        type: Number,
        required: true
    },
    notiz: {
        type: String
    }
})

const FrageSchema = new mongoose.Schema({
    _frageId:{
        type: String, 
        required: true
    },
    frage:{
        type: String,
        required: true,
    },
    antworten: [AntwortSchema]
})

const HeuristikTestSchema = new mongoose.Schema({
    _heuristikId: {
        type: String,
        required: true
    },
    _fragebogenId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    fragen: {
        type: [FrageSchema],
        required: true
    }
})

const HeuristikTest = mongoose.model("HeuristikTest", HeuristikTestSchema)

module.exports = HeuristikTest