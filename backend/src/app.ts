import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { testRouter } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(json());

// routers
app.use(testRouter);

export default app;
