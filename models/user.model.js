import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    subscription: { type: String, default: "FREE" },
  }
);

const User = mongoose.model('newuser', userSchema);

export default User;