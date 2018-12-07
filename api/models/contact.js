const mongoose = require('mongoose');
const Schema = mongoose.Schema
var contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stade: { type: mongoose.Schema.Types.ObjectId, ref: 'Stade', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date:   {type: String, required:true},
    stat:   {type: Number, required:true},
    match_date:       {type: String, required:true}

});
var Contact = mongoose.model('contact',contactSchema);
module.exports ={
    Contact:Contact
}