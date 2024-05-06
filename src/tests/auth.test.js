const request = require("supertest");
const app = require("../../index");
const {User} = require("../models");

require("dotenv").config();

describe("Authentication Endpoints", () => {
  let accessToken;

  beforeAll(async () => {
    const res = await request(app)
      .post("/v1/api/auth/login")
      .send({email: "employee@mail.com", password: "employee"})
      .then(({body}) => {
        accessToken = body.data.accessToken;
      });
  });

  afterAll(async () => {
    await User.destroy({where: {email: "testuser@example.com"}});
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/v1/api/auth/register")
      .send({email: "testuser@example.com", password: "testpassword"});
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Register success");
  });

  it("should not register with existing email", async () => {
    const res = await request(app)
      .post("/v1/api/auth/register")
      .send({email: "testuser@example.com", password: "testpassword"});
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("You are already register");
  });

  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/v1/api/auth/login")
      .send({email: "testuser@example.com", password: "testpassword"});
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Login success");
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app)
      .post("/v1/api/auth/login")
      .send({email: "testuser@example.com", password: "wrongpassword"});
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Invalid email or password");
  });
});
