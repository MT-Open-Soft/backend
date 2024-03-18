const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    password: String,
    subscriptionid: Number,
  }
);

const user = mongoose.model('user', userSchema);

module.exports = user;