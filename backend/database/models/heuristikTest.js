const mongoose = require('mongoose')

const AntwortSchema = new mongoose.Schema({
    wert: {
        type: Number,
        required: true
    },
    _antwortId: {
        type: String,
        required: true
    },
    beschreibung: {
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
    antworten: {
        type: [AntwortSchema],
        required: true
    },
    notiz: {
        type: String,
        required: false
    },
    detailNotiz:{
        type: String,
        required: false
    }
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
    },
    titel: {
        type: String,
        required: true
    }
})

const HeuristikTest = mongoose.model("HeuristikTest", HeuristikTestSchema)

module.exports = HeuristikTest