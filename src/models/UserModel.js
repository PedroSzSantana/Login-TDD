const { default: mongoose, Schema } = require("mongoose");

const UserModel = new Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("users", UserModel);
