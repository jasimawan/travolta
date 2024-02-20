import express, { Request, Response } from "express";
import axiosInstance from "../axios-intercepter";

const router = express.Router();

router.get("/api/test", async (req: Request, res: Response) => {
  console.log(process.env.HOTELS_API_URL);
  res.status(200).send({ message: "Welcome to travolta" });
});

export { router as testRouter };
