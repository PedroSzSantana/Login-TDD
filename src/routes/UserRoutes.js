const { Router } = require("express");
const UserRoutes = Router();
const RegisterUserController = require("../controllers/RegisterUserController");
const AuthUserController = require("../controllers/AuthUserController");

UserRoutes.get("/", (req, res) => res.send("Hello World!"));

UserRoutes.post("/user", RegisterUserController.exec);
UserRoutes.post("/auth", AuthUserController.exec);
module.exports = UserRoutes;
