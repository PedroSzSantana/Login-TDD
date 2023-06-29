const { BadRequestError } = require("../errors/errors");
const RegisterUserUseCase = require("../useCase/RegisterUserUseCase");

class RegisterUserController {
  async exec(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new BadRequestError("Missing params");
      }

      const useCase = new RegisterUserUseCase();
      await useCase.exec(name, email, password);
      res.status(201).json({ email });
      return;
    } catch (error) {
      const ERROR = { name: error.name, error: error.message };
      res.status(error.statusCode).json(ERROR);
      return;
    }
  }
}
module.exports = new RegisterUserController();
