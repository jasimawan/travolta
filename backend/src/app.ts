import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import "dotenv/config";

import {
  bookHotelRouter,
  getHotelsRouter,
  getSingleHotelRouter,
} from "./routes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

const app = express();
app.set("trust proxy", true);
app.use(json());

// routers
app.use(getHotelsRouter);
app.use(getSingleHotelRouter);
app.use(bookHotelRouter);

app.all("*", () => {
  throw new NotFoundError();
});

// middlewares
app.use(errorHandler);

export default app;
