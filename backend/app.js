const express = require('express')
const app = express()
const mongoose = require('./database/mongoose')

const Fragebogen = require('./database/models/fragebogen')
const HeuristikTest = require('./database/models/heuristikTest')
const Detailview = require('./database/models/detailview')

app.use(express.json())

/* 
    localhost:3000 - backend api
    localhost:4200 - frontend
    => reject any request that does not come from the frontend
*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type,Accept")
    next()
})


 /*********************Fragebogen**************************/

 //Neuen Fragebogen posten
app.post('/frageboegen', (req, res) => {
    (
        new Fragebogen({
        'titel': req.body.titel,
        'heuristiken': req.body.heuristiken,
        'interviewerFirstName': req.body.interviewerFirstName,
        'interviewerLastName': req.body.interviewerLastName,
        'teilnehmer': req.body.teilnehmer
    }))
        .save()
        .then((fragebogen) => res.send(fragebogen))
        .catch((error) => console.log(error))
})

//Alle Bögen finden
app.get('/frageboegen', (req, res) => {
    Fragebogen.find({})
        .then(frageboegen => res.send(frageboegen))
        .catch((error) => console.log(error))
})

// localhost:3000/frageboegen/:1234

//Einen bestimmten Bogen per ID finden
app.get('/frageboegen/:fragebogenId', (req, res) => {
    Fragebogen.find({ _id: req.params.fragebogenId})
        .then(frageboegen => res.send(frageboegen))
        .catch((error) => console.log(error))
})

//Einen Fragebogen updaten
app.patch('/frageboegen/:fragebogenId', (req, res) => {
    Fragebogen.findOneAndUpdate({'_id' : req.params.fragebogenId}, {$set: req.body})
        .then(frageboegen => res.send(frageboegen))
        .catch((error) => console.log(error))
})

//Einen Fragebogen nach ID löschen
app.delete('/frageboegen/:fragebogenId', (req, res) => {
    const deleteHeuristiken = (fragebogen) => {
        HeuristikTest.deleteMany({_fragebogenId: fragebogen._id})
            .then(() => fragebogen)
            .catch((error) => console.log(error))
    }

    Fragebogen.findByIdAndDelete(req.params.fragebogenId)
                .then((fragebogen) => res.send(deleteHeuristiken(fragebogen)))
                .catch((error) => console.log(error))
})

/******************************************************/


/******************HeuristikTest***********************/


// PFAD: http://localhost:3000/frageboegen/:fragebogenId/heuristiken/:heuristikId

//Alle assozierten Heuristik-Objekte finden
app.get('/frageboegen/:fragebogenId/heuristiken', (req, res) => {
    HeuristikTest.find({_fragebogenId: req.params.fragebogenId})
        .then(heuristiken => res.send(heuristiken))
        .catch((error) => console.log(error))
})

//Neue Heuristik zu Fragebogen hinzufügen
app.post('/frageboegen/:fragebogenId/heuristiken', (req, res) => {
    (
        new HeuristikTest({
        '_heuristikId': req.body._heuristikId,
        '_fragebogenId': req.params.fragebogenId,
        'fragen': req.body.fragen,
        'titel': req.body.titel
    }))
    .save()
    .then((heuristik) => res.send(heuristik))
    .catch((error) => console.log(error))
}) 

//Bestimmte Heuristik nach ID finden
app.get('/frageboegen/:fragebogenId/heuristiken/:heuristikId', (req,res) => {
    HeuristikTest.find({ _heuristikId: req.params.heuristikId})
        .then(heuristik => res.send(heuristik))
        .catch((error) => console.log(error))
})

//Bestimmte Heuristik nach ID löschen
app.delete('/frageboegen/:fragebogenId/heuristiken/:heuristikId', (req, res) => {
    HeuristikTest.findByIdAndDelete(req.params.heuristikId)
        .then(heuristiken => res.send(heuristiken))
        .catch((error) => console.log(error))
})

//Bestimmte Heuristik aktualisieren
app.patch('/frageboegen/:fragebogenId/heuristiken/:heuristikId/:frageId', (req, res) => {
    console.log(req.params.frageId)
    console.log(req.params.heuristikId)
    console.log(req.params.fragebogenId)
    console.log(req.body)
    HeuristikTest.updateOne({
        '_fragebogenId' : req.params.fragebogenId,
        '_heuristikId': req.params.heuristikId
    }, {
        '$set': {'fragen.$[i].detailNotiz':req.body.detailNotiz}
    },{
        arrayFilters: [
            {"i._frageId": req.params.frageId}
        ]
    })
        .then(heuristik => res.send(heuristik))
        .catch((error) => console.log(error))
})

/**************************************************/

/*******************Detailview*********************/

//bestimmte Detailview bekommen
app.get('/detailview/:_heuristikId/:_frageId', (req, res) => {
    Detailview.find({
        _frageId: req.params._frageId,
        _heuristikId: req.params._heuristikId
     })
     .then(details => res.send(details))
     .catch((error) => console.log(error))
})


app.listen(3000, () => console.log("Server is connected on port 3000"))