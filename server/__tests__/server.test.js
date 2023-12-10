const { app, server } = require("../server");
const request = require("supertest");

describe("Server", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should respond with 200 for a successful GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should listen to a PORT", () => {
    const expectedPort = process.env.PORT || 5055;
    const actualPort = server.address().port;
    expect(actualPort).toBe(expectedPort);
  });

  it("POST /api/users should create a new user with valid name and password", async () => {
    const userData = {
      username: "username",
      password: "password",
    };

    const expectUser = {
      id: 1,
      ...userData,
    };

    const res = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    const newUserCreate = jest.spyOn(app, "post");
    newUserCreate.mockResolvedValue(expectUser);

    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("username", userData.username);
    expect(res.body.user).toHaveProperty("password", userData.password);
  });
});
