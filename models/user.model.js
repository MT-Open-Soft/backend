import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    subscription: { type: String, default: "FREE" },
    image_link: {type: String, default: "https://www.gravatar.com/avatar/"}
  }
);

const User = mongoose.model('newuser', userSchema);

export default User;