const mongoose = require('mongoose');
const Schema = mongoose.Schema
var stadeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    location:   {type: String, required:true},
    capacity:   {type: Number, required:true},
    open_time:  {type: Number, required:true},
    close_time: {type: Number, required:true},
    price:      {type: Number, required:true},
    name:       {type: String, required:true}

});
var Stade = mongoose.model('stade',stadeSchema);
module.exports ={
    Stade:Stade
}