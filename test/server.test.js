const supertest = require("supertest");
const app = require("../src/app.js");

const request = supertest(app);

test("A aplicação deve responder na porta 8080", async () => {
  try {
    const res = await request.get("/");
    expect(res.statusCode).toEqual(200);
  } catch (error) {
    fail(error);
  }
});
