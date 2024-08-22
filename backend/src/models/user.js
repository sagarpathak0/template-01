const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    name:{
        type: String,
    },
    uid:{
        type: String,
    }
    
},{
    timestamps: true,
})

const User = mongoose.model('user', UserSchema);
module.exports = User;
