const { BadRequestError } = require("../errors/errors");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

class RegisterUserUseCase {
  constructor() {
    this.UserModel = UserModel;
  }
  async exec(name, email, password) {
    try {
      const user = await this.UserModel.findOne({ email });
      if (user) {
        throw new BadRequestError("E-mail já cadastrado");
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = await this.UserModel.create({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();
    } catch (error) {
      throw error;
    }
  }
}
module.exports = RegisterUserUseCase;
