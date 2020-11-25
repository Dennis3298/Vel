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
            "_frageId": "F3",
            "_heuristikId": "HEU1",
            "details": [
                "Was für Feedback bekommst du? Wann bekommst du es?",
                "Was sollte sich an dem Feedback ändern?",
                "Von wem hättest du gerne Feedback?"
            ]
        },
        {
            "_frageId": "F4",
            "_heuristikId": "HEU1",
            "details": [
                "Wann ist deine Arbeit „gut“ oder „schlecht“?",
                "Was sagen deine Kollegen/-innen über deine Arbeit?",
                "In welchen Situationen besprecht ihr, wie die Arbeit läuft?",
                "Was würdest du ändern?"
            ]
        },
        {
            "_frageId": "F5",
            "_heuristikId": "HEU1",
            "details": [
                "Woher kennst du den Prozess?",
                "Wer arbeitet außer dir an dem Prozess mit?",
                "Wie stimmst du dich mit deinen Kollegen/-innen ab?",
                "Wie dokumentiert ihr den Prozess?",
                "Wo kannst du den aktuellen Stand erfahren oder nachschauen?",
                "Welche Probleme gibt es? Was würdest du ändern?"
            ]
        },
        {
            "_frageId": "F6",
            "_heuristikId": "HEU1",
            "details": [
                "Woher weißt du, was du bei deiner Aufgabe machen musst? Wo kannst du das nachschauen?",
                "Wer arbeitet nach dir an deinem Arbeitsbereich?",
                "An wen kannst du dich bei Fragen wenden?",
                "Was passiert, wenn du etwas machst, dass nicht vorgesehen oder möglich ist?",
                "Was stört dich? Was würdest du ändern?",
            ]
        },
        {
            "_frageId": "F7",
            "_heuristikId": "HEU1",
            "details": [
                "Bei welchen Aufgaben kannst du flexibel entscheiden in welcher Weise oder Reihenfolge du sie bearbeitest?",
                "Wie entscheidest du dich für eine Option? Wie schränkst du dich ein?",
                "Woher weißt du welche Optionen du nicht ausprobieren musst (z.B., weil sie nicht möglich sind)?",
                "Bist du zufrieden mit dieser Arbeitsweise? Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F8",
            "_heuristikId": "HEU1",
            "details": [
                "Mit welchen anderen Bereichen hast du zu tun? Welche Tätigkeiten werden vor und nach deinen Aufgaben erledigt?",
                "Welche Informationen fehlen dir in diesen Bereichen?",
                "Wer kann dir bei Fragen weiterhelfen?",
                "Bist du zufrieden mit der Situation? Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F9",
            "_heuristikId": "HEU1",
            "details": [
                "Welche Arbeitsbereiche gibt es, an denen du nicht direkt beteiligt bist?",
                "Was machen deine Kollegen und Kolleginnen außerhalb deines Teams?",
                "Woher weißt du was sie machen?",
                "Wie bekommst du mit, was außerhalb deiner Abteilung/Team passiert?",
                "Bist du zufrieden mit der Situation? Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F10",
            "_heuristikId": "HEU1",
            "details": [
                "Bei welchen Prozessen gibt es Informationen? Helfen diese beim Verständnis?",
                "Welche Abläufe sind schwierig zu verstehen? Wie gehst du damit um?",
                "Wo würden andere Darstellungen wie Abbildungen oder Modelle helfen?",
                "Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F11",
            "_heuristikId": "HEU1",
            "details": [
                "In welchen Situationen brauchst du Informationen, die du nicht (auswendig) kennst?",
                "Wie kommst du an diese Informationen?",
                "Welche Form haben die Informationen? (z.B. Mündliche Erklärung, Text, Bilder,Zeichnungen, Videos, …)",
                "Was hilft dir beim Verständnis besonders?",
                "Welche Informationen sollten besser verständlich sein?",
                "Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F12",
            "_heuristikId": "HEU1",
            "details": [
                "Welche Möglichkeiten hast du, wenn du eine bestimmte Information brauchst? Wieunterscheiden sich die Möglichkeiten?",
                "Was machst du, wenn du nur einen schnellen Überblick brauchst?",
                "Was machst du, wenn du etwas ganz genau wissen willst?",
                "Bist du zufrieden mit der Art wie Informationen angezeigt werden? Was sollte sich ändern?"
            ]
        },
        {
            "_frageId": "F13",
            "_heuristikId": "HEU1",
            "details": [
                "Welche Bereiche deiner Arbeitsumgebung sind besonders umfangreich oder komplex?",
                "Was hilft dir besonders diese Bereiche zu verstehen?",
                "Wie kommst du mit neuen Situationen oder Aufgaben zurecht? Was hilft dir diese zu meistern?",
                "Welche Aufgaben sind trotzdem schwierig? Was fehlt dir um dort gut arbeiten zu können?"
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