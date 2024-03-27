import { Schema, model } from 'mongoose';

const userSchema = Schema({
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

const User = model('User', userSchema);

export default User;