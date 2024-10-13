const request = require("supertest");
const server = require("../index");
const cafes = require("./cafes.json");
const app = require("../index");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "6K!U?ñxiYk7T7P7Q7pZ$Aa~Y2";

describe("Operaciones CRUD de cafes", () => {
  it("GET Devuelve estado 200", async () => {
    const response = await request(app).get("/cafes");
    expect(response.status).toBe(200);
  });

  it("Devuelve un array", async () => {
    const response = await request(app).get("/cafes");
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Devuelve un array con al menos un objeto", async () => {
    const response = await request(app).get("/cafes");
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Devuelve 404 si no encuentra ID al intentar eliminar", async () => {
    const token = jwt.sign({ someData: "for the payload" }, JWT_SECRET_KEY);
    const response = await request(app)
      .delete("/cafes/100") 
      .set("Authorization", `Bearer ${token}`); 
    expect(response.status).toBe(404);
  });

  it("POST/cafes agrega un nuevo café y devuelve un código 201", async () => {
    const nuevoCafe = {
      id: 5,
      nombre: "Latte Chai",
    };

    const response = await request(app).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  it("PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const actualizarCafe = {
      id: 5,
      nombre: "Latte Chai",
    };
    const response = await request(app)
      .put("/cafes/gatitos666")
      .send(actualizarCafe);
    expect(response.status).toBe(400);
  });
});
