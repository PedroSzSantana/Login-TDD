const { BadRequestError, ServerError } = require("../errors/errors");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWTSecret = "fgismdiogfmswiog";

class AuthUserUseCase {
  constructor() {
    this.UserModel = UserModel;
  }
  async exec(email, password) {
    try {
      const user = await this.UserModel.findOne({ email });
      if (!user) {
        throw new BadRequestError("Email ou senha invalidos");
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        throw new BadRequestError("Email ou senha invalidos");
      }
      const token = jwt.sign({ email, id: user._id }, JWTSecret, {
        expiresIn: "48h",
      });
      if (!token) {
        throw new ServerError("Erro na geração do token");
      }
      return token;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthUserUseCase;
