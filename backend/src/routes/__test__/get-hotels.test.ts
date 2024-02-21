import request from "supertest";
import app from "../../app";

beforeAll(() => {
  process.env.HOTELS_API_URL = "https://airbnb13.p.rapidapi.com";
  process.env.RAPID_API_KEY =
    "27cbd4bae9msha8020da4767c0d5p1e970fjsn68dce74e8b2c";
  process.env.RAPID_API_HOST = "airbnb13.p.rapidapi.com";
});

describe("GET /api/hotels", () => {
  it("should retrieve hotels successfully", async () => {
    const query = {
      location: "New York",
      checkin: "2024-02-21",
      checkout: "2024-02-22",
      adults: 2,
      page: 1,
    };

    const response = await request(app).get("/api/hotels").query(query);

    expect(response.status).toBe(200);
  });

  it("should return error for missing query parameters", async () => {
    const response = await request(app).get("/api/hotels");

    expect(response.status).toBe(400);
  });
});
