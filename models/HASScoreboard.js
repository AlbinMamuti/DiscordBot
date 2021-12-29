const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const reqString = {
    type: String,
    required: true,
}
const reqNumber = {
    type: Number,
    required: true,
}

const scoreBoardSchema = new Schema({ //Schema
    //guil id
    _id: reqString,
    //user name
    _name: reqString,
    //highScore
    _highScore: reqNumber,
    //how many times that user played hideAndSeek
    _numberOfTimesPlayed: reqNumber,
})
//only create a new Schema if there is no Schema with that name !
const name = 'HASScoreboard'
module.exports = mongoose.models[name] || mongoose.model(name, scoreBoardSchema, name)