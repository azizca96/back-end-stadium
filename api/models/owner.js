const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ownerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:   {type: String, required:true},
    last_name:   {type: String, required:true},
    phone:  {type: Number, required:true},
    location: {type: String, required:true},


});
var Owner = mongoose.model('owner',ownerSchema);
module.exports ={
    Owner:Owner
}