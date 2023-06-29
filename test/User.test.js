const supertest = require("supertest");
const app = require("../src/app.js");

const request = supertest(app);
const mainUser = {
  name: "Pedro Souza",
  email: "exemple@exemple.com",
  password: "123456",
};
beforeAll(async () => {
  try {
    await request.post("/user").send(mainUser);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await request.delete(`/delete/${mainUser.email}`);
  } catch (error) {
    console.log(error);
  }
});
describe("Cadastro Usuario", () => {
  test("Deve cadastrar um usuario com sucesso ", async () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    let user = {
      name: "Victor Souza",
      email,
      password: "123456",
    };
    const res = await request.post("/user").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual(email);
  });

  test("Deve impedir que o cadastro seja realizado com os campos vazios", async () => {
    let user = {
      name: "",
      email: "",
      password: "",
    };
    const res = await request.post("/user").send(user);
    expect(res.statusCode).toEqual(400);
  });
  test("Deve impedir que um usuario se cadastre com um email repetido", async () => {
    const res2 = await request.post("/user").send(mainUser);
    expect(res2.statusCode).toEqual(400);
    expect(res2.body.error).toEqual("E-mail já cadastrado");
  });
});
describe("Autenticação usuario", () => {
  test("Deve impedir que a autenticação seja realizado com os campos vazios", async () => {
    let user = {
      email: "",
      password: "",
    };
    const res = await request.post("/auth").send(user);
    expect(res.statusCode).toEqual(400);
  });
  test("Deve verificar se existe algum usuario com o email enviado", async () => {
    const user = {
      email: "fafnaufds@fidns.com",
      password: mainUser.password,
    };
    const res = await request.post("/auth").send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Email ou senha invalidos");
  });
  test("Deve evitar que o usuario se logue com a senha incorreta", async () => {
    const user = {
      email: mainUser.email,
      password: "fasjiijoijmi9mfasfas",
    };
    const res = await request.post("/auth").send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Email ou senha invalidos");
  });
  test("Deve me retorar um token quando o usuario for autenticado", async () => {
    const user = { email: mainUser.email, password: mainUser.password };
    const res = await request.post("/auth").send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
