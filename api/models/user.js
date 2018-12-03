const mongoose = require('mongoose');
const Schema = mongoose.Schema
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name:  {type: String, required:true},
    last_name:   {type: String, required:true},
    phone_number:{type: Number, required:true},
    birthday:    {type: String, required:true},
    location:    {type: String, required:true},

    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});
var User = mongoose.model('user',userSchema);
module.exports ={
    User:User
}