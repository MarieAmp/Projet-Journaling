const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  birthday: Date,
  email: String,
  password : String,
  plan: {
    type: String,
    enum: ["free", "premium"],
  },
  admin: Boolean,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
