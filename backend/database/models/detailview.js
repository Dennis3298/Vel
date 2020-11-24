const mongoose = require('mongoose')

const DetailviewSchema = new mongoose.Schema({
    details:{
        type: [String],
        required: true
    },
    _frageId:{
        type: String,
        required: true
    },
    _heuristikId:{
        type: String,
        required: true
    }
})

DetailviewSchema.statics.initDetailview = (Detailview) => {
    let _detailviews = [
        {
            "_frageId": "F1",
            "_heuristikId": "HEU1",
            "details": [
                "Was bewirkst du mit deiner Arbeit? Was würde passieren, wenn du deine Arbeit nicht machst (z.B., wenn du krank bist)?",
                "Was passiert mit deiner Arbeit, wenn du fertig bist?",
                "Wie beeinflusst du die Arbeit deiner Kollegen und Kolleginnen?",
                'Was soll sich ändern, damit du dich mehr als Teil des "großen Ganzen" siehst?'
            ]
        }, 
        {
            "_frageId": "F2",
            "_heuristikId": "HEU1",
            "details":[
                "Was bekommst du von derArbeit deiner Kollegen und Kolleginnen mit?",
                "Wie sehr strengen sich deine Kollegen/-innen an?",
                "Was muss sich ändern, damit du besser mitbekommst was deine Kollege-innen leisten?"
            ]
        },
        {
            "_frageId": "F1",
            "_heuristikId": "HEU2",
            "details": [
                "lmao"
            ]
        },
        {
            "_frageId": "F2",
            "_heuristikId": "HEU2",
            "details": [
                "lmao"
            ]
        }
        
    ]

    Detailview.deleteMany({}, (err) => {
        _detailviews.forEach(detailview => {
            Detailview.create(detailview)
        })
    })
}

const Detailview = mongoose.model("Detailview", DetailviewSchema)

module.exports = Detailview