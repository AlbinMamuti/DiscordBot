const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new Schema({
    //Guild Id
    _id: reqString,
    //channel Id
    channelId: reqString,
    text: reqString
})

const name = 'welcome'
module.exports = mongoose.models[name] || mongoose.model(name, welcomeSchema, name)