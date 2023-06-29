const { BadRequestError } = require("../errors/errors");
const AuthUserUseCase = require("../useCase/AuthUserUseCase");

class AuthUserController {
  async exec(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError("Missing params email or password");
      }
      const useCase = new AuthUserUseCase();
      const token = await useCase.exec(email, password);
      res.status(200).json({ token: token });
      return;
    } catch (error) {
      const ERROR = { name: error.name, error: error.message };
      res.status(error.statusCode).json(ERROR);
      return;
    }
  }
}
module.exports = new AuthUserController();
