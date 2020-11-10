const mongoose = require('mongoose')

const TeilnehmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
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
    interviewerName: {
        type: String,
        required: true
    },
    teilnehmer: [TeilnehmerSchema]
})

const Fragebogen = mongoose.model("Fragebogen", FragebogenSchema)

module.exports = Fragebogen