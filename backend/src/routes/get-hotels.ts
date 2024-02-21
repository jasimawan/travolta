import express, { Request, Response } from "express";
import axiosInstance from "../axios-intercepter";

const router = express.Router();

router.get("/api/hotels", async (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as getHotelsRouter };
