const mongoose = require('mongoose')
const Detailview = require('./models/detailview')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/fragebogenApp', {useNewUrlParser:true , useUnifiedTopology: true, useFindAndModify: false},()=>{
    Detailview.initDetailview(Detailview)
}) 

module.exports = mongoose
 
