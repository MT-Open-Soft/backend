const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    password: String,
    emailid: String,
    role: String,
    subscriptionid: { type: Number, default: 0 },
    
  }
);

const user = mongoose.model('newuser', userSchema);

module.exports = user;