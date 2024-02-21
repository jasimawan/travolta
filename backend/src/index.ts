import app from "./app";

const start = async () => {
  if (!process.env.HOTELS_API_URL) {
    throw new Error("HOTELS_API_URL must be defined.");
  }
  if (!process.env.RAPID_API_KEY) {
    throw new Error("RAPID_API_KEY must be defined.");
  }
  if (!process.env.RAPID_API_HOST) {
    throw new Error("RAPID_API_HOST must be defined.");
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
