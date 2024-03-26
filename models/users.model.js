const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username : String,
  password: String,
  emailid: String,
  role: String,
  subscriptionid: { type: Number, default: 0 },
  },
  {
    collection: 'newusers'
  }
);

const user = mongoose.model('user', userSchema);

module.exports = user;