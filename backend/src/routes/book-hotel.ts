import express, { Request, Response } from "express";
import axiosInstance from "../axios-intercepter";

const router = express.Router();

router.post("/api/hotels/:id", async (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as bookHotelRouter };
