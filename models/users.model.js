const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name : String,
  password: String,
  email: {type: String,unique: true},
  role: String,
  subscription: { type: String, default: "Free" },
  
  },
  {
    collection: 'newusers'
  }
);

const user = mongoose.model('user', userSchema);

module.exports = user;