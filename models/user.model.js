const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    password: String,
    emailid: { type: String, unique: true },
    role: String,
    subscriptionid: { type: Number, default: 0 },
    
  }
);

const user = mongoose.model('newuser', userSchema);

module.exports = user;