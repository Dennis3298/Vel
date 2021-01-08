const mongoose = require('mongoose')


const TeilnehmerSchema = new mongoose.Schema({
    age:{
        type: Number,
        required: true
    },
    geschlecht: {
        type: String,
        required: true
    }
}
)
const FragebogenSchema = new mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    heuristiken:{
        type: [String],
        required: true
    },
    interviewerFirstName: {
        type: String,
        required: true
    },
    interviewerLastName: {
        type: String,
        required: true
    },
    teilnehmer: [TeilnehmerSchema],
    datum: {
        type: Date,
        required: true
    }
})

const Fragebogen = mongoose.model("Fragebogen", FragebogenSchema)

module.exports = Fragebogen