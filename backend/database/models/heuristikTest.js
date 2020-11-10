const mongoose = require('mongoose')

const FrageSchema = new mongoose.Schema({
    _frageId:{
        type: String, 
        required: true
    },
    antwort: {
        type: Number,
        required: true
    }
})

const HeuristikTestSchema = new mongoose.Schema({
    _heuristikId: {
        type: String
    },
    _fragebogenId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    fragen: {
        type: [FrageSchema]
    }
})

const HeuristikTest = mongoose.model("HeuristikTest", HeuristikTestSchema)

module.exports = HeuristikTest