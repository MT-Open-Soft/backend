const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    subscription: { type: String, default: "Free" },
  }
);

const user = mongoose.model('newuser', userSchema);

module.exports = user;