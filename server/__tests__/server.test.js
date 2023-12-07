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
});
