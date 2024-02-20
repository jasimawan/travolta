import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to travolta" });
});

export { router as testRouter };
