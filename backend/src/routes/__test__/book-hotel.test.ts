import request from "supertest";
import app from "../../app";

describe("POST /api/hotels", () => {
  it("should book a hotel successfully", async () => {
    const response = await request(app)
      .post("/api/hotels")
      .send({ id: "hotel123" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Hotel booked successfully." });
  });

  it("should return BadRequestError when booking an already booked hotel", async () => {
    await request(app).post("/api/hotels").send({ id: "hotel456" });

    const response = await request(app)
      .post("/api/hotels")
      .send({ id: "hotel456" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          message: "Hotel already booked.",
        },
      ],
    });
  });

  it("should return error for invalid hotel id", async () => {
    const response = await request(app).post("/api/hotels").send({ id: 123 }); // Sending a number instead of a string

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          message: "Hotel id must be a valid string",
          field: "id",
        },
      ],
    });
  });
});
